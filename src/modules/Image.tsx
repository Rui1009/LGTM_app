import React from "react"
import actionCreatorFactory from "typescript-fsa";
import {Api} from "../Api/Api";
import {call, takeLatest, put} from "@redux-saga/core/effects"
import {createSlice} from "@reduxjs/toolkit";

const actionTypes = {
    LOAD_DATA: "LOAD_DATA",
    POST_DATA: "POST_DATA"
}

const actionCreator = actionCreatorFactory();

export interface ImageDataType {
    id: number,
    url: string,
    unixTime: number,
    use: number
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





export const SetImageDataActionCreator = {
    loadImageData: actionCreator<void>(actionTypes.LOAD_DATA)
}

function* fetchImageData() {
    try {
        const result = (yield call(Api.get, "http://localhost:3000/data"))["data"]
        console.log(result)
        yield put(ImageSliceReducer.actions.setImageData(result))
    } catch (e) {
        console.log("fetchData error");
        console.log(e)
    }
}

export const ImageSaga = [takeLatest(actionTypes.LOAD_DATA, fetchImageData)]