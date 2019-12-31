import React from 'react';
import Timeline from "./Timeline";
import ImageEditor from "./ImageEditorComponent";
import UrlForm from "./UrlForm";

const Home = () => {
    return (
        <div>
           <UrlForm/>
            <ImageEditor/>
            <Timeline />
        </div>
    )
}

export default Home
