/**
 * Created by fengchaoyi on 16/6/1.
 */
var URL = "http://localhost:8080/record";

var RecordForm = React.createClass({
  getInitialState: function () {
    return {
      input: ''
    }
  },
  handleSubmit: function (e) {
    e.preventDefault();
    var input = this.refs.input.value.trim();
    if (!input) {
      alert ("Please don't submit empty input!");
      return;
    }
    this.props.onInputSubmit({input: input});
    this.refs.input.value = '';
  },
  render: function () {
    return (
      <form className="recordForm" onSubmit={this.handleSubmit}>
        <p>Your record or record number is: </p>
        <input type="text" placeholder="record / record number" ref="input"/>
        <input type="submit" value="Submit"/>
      </form>
    );
  }
});

var ResultBox = React.createClass({
  render: function () {
    return (
      <div className="resultBox">
        <p> result: {this.props.data}</p>
      </div>
    );
  }
});

var AppBox = React.createClass({
  getInitialState: function () {
    return {
      data: "wait"
    }
  },
  handleFormSubmit: function (input) {
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
        this.setState({data: "success"});
      }.bind(this),
      error: function (xhr, status, err) {
        this.setState({data: "failure"});
        console.error(URL, status, err.toString());
      }.bind(this)
    });
  },
  render: function () {
    return (
      <div className="appBox">
        <RecordForm onInputSubmit={this.handleFormSubmit}/>
        <ResultBox data={this.state.data}/>
      </div>
    );
  }
});

ReactDOM.render(
  <AppBox />,
  document.getElementById('app')
);