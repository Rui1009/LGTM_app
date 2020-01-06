import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {CombineState} from "../modules/RootModule";
import {ImageDataType, SetImageDataActionCreator} from "../modules/Image";
import {Card, Grid, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {Api} from "../Api/Api";
import Clipboard from "react-clipboard.js";

const Ranking = () => {
  const imageData = useSelector((state: CombineState) => state.imageData)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(SetImageDataActionCreator.loadImageData())
  })
  function RankCompare(a: ImageDataType, b: ImageDataType) {
    let comparison = 0
    if (a.used < b.used) {
      comparison = 1
    } else {
      comparison = -1
    }
    return comparison
  }

  const RankingArray = imageData.slice()

  RankingArray.sort(RankCompare)
  return (
    <div style={{textAlign: "center"}}>
      {
        RankingArray.map((elem: ImageDataType) => (
          <Card style={{height:400}}>
            <Grid container direction={"column"}>
              <Grid item>
                <Typography>{RankingArray.indexOf(elem) + 1}位</Typography>
              </Grid>
              <Grid item>
                <Typography>使用された回数: {elem.used}</Typography>
              </Grid>
              <Grid item>
                <Clipboard data-clipboard-text={`![](${elem.url})`} onSuccess={() => {
                  alert("successfully copied")
                }}>
                  <Button
                    color={"primary"}
                    variant={"contained"}
                    onClick={() => {
                      Api.put(`https://lgtm-app-server.herokuapp.com/images/${elem.id}/use`).then(()=>{ dispatch(SetImageDataActionCreator.loadImageData())})
                    }}
                  >使用する</Button>
                </Clipboard>
              </Grid>
              <Grid item>
                <img height={300} src={elem.url}/>
              </Grid>
            </Grid>
          </Card>
        ))
      }
    </div>
  )
}

export default Ranking