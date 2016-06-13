import React from "react";
import Button from "react-bootstrap/lib/Button"
import * as $ from "../js/jquery-2.2.4";
import * as Consts from "./Consts";

class GetRecordForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {code:""};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.removeCode = this.removeCode.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    var inputCode = this.state.code;
    if (!inputCode) {
      alert("Don't submit empty code");
      return;
    }
    this.props.onInputSubmit({input: inputCode});
    this.refs.inputCode.value = '';
  }

  handleChange(newValue){
    this.setState({code: newValue});
  }

  removeCode() {
    var inputCode = this.state.code;
    if (!inputCode) {
      alert("Don't submit empty code");
      return;
    }
    // this.refs.inputRecord.value = '';
    $.ajax({
        url: Consts.URL,
        dataType: 'json',
        type: 'POST',
        data: JSON.stringify({
          "remove-record": inputCode
        }),
        success: function (data) {
          console.log(data);
          // this.setState({result: data.result, status: "Delete record success"});
        }.bind(this),
        error: function (xhr, status, err) {
          console.error(URL, status, err.toString());
          // this.setState({result: "Item not deleted.", status: "failure"});
        }.bind(this)
      }
    )
  }

  render() {
    return (
      <form className="getRecordForm" onSubmit={this.handleSubmit}>
        <p>Paste your short code here to get the content: </p>
        <input type="text" placeholder="record number" onChange={this.handleChange.bind(this)} />
        <Button type="submit" bsStyle="primary" className="buttonGroup">Get my content!</Button>
        <Button bsStyle="danger" onClick={this.removeCode} className="buttonGroup">Remove it for privacy</Button>
      </form>
    )
  }
}

export default GetRecordForm;