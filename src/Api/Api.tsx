import axios from "axios";

export class Api {
    static async get(url: string) {
        return axios.get(url)
    }
    static async put(url: string) {
        return axios.put(url)
    }

    static async postMultiPart(url:string,dataUri:string){
        return fetch(dataUri)
          .then(res => res.blob())
          .then(blob => {
              const fd = new FormData()
              fd.append('image', blob, 'filename.png')
              axios(
                {
                    method: 'post',
                    url: url,
                    data: fd,
                    headers: {'Content-Type': 'multipart/form-data' }
                },
              )
          })
    }
}