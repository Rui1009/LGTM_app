import React from 'react';
import Timeline from "./Timeline";
import ImageEditor from "./ImageEditorComponent";
import UrlForm from "./UrlForm";
import {Tabs} from "@material-ui/core";
import {useSelector} from "react-redux";
import {CombineState} from "../modules/RootModule";
import {routerSelectors} from "../modules/router";
import {
  useParams
} from "react-router-dom";
const Home = () => {
  const currentValue = useParams()
  console.log(currentValue)
    return (
        <div>
           <UrlForm/>
            <ImageEditor/>
          {/*<Tabs*/}
          {/*  value={value}*/}
          {/*  indicatorColor="primary"*/}
          {/*  textColor="primary"*/}
          {/*  onChange={handleChange}*/}
          {/*  aria-label="disabled tabs example"*/}
          {/*>*/}
          {/*  <Tab label="Active" />*/}
          {/*  <Tab label="Disabled" disabled />*/}
          {/*  <Tab label="Active" />*/}
          {/*</Tabs>*/}
            <Timeline />
        </div>
    )
}

export default Home
