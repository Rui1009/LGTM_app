import { all } from "redux-saga/effects";
import {ImageSaga} from "./modules/Image";

export default function* rootSaga() {
    yield all([
        ...ImageSaga
    ])
}