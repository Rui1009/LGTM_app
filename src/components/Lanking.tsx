import React from "react";
import {useSelector} from "react-redux";
import {CombineState} from "../modules/RootModule";
import {ImageDataType} from "../modules/Image";
import {Card, Grid, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {Api} from "../Api/Api";
import Clipboard from "react-clipboard.js";

const Lanking = () => {
  const imageData = useSelector((state: CombineState) => state.imageData)

  function lankCompare(a: ImageDataType, b: ImageDataType) {
    let comparison = 0
    if (a.used < b.used) {
      comparison = 1
    } else {
      comparison = -1
    }
    return comparison
  }

  const lankingArray = imageData.slice()

  lankingArray.sort(lankCompare)
  return (
    <div style={{textAlign: "center"}}>

      {
        lankingArray.map((elem: ImageDataType) => (
          <Card style={{height:400}}>
            <Grid container direction={"column"}>
              <Grid item>
                <Typography>{lankingArray.indexOf(elem) + 1}位</Typography>
              </Grid>
              <Grid item>
                <Typography>使用された回数: {elem.used}</Typography>
              </Grid>
              <Grid item>
                <Clipboard data-clipboard-text={elem.url} onSuccess={() => {
                  alert("successfully copied")
                }}>
                  <Button
                    color={"primary"}
                    variant={"contained"}
                    onClick={() => {
                      Api.put(`https://lgtm-app-server.herokuapp.com/images/${elem.id}/use`)
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

export default Lanking