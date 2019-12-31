import React from "react";
import {useSelector} from "react-redux";
import {CombineState} from "../modules/RootModule";
import {ImageDataType} from "../modules/Image";

const Timeline = () => {
    const imageData = useSelector((state: CombineState) => state.imageData)
    return (

         imageData.map((elem: ImageDataType) => (
                <ul>
                    <img src={elem.url}/>
                    <p>{elem.use}</p>
                    <p>{elem.unixTime}</p>
                </ul>
                )
            )
    )
}

export default Timeline