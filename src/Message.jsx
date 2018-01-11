import React, {Component} from 'react';

class Message extends Component {

  render() {

    var type = this.props.type;
    var content = this.props.content;
    var message;

    if (type === "message") {
      if (content.match(/\.(jpeg|jpg|gif|png)/)) {
        //split content on space
        const parsed = content.split(/(http\S+\.jpg|png|gif|jpeg)/).map(word => {
          if (/http\S+\.(jpg|png)/.exec(word))
            return {type: 'img', content: word}
          return {type: 'text', content: word};
        });

        const rendered = parsed.map((item, index) => {
          switch(item.type){
            case 'img':
              return <img key={index} style={{ width: '60%' }} src={item.content} />
            default:
              return <div key={index}>{item.content}&nbsp;</div>
          }
        });

        message = (
          <div className="message">
            <span className="message-username" style={{color:this.props.color}}>{this.props.username}</span>

            <div className="message-content">
              {rendered}
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