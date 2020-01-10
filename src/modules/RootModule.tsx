import { reducer as formReducer } from "redux-form";
import {combineReducers} from "redux";
import { createBrowserHistory } from "history";
import {ImageDataType, ImageSliceReducer, PaginationSliceReducer, SelectedImageUrlSliceReducer} from "./Image";
import { connectRouter, RouterState } from "connected-react-router";

export interface CombineState {
    form: any,
    imageData: ImageDataType[],
    selectedImageUrl: string,
    router: RouterState,
    pagination: number
}

export const rootReducer = combineReducers<CombineState>({
    form: formReducer,
    imageData: ImageSliceReducer.reducer,
    selectedImageUrl: SelectedImageUrlSliceReducer.reducer,
    router: connectRouter(createBrowserHistory()),
    pagination: PaginationSliceReducer.reducer
})

