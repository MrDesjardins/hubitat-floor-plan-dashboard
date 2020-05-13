// adapted from https://github.com/tajo/react-portal/blob/55ed77ab823b03d1d4c45b950ba26ea5d687e85c/src/LegacyPortal.js

import React from "react";
import ReactDOM from "react-dom";

export interface PortalProps {
  node?: HTMLElement;
}
export default class Portal extends React.Component<PortalProps> {
  private defaultNode: HTMLElement | null = null;
  public componentDidMount() {
    this.renderPortal();
  }

  public componentDidUpdate(props: PortalProps) {
    this.renderPortal();
  }

  public componentWillUnmount() {
    const n = this.defaultNode || this.props.node; // It will have one defined for sure
    if (n) {
      ReactDOM.unmountComponentAtNode(n);
    }
    if (this.defaultNode) {
      document.body.removeChild(this.defaultNode);
    }
    this.defaultNode = null;
  }

  public renderPortal(): void {
    if (!this.props.node && !this.defaultNode) {
      this.defaultNode = document.createElement("div");
      document.body.appendChild(this.defaultNode);
    }

    let children = this.props.children;
    // https://gist.github.com/jimfb/d99e0678e9da715ccf6454961ef04d1b
    // if (typeof children.type === "function") {
    //     children = React.cloneElement(children);
    // }

    ReactDOM.render(children as any, this.props.node || this.defaultNode);
  }

  public render() {
    return null;
  }
}
