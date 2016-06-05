import React from "react";

class GetRecordForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    var inputCode = this.refs.inputCode.value.trim();
    if (!inputCode) {
      alert("Don't submit empty code");
    }
    this.props.onInputSubmit({input: inputCode});
    this.refs.inputCode.value = '';
  }

  render() {
    return (
      <form className="getRecordForm" onSubmit={this.handleSubmit}>
        <p>Paste your short code here to get the content: </p>
        <input type="text" placeholder="record number" ref="inputCode"/>
        <input type="submit" value="Get my content!"/>
      </form>
    )
  }
}

export default GetRecordForm;