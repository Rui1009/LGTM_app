import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {CombineState} from "../modules/RootModule";
import {BasicImageDataType, ImageDataType, LoadDataSliceReducer, UseImageSliceReducer} from "../modules/Image";
import {Card, Grid, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Clipboard from "react-clipboard.js";

const Ranking = () => {
  const imageData = useSelector((state: CombineState) => state.imageData)
  const dispatch = useDispatch()
  const offset = useSelector((state: CombineState) => state.pagination)
  useEffect(() => {
    dispatch(LoadDataSliceReducer.actions.loadData({offset: imageData.length}))
  })
  function RankCompare(a: BasicImageDataType, b: BasicImageDataType) {
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
        RankingArray.map((elem: BasicImageDataType) => (
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
                  alert("クリップボードにコピーしました。")
                }}>
                  <Button
                    color={"primary"}
                    variant={"contained"}
                    onClick={() => {
                      dispatch(UseImageSliceReducer.actions.useImage({id: elem.id, offset: offset}))
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