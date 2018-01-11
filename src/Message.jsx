import React, {Component} from 'react';

class Message extends Component {

  render() {
    // console.log("Rendering <Message />");
    //console.log("on message",this.props.color);
    console.log("on message.jsx",this.props.content);

    var type = this.props.type;
    var content = this.props.content;




    var message;
    if (type === "message") {
      if (content.endsWith('.jpg')||content.endsWith('.png')||content.endsWith('.gif')||content.endsWith('.jpeg')) {
        console.log("split", content.split(" "));
        var splitcontent = content.split(" ");
        console.log(splitcontent);
        var url = splitcontent.slice(splitcontent.length-1);
        console.log(url);
        var msg = splitcontent.slice(0, splitcontent.length-1).join(" ");
        console.log(msg);
        //arr.split(" ") split on space, grab last element(url) - arr.slice(arr.lenght-1),s
        message = (
          <div className="message">
            <span className="message-username" style={{color:this.props.color}}>{this.props.username}</span>

            <div className="message-content">
              <span>{msg}</span>
              <p><img src={url} /></p>
            </div>
          </div>
        )
      } else {
        message = (
          <div className="message">
            <span className="message-username" style={{color:this.props.color}}>{this.props.username}</span>
            <span className="message-content">{this.props.content}</span>
          </div>
        )
      }


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