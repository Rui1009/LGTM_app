import React from 'react';
import Timeline from "./Timeline";
import ImageEditor from "./ImageEditorComponent";
import UrlForm from "./UrlForm";

import {
  useParams
} from "react-router-dom";
const Home = () => {
  const currentValue = useParams()
    return (
        <div>
           <UrlForm/>
            <ImageEditor/>
            <Timeline />
        </div>
    )
}

export default Home
