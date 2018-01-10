import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props){
    super(props);
    this.onNameChange = this.onNameChange.bind(this);
    this.onNewMessage = this.onNewMessage.bind(this);
  }

  onNameChange(event){
    if (event.key === 'Enter') {
      this.props.newUsername(event.target.value);
    }
  }
  onNewMessage(event){
    if (event.key === 'Enter') {
      this.props.addMessage(event.target.value);
      event.target.value = "";
    }

  }
  render() {
    // console.log("Rendering <ChatBar />");
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)"
          onKeyPress = {this.onNameChange}
        />
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          onKeyPress = {this.onNewMessage}

        />
      </footer>
    );
  }

}

export default ChatBar;