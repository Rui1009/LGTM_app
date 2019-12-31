import React, {useEffect} from 'react';
import './App.css';
import {connect, useDispatch, useSelector} from "react-redux";
import SendForm from "./components/sendForm"
import {Dispatch} from "redux";
import {Action} from "typescript-fsa";
import {SelectedImageUrlSliceReducer, SetImageDataActionCreator} from "./modules/Image";
import Timeline from "./components/Timeline";
import {CombineState} from "./modules/RootModule";
import {getFormValues} from "redux-form";

interface Props {
    loadData(): void
}

const App = (props: Props) => {
    useEffect(() => {
        props.loadData()
    })
    const dispatch = useDispatch()
    const currentValue = useSelector((state: CombineState) => getFormValues("sendForm")(state) as {url: string})
  return (
      <div>
        <SendForm onSubmit={() => {
            alert("投稿しました。")
            dispatch(SelectedImageUrlSliceReducer.actions.setImageUrl(currentValue.url))
        }}/>
        <Timeline />
      </div>
  );
}

const mapDispatchToProps = (dispatch: Dispatch<Action<any>>) => ({
    loadData: () => {dispatch(SetImageDataActionCreator.loadImageData())}
})

export default connect(
    null,
    mapDispatchToProps
)(App)
