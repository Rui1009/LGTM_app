import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {CombineState} from "../modules/RootModule";
import {getFormValues} from "redux-form";
import SendForm from "./sendForm";
import {SelectedImageUrlSliceReducer} from "../modules/Image";
import Timeline from "./Timeline";
import {Card} from "@material-ui/core";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import ImageEditor from "./ImageEditorComponent";

const UrlForm = () => {
    const dispatch = useDispatch()
    const currentValue = useSelector((state: CombineState) => getFormValues("sendForm")(state) as {url: string})

    return (
            <Card>
                <Grid container xs={12}>
                    <Grid item container xs={8} justify={"center"} alignItems={"center"}>
                        <SendForm onSubmit={() => {
                            dispatch(SelectedImageUrlSliceReducer.actions.setImageUrl(currentValue.url))
                        }}/>
                    </Grid>
                    <Grid item xs={4} style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <Link to={"/lanking"} style={{textDecoration: "none"}}>
                            <Button
                                color={"secondary"}
                                variant={"contained"}
                            >人気ランキングをチェック！！</Button>
                        </Link>
                    </Grid>
                </Grid>
            </Card>
    )
}

export default UrlForm