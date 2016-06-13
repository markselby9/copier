import React from "react";
import Button from "react-bootstrap/lib/Button";
import * as Consts from "./Consts";

class SaveRecordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {input: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    var inputRecord = this.refs.inputRecord.value.trim();
    if (!inputRecord) {
      alert("Please don't submit empty input!");
      return;
    }
    this.props.onInputSubmit({input: inputRecord});
    // this.refs.inputRecord.value = '';
  }
  
  render() {
    return (
      <form className="saveRecordForm" onSubmit={this.handleSubmit}>
        <p>Paste your content here and get the short code: </p>
        <input type="text" placeholder="record" ref="inputRecord"/>
        <Button type="submit" bsStyle="primary" className="buttonGroup">Get my code</Button>

      </form>
    );
  }
}

export default SaveRecordForm;