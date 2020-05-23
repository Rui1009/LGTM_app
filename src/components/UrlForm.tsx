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
                <Typography style={{padding:3}}>使い方：Googleで画像検索し、好きな画像のサムネイルをクリックして「画像アドレスをコピー」を押して以下のフォームにペーストし作成を押してください。</Typography>
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
