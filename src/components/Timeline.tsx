import React from "react";
import {useSelector} from "react-redux";
import {CombineState} from "../modules/RootModule";
import {ImageDataType} from "../modules/Image";
import {Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {Api} from "../Api/Api";
import Clipboard from 'react-clipboard.js';

const Timeline = () => {
    const imageData = useSelector((state: CombineState) => state.imageData)

    const setPostDate = (props: number) => {
        return (new Date(props * 1000).toLocaleString())
    }

    const onSuccess = () => (
        alert("successfully copied")
    )
    return (
        <div>
            {
                imageData.map((elem: ImageDataType) => (
                    <ul>
                        <Grid container xs={12}>
                            <Grid item xs={12} style={{textAlign: "center"}}>
                                <img src={elem.url}/>
                            </Grid>
                            <Grid item container xs={6} direction={"column"} style={{textAlign: "center"}}>
                                    <Typography>使用された数: {elem.use}</Typography>
                                    <Typography>{setPostDate(elem.unixTime)}</Typography>
                            </Grid>
                            <Grid item xs={6} style={{textAlign: "center"}}>
                                <Clipboard data-clipboard-text={elem.url} onSuccess={onSuccess}>
                                    <Button
                                        color={"primary"}
                                        variant={"contained"}
                                        onClick={() => {
                                            Api.put(`http://localhost:3000/images/${elem.id}`)
                                        }}
                                    >使用する</Button>
                                </Clipboard>
                            </Grid>
                        </Grid>

                    </ul>
    )
)
            }
        </div>
    )
}

export default Timeline

