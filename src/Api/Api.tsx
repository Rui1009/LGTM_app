import axios from "axios";
import {ImageDataType} from "../modules/Image";

export class Api {
    static async get(url: string) {
        return axios.get(url)
    }
    static async post(url: string, param: ImageDataType) {
        return axios.put(url, param)
    }

}