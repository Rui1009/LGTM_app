import {configureStore} from "@reduxjs/toolkit";
import {rootReducer} from "./modules/RootModule";
import reduxLogger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./RootSaga";


export const sagaMiddleware = createSagaMiddleware();


export const buildStore = (
    configureStore({
        reducer: rootReducer,
        middleware: [sagaMiddleware, reduxLogger]
    })
)


sagaMiddleware.run(rootSaga)