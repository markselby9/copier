/**
 * Created by fengchaoyi on 16/6/5.
 */
import React from "react";
import GetRecordForm from "./GetRecordForm.jsx";
import SaveRecordForm from "./SaveRecordForm.jsx";
import ResultBox from "./ResultBox.jsx";
import Panel from "react-bootstrap/lib/Panel";
import * as $ from "../js/jquery-2.2.4";
import Consts from "./Consts";

class AppBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: "please input",
      status: "wait"
    };
    this.handleGetRecordFormSubmit = this.handleGetRecordFormSubmit.bind(this);
    this.handleSaveRecordFormSubmit = this.handleSaveRecordFormSubmit.bind(this);
    this.onRemoveRecord = this.onRemoveRecord.bind(this);

    this.URL = Consts.URL;
  }

  handleSaveRecordFormSubmit(input) {
    console.log(input);
    $.ajax({
      url: this.URL,
      dataType: 'json',
      type: 'POST',
      data: JSON.stringify({
        "record": input.input
      }),
      success: function (data) {
        console.log(data);
        this.setState({result: data.result, status: "success"});
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(URL, status, err.toString());
        this.setState({result: "Item not saved.", status: "failure"});
      }.bind(this)
    });
  }

  handleGetRecordFormSubmit(input) {
    console.log(input);
    $.ajax(
      {
        url: this.URL + "/" + input.input,
        dataType: 'json',
        type: 'GET',
        success: function (data) {
          console.log(data);
          this.setState({result: data.result, status: "success"});
        }.bind(this),
        error: function (xhr, status, err) {
          console.error(this.URL, status, err.toString());
          this.setState({result: "Item not found.", status: "failure"});
        }.bind(this)
      });
  }

  render() {
    return (
      <Panel className="appBox">
        <SaveRecordForm onInputSubmit={this.handleSaveRecordFormSubmit}/>
        <GetRecordForm onInputSubmit={this.handleGetRecordFormSubmit} onRemoveRecord={this.onRemoveRecord}/>
        <ResultBox data={this.state}/>
      </Panel>
    );
  }

  onRemoveRecord(remove_result_obj) {
    this.setState({
      result: remove_result_obj.result,
      status: remove_result_obj.status
    });
  }
}

export default AppBox;