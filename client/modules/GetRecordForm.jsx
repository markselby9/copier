import React from "react";
import Button from "react-bootstrap/lib/Button"
import * as $ from "../js/jquery-2.2.4";
import * as Consts from "./Consts";

class GetRecordForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {record_code:""};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.removeCode = this.removeCode.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    var inputCode = this.state.record_code;
    if (!inputCode) {
      alert("Don't submit empty record_code");
      return;
    }
    this.props.onInputSubmit({input: inputCode});
  }

  handleChange(event){
    this.setState({record_code: event.target.value});
  }

  removeCode() {
    var inputCode = this.state.record_code;
    if (!inputCode) {
      alert("Don't give me empty record_code to remove");
      return;
    }
    // this.refs.inputRecord.value = '';
    $.ajax({
        url: Consts.URL+'/remove/'+inputCode,
        dataType: 'json',
        type: 'GET',
        // data: JSON.stringify({
        //   "remove-record": inputCode
        // }),
        success: function (data) {
          console.log(data);
          this.props.onRemoveRecord({result:data.result, status:data.status});
          // alert("Remove success!");
        }.bind(this),
        error: function (xhr, status, err) {
          console.error(URL, status, err.toString());
          // alert("Remove failed!");
          this.props.onRemoveRecord({result:"failure", status:err.toString()});
        }.bind(this)
      }
    )
  }

  render() {
    return (
      <form className="getRecordForm" onSubmit={this.handleSubmit}>
        <p>Paste your short code here to get the content: </p>
        <input type="text" placeholder="record number" value={this.state.record_code} onChange={this.handleChange} />
        <Button type="submit" bsStyle="primary" className="buttonGroup">Get my content!</Button>
        <Button bsStyle="danger" onClick={this.removeCode} className="buttonGroup">Remove it for privacy</Button>
      </form>
    )
  }
}

export default GetRecordForm;