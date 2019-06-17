import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import moment from "moment";

const BEGINNING_DATE = new Date("2019-06-17T13:15:52.206Z");

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
        items = items.sort((a, b) => (a.name > b.name ? 1 : -1));
        this.setState({ items });
      })
      .then(() => {
        const { items } = this.state;

        var start = moment(BEGINNING_DATE);
        var end = moment(new Date());
        let imageIdx = Math.floor(moment.duration(end.diff(start)).asDays() % items.length);

        this.getImage(this.state.items[imageIdx]);
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
      imageComp = <img src={image} alt="doobi" style={{ width: "100vw" }} />;
    } else {
      imageComp = <span>Loading...</span>;
    }

    return (
      <div style={{ "text-align": "center" }}>
        <h1>דובי של היום</h1>
        <div>{imageComp}</div>
        <small>&hearts; אני אוהב אותך זי שלי &hearts;</small>
      </div>
    );
  }
}

export default withFirebase(App);
