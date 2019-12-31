import React, {useEffect} from 'react';
import './App.css';
import {connect} from "react-redux";
import SendForm from "./components/sendForm"
import {Dispatch} from "redux";
import {Action} from "typescript-fsa";
import {SetImageDataActionCreator} from "./modules/Image";
import ImageEditor from "./components/ImageEditorComponent";

interface Props {
    loadData(): void
}

const App = (props: Props) => {
    useEffect(() => {
        props.loadData()
    })
  return (
    <div>
        <SendForm onSubmit={(data)=> console.log(data)} />
        <ImageEditor/>
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
