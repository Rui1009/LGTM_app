import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {CombineState} from "../modules/RootModule";
import {
    BasicImageDataType,
    LoadRankingDataSliceReducer,
    PaginationSliceReducer,
    UseImageSliceReducer,
    fetchImages,
    SelectedImageUrlSliceReducer,
    sendImageLink
} from "../modules/Image";
import {Card, Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Clipboard from 'react-clipboard.js';
import Button from "@material-ui/core/Button";
import Pagination from "material-ui-flat-pagination";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SearchForm from "./SearchForm";


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
  const rankingData = useSelector((state: CombineState) => state.ranking)
  const searchedImagesRawData = useSelector((state: CombineState) => state.searchedImages)
  const searchedImagesData = searchedImagesRawData.flatMap((data: any) => data)
  console.log(searchedImagesData)


  const dispatch = useDispatch()
  const setPostDate = (props: number) => {
    return (new Date(props).toLocaleString())
  }
  const [value, setValue] = useState(0)
  const handleValueChange = (event: React.ChangeEvent<{}>, newValue: number) => (
      setValue(newValue)
  )
  const perPage = 30
  const offset = useSelector((state: CombineState) => state.pagination)
  const dataAmount = useSelector((state: CombineState) => state.dataAmount)
  const onSuccess = () => (
    alert("クリップボードにコピーしました。")
  )
  return (
    <div>
        <AppBar position={"static"}>
            <Grid xs={12} container>
                <Grid item xs={12}>
                    <Tabs value={value} onChange={handleValueChange} centered={true} style={{backgroundColor: "rgb(64, 64, 62)"}}>
                        <Tab label={"タイムライン"} {...allyProps(0)} />
                        <Tab label={"人気の画像"} {...allyProps(1)} onClick={() => dispatch(LoadRankingDataSliceReducer.actions.loadRankingData())}/>
                        <Tab label={"検索から作成"} {...allyProps(2)} />
                    </Tabs>
                </Grid>
            </Grid>
        </AppBar>
        <TabPanel index={0} value={value}>
            <Grid container xs={12}>
                {
                    imageData.map((elem: BasicImageDataType) => (
                            <Card style={{margin: 10, width: 400}}>
                                <Grid item container>
                                    <Grid item container xs={6} direction={"column"} style={{textAlign: "center"}}>
                                        <Typography>使用された数: {elem.used}</Typography>
                                        <Typography>{setPostDate(elem.unixMsec ? elem.unixMsec : 0)}</Typography>
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
            <Pagination style={{textAlign: "center"}} limit={perPage} offset={offset} total={dataAmount} onClick={(e, offset) => dispatch(PaginationSliceReducer.actions.handlePagination(offset))}/>
        </TabPanel>
        <TabPanel index={1} value={value}>
            <Grid container xs={12}>
                {
                    rankingData.map((elem: BasicImageDataType) => (
                            <Card style={{margin: 10, width: 400}}>
                                <Grid item container>
                                    <Grid item container xs={6} direction={"column"} style={{textAlign: "center"}}>
                                        <Typography>{rankingData.indexOf(elem) + 1}位</Typography>
                                        <Typography>使用された数: {elem.used}</Typography>
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
        <TabPanel index={2} value={value}>
            <Grid>
                <SearchForm onSubmit={(value: any) => dispatch(fetchImages(value.word))} />
            </Grid>
            <Grid container xs={12}>
                {searchedImagesData && searchedImagesData.map((image: any) => (
                    <Grid item xs={2}>
                        <img src={image || "" } style={{width: "90%"}} onClick={() => dispatch(sendImageLink(image))}/>
                    </Grid>
                ))}
            </Grid>
        </TabPanel>
    </div>
  )
}

export default Timeline
