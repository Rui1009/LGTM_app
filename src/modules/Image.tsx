import React from "react"
import {Api} from "../Api/Api";
import {call, takeLatest, put} from "@redux-saga/core/effects"
import {createSlice} from "@reduxjs/toolkit";
import {AxiosResponse} from "axios";


export interface ImageDataType {
    id: number,
    url: string,
    unixMsec: number,
    used: number,
   // dataAmount: number fetchImageDataのとき、データの総数
}




export const LoadDataSliceReducer = createSlice({
    name: "loadData",
    initialState: 0,
    reducers: {
        loadData(state: number, action: {payload: {offset: number}}) {
            return state
        }
    }
})

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

export const RankingDataSliceReducer = createSlice({
    name: "rankingData",
    initialState: Istate,
    reducers: {
        setRankingData(state: ImageDataType[], action: {payload: ImageDataType[]}) {
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
        postImage(state: string, action: {payload: {dataUrl: string, offset: number}}) {
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


export const UseImageSliceReducer = createSlice({
    name: "useImage",
    initialState: 0,
    reducers: {
        useImage(state: number, action: {payload: {id: number, offset: number}}) {
            return state
        }
    }
})

export const PaginationSliceReducer = createSlice({
    name: "pagination",
    initialState: 0,
    reducers: {
        handlePagination(state: number, action: {payload: number}) {
            return action.payload
        }
    }
})

function* putImageData(action: {type: string, payload: {id: number, offset: number}}) {
    try {
        console.log(action.payload)
        const result = (yield call(Api.put, `https://lgtm-app-server.herokuapp.com/images/${action.payload.id}/use`))
        console.log(result)
        yield put(LoadDataSliceReducer.actions.loadData({offset: action.payload.offset}))
    } catch (e) {
        console.log("fetchData error")
        console.log(e)
    }
}

function* fetchImageData(action: {type: string, payload: {offset: number}}) {
    try {
        const result = (yield call(Api.get, "https://lgtm-app-server.herokuapp.com/images"))["data"].slice(action.payload.offset, action.payload.offset + 6)
        console.log(result)
        yield put(ImageSliceReducer.actions.setImageData(result))
    } catch (e) {
        console.log("fetchData error");
        console.log(e)
    }
}

function* fetchRankingData() {
    try {
        const result = (yield call(Api.get, "https://lgtm-app-server.herokuapp.com/images?sort=ranking"))["data"]
        console.log(result)
    } catch (e) {
        console.log("fetchRankingData error")
        console.log(e)
    }
}


function* postImage(action:{type:string,payload: {dataUrl: string, offset: number}}) {
    try {
        console.log(action.payload)
        const result:AxiosResponse<any> = (yield call(Api.postMultiPart, "https://lgtm-app-server.herokuapp.com/images",action.payload.dataUrl))
        console.log(result)

        if(result.status<300){
            console.log(result)
            alert("投稿しました")
            yield put(PostImageSliceReducer.actions.successPostImage("success"))
            yield put(SelectedImageUrlSliceReducer.actions.setImageUrl(""))
            yield put(LoadDataSliceReducer.actions.loadData({offset: action.payload.offset}))
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

export const ImageSaga = [takeLatest(LoadDataSliceReducer.actions.loadData, fetchImageData),
                        takeLatest(PostImageSliceReducer.actions.postImage, postImage),
                        takeLatest(UseImageSliceReducer.actions.useImage, putImageData),
                        takeLatest(RankingDataSliceReducer.actions.setRankingData, fetchRankingData)
]
