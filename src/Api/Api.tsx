import axios from "axios";
const dataURLtoFile = (dataurl:string, filename:string) => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)![1]
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n) {
        u8arr[n] = bstr.charCodeAt(n)
        n -= 1 // to make eslint happy
    }
    return new File([u8arr], filename, { type: mime })
}


export class Api {
    static async get(url: string) {
        return axios.get(url)
    }
    static async post(url: string, param: string) {
        return axios.put(url, param)
    }


    static async postMultiPart(url:string,data:string){
        const file = dataURLtoFile(data,"image.png")
        const blobData = new FormData()
        blobData.append('img', file, file.name)
        // now upload
        const config = {
            headers: { 'Content-Type': 'multipart/form-data' }
        }
        return axios.post(url, data, config)
    }
}