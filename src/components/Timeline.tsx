import React from "react";
import {useSelector} from "react-redux";
import {CombineState} from "../modules/RootModule";
import {ImageDataType} from "../modules/Image";
import {Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {Api} from "../Api/Api";

const Timeline = () => {
    const imageData = useSelector((state: CombineState) => state.imageData)
    const setPostDate = (props: number) => {
        return (new Date(props * 1000).toLocaleString())
    }
    return (
        <div>
            {
                imageData.map((elem: ImageDataType) => (
                    <ul>
                        <Grid container xs={12}>
                            <Grid item xs={6}>
                                <img src={elem.url}/>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography>{elem.use}</Typography>
                                <Typography>{setPostDate(elem.unixTime)}</Typography>
                                <Button
                                    color={"primary"}
                                    variant={"contained"}
                                    onClick={() => {
                                        Api.post("http://localhost:3000/data", {
                                            id: elem.id,
                                            url: elem.url,
                                            unixTime: elem.unixTime,
                                            use: elem.use + 1
                                        })
                                    }}
                                >使用する</Button>
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

