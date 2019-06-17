import React, { Component } from "react";
import { Picture } from "react-responsive-picture";
import { withFirebase } from "../Firebase";

export class App extends Component {
  state = {
    items: null,
    image: null
  };

  componentDidMount() {
    this.props.firebase.storage
      .ref("pictures")
      .listAll()
      .then(({ items }) => {
        this.setState({ items });
      })
      .then(() => {
        this.getImage(this.state.items[0]);
      });
  }

  getImage(image) {
    let { state } = this;
    this.props.firebase.storage
      .ref()
      .child(image.fullPath)
      .getDownloadURL()
      .then(url => {
        state.image = url;
        this.setState(state);
      });
  }

  render() {
    const { image } = this.state;

    let imageComp;
    if (image) {
      imageComp = <Picture src={image} alt="doobi" />;
    } else {
      imageComp = <span>Loading...</span>;
    }

    return <div>{imageComp}</div>;
  }
}

export default withFirebase(App);
