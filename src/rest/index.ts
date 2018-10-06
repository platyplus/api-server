import { Context, GitHub } from '../utils'
import { Base64 } from 'js-base64';
import * as express from 'express';
import { Prisma } from '../generated/prisma';
import * as auth from 'basic-auth';

export const hostSettings = (req: express.Request, res:express.Response, next:express.NextFunction, db:Prisma) => {
    const host = auth(req)
    // TODO:
    if (host) {
        db.query.host({ where: { hostName: host.name } }).then((host) => {
            if (!host) {
                res.statusCode = 401;
                res.send('Unauthorized');
            }
            GitHub.getFile(process.env.NIXOS_GITHUB_REPOSITORY, "settings.nix.template").then((settingsTemplate) => {
                settingsTemplate = settingsTemplate.replace('{{hostname}}', host.hostName)
                settingsTemplate = settingsTemplate.replace('{{timezone}}', host.timeZone)
                settingsTemplate = settingsTemplate.replace('{{tunnelport}}', String(host.tunnelPort))
                settingsTemplate = settingsTemplate.replace(/\n/g, "\r\n");
                res.type('text/plain')
                res.send(settingsTemplate)
            }).catch((error) => {
                console.log(error)
                res.statusCode = 500;
                res.send('Internal server error');
            })
        }).catch((error) => {
            console.log(error)
            res.statusCode = 500;
            res.send('Internal server error');
        })
    } else {
        res.statusCode = 401;
        res.send('Unauthorized');
    }
}
