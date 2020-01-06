import React from "react"
import actionCreatorFactory from "typescript-fsa";
import {Api} from "../Api/Api";
import {call, takeLatest, put} from "@redux-saga/core/effects"
import {createSlice} from "@reduxjs/toolkit";
import {AxiosResponse} from "axios";



const actionTypes = {
    LOAD_DATA: "LOAD_DATA",
}

const actionCreator = actionCreatorFactory();

export interface ImageDataType {
    id: number,
    url: string,
    unixMsec: number,
    used: number
}

const Istate: ImageDataType[] = []

export const ImageSliceReducer = createSlice({
    name: "imageData",
    initialState: Istate,
    reducers: {
        setImageData(state: ImageDataType[], action: {payload: ImageDataType[]}) {
            return action.payload
        }
    }
})

export const SelectedImageUrlSliceReducer = createSlice({
    name: "selectedUrl",
    initialState: "",
    reducers: {
        setImageUrl(state: string, action: {payload: string}) {
            return action.payload
        }
    }
})



export const PostImageSliceReducer = createSlice({
    name: "postImage",
    initialState: "",
    reducers: {
        postImage(state: string, action: {payload: {dataUrl: string}}) {
            return state
        },
        successPostImage(state: string, action: {payload: string}) {
            return state
        },
        failedPostImage(state: string, action: {payload: string}) {
            return state
        }
    }
})

export const SetImageDataActionCreator = {
    loadImageData: actionCreator<void>(actionTypes.LOAD_DATA)
}

export const UseImageSliceReducer = createSlice({
    name: "useImage",
    initialState: 0,
    reducers: {
        useImage(state: number, action: {payload: number}) {
            return state
        }
    }
})

function* putImageData(action: {type: string, payload: number}) {
    try {
        console.log(action.payload)
        const result = (yield call(Api.put, `https://lgtm-app-server.herokuapp.com/images/${action.payload}/use`))
        console.log(result)
        yield put(SetImageDataActionCreator.loadImageData())
    } catch (e) {
        console.log("fetchData error")
        console.log(e)
    }
}

function* fetchImageData() {
    try {
        const result = (yield call(Api.get, "https://lgtm-app-server.herokuapp.com/images"))["data"]
        console.log(result)
        yield put(ImageSliceReducer.actions.setImageData(result))
    } catch (e) {
        console.log("fetchData error");
        console.log(e)
    }
}



function* postImage(action:{type:string,payload: {dataUrl: string}}) {
    try {
        console.log(action.payload)
        const result:AxiosResponse<any> = (yield call(Api.postMultiPart, "https://lgtm-app-server.herokuapp.com/images",action.payload.dataUrl))
        console.log(result)

        if(result.status<300){
            console.log(result)
            alert("投稿しました")
            yield put(PostImageSliceReducer.actions.successPostImage("success"))
            yield put(SelectedImageUrlSliceReducer.actions.setImageUrl(""))
            yield put(SetImageDataActionCreator.loadImageData())
        }else{
            console.log("error")
            console.log(result.status)
            alert("サーバーでエラーが発生しました。しばらく経ってから再度お試しください")
            yield put(PostImageSliceReducer.actions.failedPostImage("failed"))
        }


    } catch (e) {
        console.log("error")
        alert("原因不明のエラーが発生しました。しばらく経ってから再度お試しください。\n"+e.message)
        yield put(PostImageSliceReducer.actions.failedPostImage("failed"))
    }
}

export const ImageSaga = [takeLatest(actionTypes.LOAD_DATA, fetchImageData),
                        takeLatest(PostImageSliceReducer.actions.postImage, postImage),
                        takeLatest(UseImageSliceReducer.actions.useImage, putImageData)]
