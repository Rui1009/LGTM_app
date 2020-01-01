import React from "react"
import actionCreatorFactory from "typescript-fsa";
import {Api} from "../Api/Api";
import {call, takeLatest, put} from "@redux-saga/core/effects"
import {createSlice} from "@reduxjs/toolkit";
import {AxiosResponse} from "axios";



const actionTypes = {
    LOAD_DATA: "LOAD_DATA"
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
            return state.concat(action.payload)
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
        const result: AxiosResponse = (yield call(Api.postMultiPart, "https://lgtm-app-server.herokuapp.com/images",action.payload.dataUrl))

        if(result.status<300){
            console.log(result)
            yield put(PostImageSliceReducer.actions.successPostImage("success"))
        }else{
            console.log("error")
            console.log(result)
            yield put(PostImageSliceReducer.actions.failedPostImage("failed"))
        }


    } catch (e) {
        console.log("error")
        yield put(PostImageSliceReducer.actions.failedPostImage("failed"))
    }
}

export const ImageSaga = [takeLatest(actionTypes.LOAD_DATA, fetchImageData),takeLatest(PostImageSliceReducer.actions.postImage, postImage)]
