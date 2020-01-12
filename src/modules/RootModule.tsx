import { reducer as formReducer } from "redux-form";
import {combineReducers} from "redux";
import { createBrowserHistory } from "history";
import {
    ImageDataType,
    ImageSliceReducer,
    PaginationSliceReducer,
    RankingDataSliceReducer,
    SelectedImageUrlSliceReducer
} from "./Image";
import { connectRouter, RouterState } from "connected-react-router";

export interface CombineState {
    form: any,
    imageData: ImageDataType[],
    selectedImageUrl: string,
    router: RouterState,
    pagination: number,
    ranking: ImageDataType[]
}

export const rootReducer = combineReducers<CombineState>({
    form: formReducer,
    imageData: ImageSliceReducer.reducer,
    selectedImageUrl: SelectedImageUrlSliceReducer.reducer,
    router: connectRouter(createBrowserHistory()),
    pagination: PaginationSliceReducer.reducer,
    ranking: RankingDataSliceReducer.reducer
})

