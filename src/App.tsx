import React, {useEffect} from 'react';
import './App.css';
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {Action} from "typescript-fsa";
import {SetImageDataActionCreator} from "./modules/Image";
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Lanking from "./components/Lanking";
import Home from "./components/Home";

interface Props {
    loadData(): void
}

const App = (props: Props) => {
    useEffect(() => {
        props.loadData()
    })
  return (
      <BrowserRouter>
          <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/lanking" component={Lanking} />
          </Switch>
      </BrowserRouter>
  );
}

const mapDispatchToProps = (dispatch: Dispatch<Action<any>>) => ({
    loadData: () => {dispatch(SetImageDataActionCreator.loadImageData())}
})

export default connect(
    null,
    mapDispatchToProps
)(App)


