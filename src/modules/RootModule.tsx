import { reducer as formReducer } from "redux-form";
import {combineReducers} from "redux";
import {ImageDataType, ImageSliceReducer} from "./Image";

export interface CombineState {
    form: any,
    imageData: ImageDataType[]
}

export const rootReducer = combineReducers({
    form: formReducer,
    imageData: ImageSliceReducer.reducer
})

