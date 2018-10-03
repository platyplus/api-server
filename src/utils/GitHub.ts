import { Base64 } from 'js-base64';
import Axios, { AxiosRequestConfig, AxiosBasicCredentials } from 'axios'
import * as sha from 'js-sha1'
// TODO: OAuth2 key/secret? https://developer.github.com/v3/#authentication
const config:AxiosRequestConfig = {
    // params: {
    //     client_id:"dabe66cbddde65f8faf3", // TODO: env
    //     client_secret:"7e60d8335e32e5e5b773c0d9ac13f86465e91c2b" // TODO: env
    // }
    auth: {
        username: process.env.GITHUB_USER,
        password: process.env.GITHUB_PASSWORD
    }
}
export const GitHub = {
    getFile(repo:String, path:String):Promise<String> {
        return Axios.get(`https://api.github.com/repos/${repo}/contents/${path}`).then((encodedResult) => {
          return Base64.decode(encodedResult.data.content)
        })
    },
    //TODO: add author/committer https://developer.github.com/v3/repos/contents/#update-a-file
    updateFile(repo:String, path:String, content:String, message:String){
        const data = {
            message,
            content: Base64.encode(content),
            sha: sha(content)
        }
        return Axios.get(`https://api.github.com/repos/${repo}/contents/${path}`)
            .then(result => data.sha = result.data.sha)
            .finally(() => {
                return Axios.put(`https://api.github.com/repos/${repo}/contents/${path}`, data, config)
            })
    }
}
