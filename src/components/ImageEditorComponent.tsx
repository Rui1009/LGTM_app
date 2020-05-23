import React, {useRef} from "react";
import {makeStyles, Modal} from "@material-ui/core"
import {reduxForm, getFormValues} from "redux-form"
import Button from "@material-ui/core/Button";
import {useDispatch, useSelector} from "react-redux";
import {CombineState} from "../modules/RootModule";
import iconA from 'tui-image-editor/dist/svg/icon-a.svg'
import iconB from 'tui-image-editor/dist/svg/icon-b.svg'
import iconC from 'tui-image-editor/dist/svg/icon-c.svg'
import iconD from 'tui-image-editor/dist/svg/icon-d.svg'
import ImageEditor from "./ImageEditor";
import exampleImage from "../assets/example.png"
import badExampleImage from "../assets/bad_example.png"

import {PostImageSliceReducer, SelectedImageUrlSliceReducer} from "../modules/Image";

const theme = {
  'common.bisize.width': '251px',
  'common.bisize.height': '21px',
  'common.backgroundColor': '#fff',
  'common.border': '1px solid #c1c1c1',

  // header
  'header.backgroundImage': 'none',
  'header.backgroundColor': 'grey',
  'header.border': '0px',
  'header.display':'none',
  // load button
  'loadButton.backgroundColor': 'transparent',
  'loadButton.border': '0px solid #ddd',
  'loadButton.color': 'transparent',
  'loadButton.fontFamily': '\'Noto Sans\', sans-serif',
  'loadButton.fontSize': '12px',

  // download button
  'downloadButton.backgroundColor': '#fdba3b',
  'downloadButton.border': '1px solid #fdba3b',
  'downloadButton.color': '#fff',
  'downloadButton.fontFamily': '\'Noto Sans\', sans-serif',
  'downloadButton.fontSize': '12px',

  // main icons
  'menu.normalIcon.path': iconD,
  'menu.normalIcon.name': 'icon-d',
  'menu.activeIcon.path': iconB,
  'menu.activeIcon.name': 'icon-b',
  'menu.disabledIcon.path': iconA,
  'menu.disabledIcon.name': 'icon-a',
  'menu.hoverIcon.path': iconC,
  'menu.hoverIcon.name': 'icon-c',
  'menu.iconSize.width': '24px',
  'menu.iconSize.height': '24px',

  'menu.backgroundColor': 'grey',

  // submenu primary color
  'submenu.backgroundColor': 'transparent',
  'submenu.partition.color': '#e5e5e5',

  // submenu icons
  'submenu.normalIcon.path': iconD,
  'submenu.normalIcon.name': 'icon-d',
  'submenu.activeIcon.path': iconB,
  'submenu.activeIcon.name': 'icon-b',
  'submenu.iconSize.width': '32px',
  'submenu.iconSize.height': '32px',

  // submenu labels
  'submenu.normalLabel.color': '#858585',
  'submenu.normalLabel.fontWeight': 'normal',
  'submenu.activeLabel.color': '#000',
  'submenu.activeLabel.fontWeight': 'normal',

  // checkbox style
  'checkbox.border': '1px solid #ccc',
  'checkbox.backgroundColor': '#fff',

  // rango style
  'range.pointer.color': '#333',
  'range.bar.color': '#ccc',
  'range.subbar.color': '#606060',

  'range.disabledPointer.color': '#d3d3d3',
  'range.disabledBar.color': 'rgba(85,85,85,0.06)',
  'range.disabledSubbar.color': 'rgba(51,51,51,0.2)',

  'range.value.color': '#000',
  'range.value.fontWeight': 'normal',
  'range.value.fontSize': '11px',
  'range.value.border': '0',
  'range.value.backgroundColor': '#f5f5f5',
  'range.title.color': '#000',
  'range.title.fontWeight': 'lighter',
  // colorpicker style
  'colorpicker.button.border': '0px',
  'colorpicker.title.color': '#000'
}


const ImageEditorComponent = (props: {}) => {
  const currentValue: string = useSelector((state: CombineState) => state.selectedImageUrl)
  console.log(currentValue)
  const dispatch = useDispatch()
  const offset = useSelector((state: CombineState) => state.pagination)
  const editorRef = useRef<ImageEditor>(null);
  return (
    <Modal
      open={!!currentValue}
      onClose={() => dispatch(SelectedImageUrlSliceReducer.actions.setImageUrl(""))}
    >
      <div style={{
          position: 'absolute',
          backgroundColor:"honeydew",
          width: "auto",
          top: "50%",
          left: "57%",
          transform: "translateY(-50%) translateX(-50%)",
          border: '2px solid #000',
          padding: 10}}>
        <div style={{padding:8,backgroundImage:"none",backgroundColor: "grey",border: "0px"}}>
          <Button
              disabled={currentValue.slice(-4) === (".jpg" || ".png")}
            style={{borderRadius:20,backgroundColor: "#fdba3b",fontWeight:"bold",border: "1px solid #fdba3b",color: "#fff",fontSize: 12}}
            onClick={() =>{
              editorRef && editorRef.current && dispatch(PostImageSliceReducer.actions.postImage({dataUrl: editorRef.current.getInstance().toDataURL("png"), offset: offset}));
              dispatch(SelectedImageUrlSliceReducer.actions.setImageUrl(""))
            }}
          >
            投稿する
          </Button>
        </div>
        {!!currentValue && currentValue.slice(-4) !== ".png" && currentValue.slice(-4) !== ".jpg" ?
          //@ts-ignore
          <ImageEditor
            ref={editorRef}
            // @ts-ignore
            includeUI={{
              loadImage: {
                path: currentValue,
                name: 'SampleImage'
              },
              menu: ['text'],
              initMenu: 'text',
              uiSize: {
                width: '600px',
                height: '500px'
              },
              theme: theme,
              menuBarPosition: 'bottom'
            }}
            cssMaxHeight={300}
            cssMaxWidth={400}
            selectionStyle={{
              cornerSize: 10,
              rotatingPointOffset: 70
            }}
            usageStatistics={false}
          />
          :
            <div>
              <p>jpgやpng形式は指定できません。</p>
              <p>Google検索の場合、サムネイル状態の画像を右クリックして「画像アドレスをコピー」を押してください。</p>
              <img src={exampleImage} style={{height: "290px", width: "600px"}}/>
              <p>❌悪い例</p>
              <p>以下の状態から選択中の画像のリンクをコピー。</p>
              <img src={badExampleImage} style={{height: "205px", width: "600px"}}/>

            </div>
              }

      </div>
    </Modal>
  )
}

export default ImageEditorComponent