import React, {Component} from 'react';

class Message extends Component {

  render() {
    // console.log("Rendering <Message />");
    console.log("on message",this.props.color);

    var type = this.props.type;
    var message;
    if (type === "message") {
      message = (
        <div className="message">
          <span className="message-username" style={{color:this.props.color}}>{this.props.username}</span>
          <span className="message-content">{this.props.content}</span>
        </div>
      )
    } else if (type === 'notification') {
      message = (
        <div className="message system">
          {this.props.content}
        </div>
      )
    }
    return (
      <div>
        {message}
      </div>
    );
  }
}

export default Message;