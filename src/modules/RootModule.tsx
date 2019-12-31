import { reducer as formReducer } from "redux-form";
import {combineReducers} from "redux";
import {ImageDataType, ImageSliceReducer, SelectedImageUrlSliceReducer} from "./Image";

export interface CombineState {
    form: any,
    imageData: ImageDataType[],
    selectedImageUrl: string
}

export const rootReducer = combineReducers<CombineState>({
    form: formReducer,
    imageData: ImageSliceReducer.reducer,
    selectedImageUrl: SelectedImageUrlSliceReducer.reducer
})

