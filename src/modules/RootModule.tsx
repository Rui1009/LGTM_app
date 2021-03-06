import { reducer as formReducer } from "redux-form";
import {combineReducers} from "redux";
import { createBrowserHistory } from "history";
import {
    BasicImageDataType, DataAmountSliceReducer,
    ImageSliceReducer,
    PaginationSliceReducer,
    RankingDataSliceReducer,
    SelectedImageUrlSliceReducer,
    SearchedImagesDataSliceReducer,
    slice
} from "./Image";
import { connectRouter, RouterState } from "connected-react-router";

export interface CombineState {
    form: any,
    imageData: BasicImageDataType[],
    selectedImageUrl: string,
    router: RouterState,
    pagination: number,
    ranking: BasicImageDataType[],
    dataAmount: number,
    searchedImages: any,
    loading: {isLoading: boolean}
}

export const rootReducer = combineReducers<CombineState>({
    form: formReducer,
    imageData: ImageSliceReducer.reducer,
    selectedImageUrl: SelectedImageUrlSliceReducer.reducer,
    router: connectRouter(createBrowserHistory()),
    pagination: PaginationSliceReducer.reducer,
    ranking: RankingDataSliceReducer.reducer,
    dataAmount: DataAmountSliceReducer.reducer,
    searchedImages: SearchedImagesDataSliceReducer.reducer,
    loading: slice.reducer
})

