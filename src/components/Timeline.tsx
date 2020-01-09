import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {CombineState} from "../modules/RootModule";
import {ImageDataType, SetImageDataActionCreator, UseImageSliceReducer} from "../modules/Image";
import {Card, Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Clipboard from 'react-clipboard.js';
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import Pagination from "material-ui-flat-pagination";


const Timeline = () => {
  const imageData = useSelector((state: CombineState) => state.imageData)
  const dispatch = useDispatch()
  const setPostDate = (props: number) => {
    return (new Date(props).toLocaleString())
  }
  const perPage = 6
  const [offset, setOffset] = useState(0)

  const handleClickPagination = (offset: number) => (
      setOffset(offset)
  )

  const onSuccess = () => (
    alert("successfully copied")
  )
  return (
    <div>
      <Grid alignItems={"center"} justify={"space-between"} container style={{padding: 10}}>
          <Typography variant="h4">
              Timeline
          </Typography>
        <Link to={"/lanking"} style={{textDecoration: "none"}}>
          <Button
            color={"secondary"}
            variant={"contained"}
          >人気ランキングをチェック！！</Button>
        </Link>
      </Grid>
      <Grid container xs={12}>
        {
          imageData.slice(offset, offset + perPage).map((elem: ImageDataType) => (
              <Card style={{margin: 10, width: 400}}>
                <Grid item container>
                  <Grid item container xs={6} direction={"column"} style={{textAlign: "center"}}>
                    <Typography>使用された数: {elem.used}</Typography>
                    <Typography>{setPostDate(elem.unixMsec)}</Typography>
                  </Grid>
                  <Grid item xs={6} style={{textAlign: "center"}}>
                    <Clipboard data-clipboard-text={`![](${elem.url})`} onSuccess={onSuccess}>
                      <Button
                        color={"primary"}
                        variant={"contained"}
                        onClick={() => {
                            dispatch(UseImageSliceReducer.actions.useImage(elem.id))
                        }}
                      >使用する</Button>
                    </Clipboard>
                  </Grid>
                  <Grid item xs={12} style={{textAlign: "center"}}>
                    <img height={300} width={300} style={{objectFit: "contain"}} src={elem.url}/>
                  </Grid>
                </Grid>
              </Card>
            )
          )
        }
      </Grid>
        <Pagination style={{textAlign: "center"}} limit={perPage} offset={offset} total={imageData.length} onClick={(e, offset) => handleClickPagination(offset)}/>
    </div>
  )
}

export default Timeline

