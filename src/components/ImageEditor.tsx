import React from 'react';
import TuiImageEditor from 'tui-image-editor';

export default class ImageEditor extends React.Component {
  rootEl = React.createRef();

  addText =()=>{
    setTimeout(() =>{
        try {
          // @ts-ignore
          const canvasSize = this.imageEditorInst.getCanvasSize();
          console.log(canvasSize.width);
          console.log(canvasSize.height);
          let fontSize = 0
          let x = 0
          let y = 0

          if(canvasSize.width<canvasSize.height){
            fontSize= canvasSize.width/4
            x= 5
            y= canvasSize.height - fontSize - 10
          }else{
            fontSize= canvasSize.height/4
            x= canvasSize.width/4
            y= canvasSize.height - fontSize - 10
          }

          // @ts-ignore
          this.imageEditorInst.addText('LGTM', {
            styles: {
              fill: '#ff0007',
              fontSize: fontSize,
              fontWeight: 'bold',
            },
            position: {
              x: x,
              y: y
            }
            // @ts-ignore
          }).catch((e)=> console.log(e))
        }
        catch (e) {
          console.log(e)
        }
      }

      ,200)
  }

  componentDidMount() {
    // @ts-ignore
    this.imageEditorInst = new TuiImageEditor(this.rootEl.current, {
      ...this.props
    });
    this.bindEventHandlers(this.props,undefined);
    this.addText()
  }

  // @ts-ignore
  shouldComponentUpdate(nextProps) {
    console.log('nextProps')
    console.log(this.props,nextProps)
    // @ts-ignore
    this.imageEditorInst = new TuiImageEditor(this.rootEl.current, {
      ...nextProps
    });
    this.addText()
    this.bindEventHandlers(this.props, nextProps);


    return true;
  }

  getInstance() {
    // @ts-ignore
    return this.imageEditorInst;
  }

  getRootElement() {
    return this.rootEl.current;
  }


// @ts-ignore
  bindEventHandlers(props, prevProps) {
    Object.keys(props)
      .filter((key) => /on[A-Z][a-zA-Z]+/.test(key))
      .forEach((key) => {
        const eventName = key[2].toLowerCase() + key.slice(3);
        // For <ImageEditor.tsx onFocus={condition ? onFocus1 : onFocus2} />
        if (prevProps && prevProps[key] !== props[key]) {
          console.log('ho?');
          // @ts-ignore
          this.imageEditorInst.off(eventName);
        }
        // @ts-ignore
        this.imageEditorInst.on(eventName, props[key]);
      });
  }

  render() {
    // @ts-ignore
    return <div ref={this.rootEl} />;
  }
}
