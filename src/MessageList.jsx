import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    // console.log("Rendering <MessageList />");
    // console.log("on messagelist",this.props.color);

    return (


      <main className="messages">
        {this.props.messages.map(message => (
          <Message
            key={message.id}
            username={message.username}
            content={message.content}
            type={message.type}
            color={message.color}
            />

        ))}

      </main>
    );

  }
}

export default MessageList;