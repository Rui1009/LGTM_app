import axios from "axios";

export class Api {
    static async get(url: string) {
        return axios.get(url)
    }
    static async post(url: string, param: string) {
        return axios.put(url, param)
    }

}