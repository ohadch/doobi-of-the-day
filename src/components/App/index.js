import React, { Component } from "react";
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
      imageComp = <img src={image} alt="doobi" style={{ height: "50vh" }} />;
    } else {
      imageComp = <span>Loading...</span>;
    }

    return (
      <div style={{'text-align': 'center'}}>
        <h1>דובי של היום</h1>
        <div>{imageComp}</div>
        <small>&hearts; אני אוהב אותך זי שלי &hearts;</small>
      </div>
    );
  }
}

export default withFirebase(App);
