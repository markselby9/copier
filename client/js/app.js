/**
 * Created by fengchaoyi on 16/6/1.
 */
var URL = "http://localhost:8080/record";

var SaveRecordForm = React.createClass({
  getInitialState: function () {
    return {
      input: ''
    }
  },
  handleSubmit: function (e) {
    e.preventDefault();
    var inputRecord = this.refs.inputRecord.value.trim();
    if (!inputRecord) {
      alert("Please don't submit empty input!");
      return;
    }
    this.props.onInputSubmit({input: inputRecord});
    this.refs.inputRecord.value = '';
  },
  render: function () {
    return (
      <form className="saveRecordForm" onSubmit={this.handleSubmit}>
        <p>Paste your content here and get the short code: </p>
        <input type="text" placeholder="record" ref="inputRecord"/>
        <input type="submit" value="Get my code!"/>
      </form>
    );
  }
});

var GetRecordForm = React.createClass({
  handleSubmit: function (e) {
    e.preventDefault();
    var inputCode = this.refs.inputCode.value.trim();
    if (!inputCode) {
      alert("Don't submit empty code");
    }
    this.props.onInputSubmit({input: inputCode});
    this.refs.inputCode.value = '';
  },
  render: function () {
    return (
      <form className="getRecordForm" onSubmit={this.handleSubmit}>
        <p>Paste your short code here to get the content: </p>
        <input type="text" placeholder="record number" ref="inputCode"/>
        <input type="submit" value="Get my content!"/>
      </form>
    )
  }
});

var ResultBox = React.createClass({
  render: function () {
    return (
      <div className="resultBox">
        <p> data: {this.props.data.result}</p>
        <p> status: {this.props.data.status}</p>
      </div>
    );
  }
});

var AppBox = React.createClass({
  getInitialState: function () {
    return {
      result: "please input",
      status: "wait"
    }
  },
  handleSaveRecordFormSubmit: function (input) {
    console.log(input);
    $.ajax({
      url: URL,
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
        this.setState({result: data.result, status: "failure"});
        console.error(URL, status, err.toString());
      }.bind(this)
    });
  },
  handleGetRecordFormSubmit: function (input) {
    console.log(input);
    $.ajax(
      {
        url: URL+"/"+input.input,
        dataType: 'json',
        type: 'GET',
        success: function(data){
          console.log(data);
          this.setState({result: data.result, status: "success"});
        }.bind(this),
        error: function(xhr, status, err){
          this.setState({result: data.result, status: "failure"});
          console.error(URL, status, err.toString());
        }.bind(this)
      });
  },
  render: function () {
    return (
      <div className="appBox">
        <SaveRecordForm onInputSubmit={this.handleSaveRecordFormSubmit}/>
        <GetRecordForm onInputSubmit={this.handleGetRecordFormSubmit}/>
        <ResultBox data={this.state}/>
      </div>
    );
  }
});

ReactDOM.render(
  <AppBox />,
  document.getElementById('app')
);