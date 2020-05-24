import React from "react"
import {Api} from "../Api/Api";
import {call, takeLatest, put} from "@redux-saga/core/effects"
import {createSlice, createAction} from "@reduxjs/toolkit";
import {AxiosResponse} from "axios";

const URL = "https://lgtm-app-server.herokuapp.com"
//const URL = "http://localhost:9000"

export interface BasicImageDataType {
    id: number,
    url: string,
    unixMsec?: number,
    used: number
}

export interface ImageDataType {
    ImageData: BasicImageDataType[],
    dataAmount: number
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

export const LoadRankingDataSliceReducer = createSlice({
    name: "loadRankingData",
    initialState: 0,
    reducers: {
        loadRankingData(state: number, action: {payload?: number}) {
            return state
        }
    }
})

const Istate: BasicImageDataType[] = []

export const ImageSliceReducer = createSlice({
    name: "imageData",
    initialState: Istate,
    reducers: {
        setImageData(state: BasicImageDataType[], action: {payload: BasicImageDataType[]}) {
            return action.payload
        }
    }
})

export const RankingDataSliceReducer = createSlice({
    name: "rankingData",
    initialState: Istate,
    reducers: {
        setRankingData(state: BasicImageDataType[], action: {payload: BasicImageDataType[]}) {
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

export const DataAmountSliceReducer = createSlice({
    name: "dataAmount",
    initialState: 0,
    reducers: {
        handleDataAmount(state: number, action: {payload: number}) {
            return action.payload
        }
    }
})

export const SearchedImagesDataSliceReducer = createSlice({
    name: "searchedImages",
    initialState: [],
    reducers: {
        setSearchedImages(state: any, action: {payload: any}) {
            return action.payload
        }
    }
})

export const fetchImages = createAction<string>("fetch_images")

function* putImageData(action: {type: string, payload: {id: number, offset: number}}) {
    try {
        const result = (yield call(Api.put, `${URL}/images/${action.payload.id}/use`))
        yield put(LoadDataSliceReducer.actions.loadData({offset: action.payload.offset}))
    } catch (e) {
        console.log("fetchData error")
        console.log(e)
    }
}

function* fetchImageData(action: {type: string, payload: {offset: number}}) {
    try {
        const result = (yield call(Api.get, `${URL}/images`))["data"][1].filter((v: any) => v.id >= 75 || v.id <= 67).slice(action.payload.offset, action.payload.offset + 30)
        const dataAmount = (yield call(Api.get, `${URL}/images`))["data"][0][1]
        yield put(ImageSliceReducer.actions.setImageData(result))
        yield put(DataAmountSliceReducer.actions.handleDataAmount(dataAmount))
    } catch (e) {
        console.log("fetchData error");
        console.log(e)
    }
}

function* fetchRankingData() {
    try {
        const result = (yield call(Api.get, `${URL}/images?sort=ranking`))["data"][1].slice(0, 30)
        yield put(RankingDataSliceReducer.actions.setRankingData(result))
    } catch (e) {
        console.log("fetchRankingData error")
        console.log(e)
    }
}
function* postImage(action:{type:string,　payload: {dataUrl: string, offset: number}}) {
    try {
        const result:AxiosResponse<any> = (yield call(Api.postMultiPart, `${URL}/images`, action.payload.dataUrl))

        if(result.status<300){
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

function* searchImages(action: {type: string, payload: string}) {
    try {
        let result: any = []
        for (let i = 0; i < 3; i++) {
        result[i] = 
        yield call(Api.get, `https://customsearch.googleapis.com/customsearch/v1?key=AIzaSyDQvSTqoDXb1vVVXNGbhlUq6-NGICbPGog&cx=004960726082045641169:buyjt0nlgxw&q=${action.payload}&searchType=image&start=${i * 10 + 1}`)
        }
        console.log(result)
        switch (result[0].status) {
            case 200:
            yield put(SearchedImagesDataSliceReducer.actions.setSearchedImages(result.map((elem: any)=> elem.data.items.map((item: any)=> item.image.thumbnailLink))));
            break;
            default:
            alert("エラー：画像の取得に失敗しました。")
        }

    } catch (e) {
        console.log(e.message)
    }
}

export const ImageSaga = [takeLatest(LoadDataSliceReducer.actions.loadData, fetchImageData),
                        takeLatest(PostImageSliceReducer.actions.postImage, postImage),
                        takeLatest(UseImageSliceReducer.actions.useImage, putImageData),
                        takeLatest(LoadRankingDataSliceReducer.actions.loadRankingData, fetchRankingData),
                        takeLatest(fetchImages.toString(), searchImages)
]
