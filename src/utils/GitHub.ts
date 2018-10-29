import Axios, { AxiosRequestConfig, AxiosBasicCredentials } from 'axios'
import * as CryptoJS from 'crypto-js'
const config:AxiosRequestConfig = {
    auth: {
        username: process.env.GITHUB_USER!,
        password: process.env.GITHUB_TOKEN!
    }
}
export const GitHub = {
    getFile(repo:string, path:string):Promise<string> {
        return Axios.get(`https://api.github.com/repos/${repo}/contents/${path}`).then((encodedResult) => {
          return CryptoJS.enc.Base64.parse(encodedResult.data.content)
        })
    },
    //TODO: add author/committer https://developer.github.com/v3/repos/contents/#update-a-file
    updateFile(repo:string, path:string, content:string, message:string){
        const data = {
            message,
            content: CryptoJS.enc.Base64.stringify(content),
            sha: CryptoJS.SHA1(content)
        }
        return Axios.get(`https://api.github.com/repos/${repo}/contents/${path}`)
            .then(result => data.sha = result.data.sha)
            .finally(() => {
                return Axios.put(`https://api.github.com/repos/${repo}/contents/${path}`, data, config)
            })
    }
}
