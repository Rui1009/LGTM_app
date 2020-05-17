import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {CombineState} from "../modules/RootModule";
import {getFormValues} from "redux-form";
import SendForm from "./sendForm";
import {SelectedImageUrlSliceReducer} from "../modules/Image";
import Timeline from "./Timeline";
import {Card, Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

const UrlForm = () => {
    const dispatch = useDispatch()
    const currentValue = useSelector((state: CombineState) => getFormValues("sendForm")(state) as {url: string})

    return (
            <div style={{margin: "10px 0"}}>
                <Typography style={{padding:3}}>以下に画像のurlを入れるとLGTMが入った画像が生成されるので、編集したら「投稿する」ボタンを押してください。</Typography>
                <Typography style={{padding:3}}>jpgやpng形式は指定できません。</Typography>
                <Grid container xs={12}>
                    <Grid item xs={6}>
                        <SendForm onSubmit={() => {
                            dispatch(SelectedImageUrlSliceReducer.actions.setImageUrl(currentValue.url))
                        }}/>
                    </Grid>
                </Grid>
            </div>
    )
}

export default UrlForm
