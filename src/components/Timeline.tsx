import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {CombineState} from "../modules/RootModule";
import {ImageDataType, PaginationSliceReducer, UseImageSliceReducer} from "../modules/Image";
import {Card, Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Clipboard from 'react-clipboard.js';
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import Pagination from "material-ui-flat-pagination";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


interface Props {
    children? : React.ReactNode,
    index: number,
    value: any
}

const TabPanel = (props: Props) => {
    const {children, value, index} = props

    return (
       <div hidden={value !== index}>
            {children}
       </div>
    )
}

const allyProps = (index: number) => (
    {id: `tab-${index}`}
)

const Timeline = () => {
  const imageData = useSelector((state: CombineState) => state.imageData)
  const dispatch = useDispatch()
  const setPostDate = (props: number) => {
    return (new Date(props).toLocaleString())
  }
  const [value, setValue] = useState(0)
  const handleValueChange = (event: React.ChangeEvent<{}>, newValue: number) => (
      setValue(newValue) //newValueで分岐して違うAPI処理
  )
  const perPage = 6
  const offset = useSelector((state: CombineState) => state.pagination)
    console.log(offset)
  const onSuccess = () => (
    alert("successfully copied")
  )
  return (
    <div>
        <AppBar position={"static"}>
            <Tabs value={value} onChange={handleValueChange} centered={true}>
                <Tab label={"Timeline"} {...allyProps(0)}/>
                <Tab label={"Ranking"} {...allyProps(1)}/>
            </Tabs>
        </AppBar>
        <TabPanel index={0} value={value}>
            <Grid container xs={12}>
                {
                    imageData.map((elem: ImageDataType) => (
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
                                                    dispatch(UseImageSliceReducer.actions.useImage({id: elem.id, offset: offset}))
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
        </TabPanel>
        <TabPanel index={1} value={value}>
            <p>ランキングを表示</p>
        </TabPanel>
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

        {/* サーバーからサーバー内のデータの個数を返してもらい、トータルに代入*/}
        <Pagination style={{textAlign: "center"}} limit={perPage} offset={offset} total={100} onClick={(e, offset) => dispatch(PaginationSliceReducer.actions.handlePagination(offset))}/>
    </div>
  )
}

export default Timeline

