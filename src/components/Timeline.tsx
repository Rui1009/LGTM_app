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
        return (new Date(props).toLocaleString())
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
                                <img width={150} height={200} src={elem.url}/>
                            </Grid>
                            <Grid item container xs={6} direction={"column"} style={{textAlign: "center"}}>
                                    <Typography>使用された数: {elem.used}</Typography>
                                    <Typography>{setPostDate(elem.unixMsec)}</Typography>
                            </Grid>
                            <Grid item xs={6} style={{textAlign: "center"}}>
                                <Clipboard data-clipboard-text={elem.url} onSuccess={onSuccess}>
                                    <Button
                                        color={"primary"}
                                        variant={"contained"}
                                        onClick={() => {
                                            Api.put(`https://6e016d24.ngrok.io/images/${elem.id}/use`)
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

