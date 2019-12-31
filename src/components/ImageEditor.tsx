import React, {useRef} from "react";
import { makeStyles} from "@material-ui/core"
import {reduxForm, getFormValues} from "redux-form"
import Button from "@material-ui/core/Button";
import {useSelector} from "react-redux";
import {CombineState} from "../modules/RootModule";
import 'tui-image-editor/dist/tui-image-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';

// @ts-ignore
import ImageEditor from '@toast-ui/react-image-editor'

import iconA from 'tui-image-editor/dist/svg/icon-a.svg'
import iconB from 'tui-image-editor/dist/svg/icon-b.svg'
import iconC from 'tui-image-editor/dist/svg/icon-c.svg'
import iconD from 'tui-image-editor/dist/svg/icon-d.svg'
const theme ={
    'common.bi.image': 'https://uicdn.toast.com/toastui/img/tui-image-editor-bi.png',
    'common.bisize.width': '251px',
    'common.bisize.height': '21px',
    'common.backgroundImage': './img/bg.png',
    'common.backgroundColor': '#fff',
    'common.border': '1px solid #c1c1c1',

    // header
    'header.backgroundImage': 'none',
    'header.backgroundColor': 'grey',
    'header.border': '0px',

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

    'menu.backgroundColor':'grey',

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
    const currentValue = useSelector((state: CombineState) => getFormValues("sendForm")(state) as {url:string})
    console.log(currentValue)
    const editorRef= useRef<ImageEditor>(null);

    return (

      <div>
      <ImageEditor
        ref={editorRef}
        // @ts-ignore
        includeUI={{
            loadImage: {
                path: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQMMk8_3Gjv3KpCEzb4JvsMAwgdPExN4V6QcwSoDvJJiLdxbCn0',
                name: 'SampleImage'
            },
            menu: ['text'],
            initMenu: 'text',
            uiSize: {
                width: '1000px',
                height: '700px'
            },
            theme:theme,
            menuBarPosition: 'bottom'
        }}
        cssMaxHeight={500}
        cssMaxWidth={700}
        selectionStyle={{
            cornerSize: 20,
            rotatingPointOffset: 70
        }}
        usageStatistics={false}
      />
          <button onClick={ ()=> console.log(editorRef.current.getInstance().toDataURL()) }>test</button>
      </div>
    )
}

export default ImageEditorComponent