import axios, {AxiosResponse} from "axios";
import {store} from "../index"
import { slice } from "../modules/Image";

export class Api {
    static async get(url: string) {
        store.dispatch(slice.actions.start())
        return axios.get(url).finally(() => store.dispatch(slice.actions.end()))
    }
    static async put(url: string) {
        return axios.put(url)
    }
    

    static async postMultiPart(url:string,dataUri:string): Promise<AxiosResponse<any>> {
        return fetch(dataUri)
          .then(res => res.blob())
          .then(blob => {
            store.dispatch(slice.actions.start()) 
              const fd = new FormData()
              fd.append('image', blob, 'filename.png')
              return axios(
                {
                    method: 'post',
                    url: url,
                    data: fd,
                    headers: {'Content-Type': 'multipart/form-data' }
                },
              ).finally(() => store.dispatch(slice.actions.end()))
          })
    }

    static async post(url: string, imageLink: string) {
        store.dispatch(slice.actions.start())
        return axios.post(url, {url: imageLink, headers: {'Content-Type' : "application/json"}}).finally(() => store.dispatch(slice.actions.end()))
    }
}