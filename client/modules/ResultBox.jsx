/**
 * Created by fengchaoyi on 16/6/5.
 */
import React from 'react';

class ResultBox extends React.Component{
  render(){
    return (
      <div className="resultBox">
        <p> data: {this.props.data.result}</p>
        <p> status: {this.props.data.status}</p>
      </div>
    );
  }
}

export default ResultBox;