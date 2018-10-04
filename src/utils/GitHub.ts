import { Base64 } from 'js-base64';
import Axios, { AxiosRequestConfig, AxiosBasicCredentials } from 'axios'
import * as sha from 'js-sha1'
const config:AxiosRequestConfig = {
    auth: {
        username: process.env.GITHUB_USER,
        password: process.env.GITHUB_TOKEN
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
