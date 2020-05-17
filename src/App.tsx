import React, {useEffect} from 'react';

import 'tui-image-editor/dist/tui-image-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import './App.css';

import {useDispatch, useSelector} from "react-redux";
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Ranking from "./components/Ranking";
import Home from "./components/Home";
import {AppBar, Toolbar, Typography} from "@material-ui/core";
import {LoadDataSliceReducer} from "./modules/Image";
import {CombineState} from "./modules/RootModule";
import logo from "./assets/header_logo.png"


const App = () => {
    const dispatch = useDispatch()
    const offset = useSelector((state: CombineState) => state.pagination)
    useEffect(() => {
        dispatch(LoadDataSliceReducer.actions.loadData({offset: offset}))
    })
  return (
    <div>
      <AppBar position="static">
        <Toolbar style={{backgroundColor: "#fff", borderBottom: "3px solid black"}}>
            <img src={logo} height={"80px"}/>
        </Toolbar>
      </AppBar>
      <BrowserRouter>
          <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/lanking" component={Ranking} />
          </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App


