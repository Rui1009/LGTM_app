import React from 'react';
import TuiImageEditor from 'tui-image-editor';

export default class ImageEditor extends React.Component {
  rootEl = React.createRef();
  componentDidMount() {
    // @ts-ignore
    this.imageEditorInst = new TuiImageEditor(this.rootEl.current, {
      ...this.props
    });
    this.bindEventHandlers(this.props,undefined);
  }

  componentDidUpdate(): void {
    // // @ts-ignore
    // this.imageEditorInst.addText('init text', {
    //   styles: {
    //     fill: '#f5f5f5',
    //     fontSize: 50,
    //     fontWeight: 'bold'
    //   },
    //   position: {
    //     x: 50,
    //     y: 60
    //   }
    // })
  }

  // @ts-ignore
  shouldComponentUpdate(nextProps) {
    console.log('nextProps')
    console.log(this.props,nextProps)
    // @ts-ignore
    this.imageEditorInst = new TuiImageEditor(this.rootEl.current, {
      ...nextProps
    });

    console.log("test")
    console.log(nextProps.includeUI.loadImage.path)


    setTimeout(() =>{
        try {
          // @ts-ignore
          this.imageEditorInst.addText('LGTM', {
            styles: {
              fill: '#ff0007',
              fontSize: 150,
              fontWeight: 'bold',
            },
            position: {
              x: 200,
              y: 150
            }
            // @ts-ignore
          }).catch((e)=> console.log(e))
        }
        catch (e) {
          console.log(e)
        }
      }

      ,200)


    this.forceUpdate()
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
