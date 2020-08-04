import React, { Component } from 'react';

export default class Frame extends Component {
  constructor(props) {
    super(props);

    this.initIframe(props.frameProps);
    this.print = this.print.bind(this);
    this.removeHeaderAndFooter = this.removeHeaderAndFooter.bind(this);
    this.addStyles = this.addStyles.bind(this);
    this.onUpdateContent = this.onUpdateContent.bind(this);
  }

  initIframe(frameProps) {
    this.iframeEl = document.createElement('iframe');
    for (let key in frameProps) {
      this.iframeEl[key] = frameProps[key];
    }
  }

  onUpdateContent() {
    if (!!this.props.onUpdateContent) {
      this.props.onUpdateContent(this, this.state.window);
    }
  }

  setContent(innerBody) {
    const body = '<body>' + innerBody + '</body>';
    this.state.window.document.open();
    this.state.window.document.write(body);
    this.state.window.document.close();
    this.onUpdateContent();
  }

  addStyles(styles) {
    const doc = this.state.window.document;
    const styleElement = doc.createElement('style');
    styleElement.type = 'text/css';
    if (styleElement.styleSheet) {
      styleElement.styleSheet.cssText = styles;
    } else {
      styleElement.appendChild(doc.createTextNode(styles));
    }
    doc.getElementsByTagName('head')[0].appendChild(styleElement);
  }

  fixHeight() {
    this.iframeEl.style.height =
      this.state.window.document.documentElement.scrollHeight + 'px';
  }

  addCSS(href) {
    const doc = this.state.window.document;

    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.onload = () => {
      setTimeout(() => {
        this.fixHeight(); // TODO: fix font load time
      }, 100);
    };
    link.href = href;

    doc.getElementsByTagName('head')[0].appendChild(link);
  }

  removeHeaderAndFooter() {
    this.addStyles('@page { size: auto; margin: 0mm }');
  }
  print() {
    this.state.window.print();
  }

  componentDidMount() {
    this.wrapper.appendChild(this.iframeEl);
    const window = this.iframeEl.contentWindow;
    this.setState({ window });
  }
  componentDidUpdate() {
    this.setContent(this.props.content);
    this.addStyles('body{direction: rtl; margin: 0}');
    this.addCSS('/fonts/iranyekan/iranyekan.css');
  }

  render() {
    return <div ref={(wrapper) => (this.wrapper = wrapper)}></div>;
  }
}
