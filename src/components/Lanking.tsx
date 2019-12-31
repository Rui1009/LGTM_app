import React from "react";
import {useSelector} from "react-redux";
import {CombineState} from "../modules/RootModule";
import {ImageDataType} from "../modules/Image";
import {Typography} from "@material-ui/core";

const Lanking = () => {
    const imageData = useSelector((state: CombineState) => state.imageData)

    function lankCompare(a: ImageDataType, b: ImageDataType) {
        let comparison = 0
        if (a.used < b.used) {
            comparison = 1
        } else {
            comparison = -1
        } return comparison
    }

    const lankingArray = imageData.slice()

    lankingArray.sort(lankCompare)
    return (
        <div style={{textAlign: "center"}}>
            {
                lankingArray.map((elem: ImageDataType) => (
                    <ul>
                        <Typography>{lankingArray.indexOf(elem) + 1}位</Typography>
                        <Typography>使用された回数: {elem.used}</Typography>
                        <img src={elem.url} />
                    </ul>
                ))
            }
        </div>
    )
}

export default Lanking