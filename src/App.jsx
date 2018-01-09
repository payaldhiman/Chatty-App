import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"},
      messages: [{
        id: 1,
        username: "Bob",
        content: "Has anyone seen my marbles?"
      },
      {
        id: 2,
        username: "Anonymous",
        content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
      }]
    };

    this.addMessage = this.addMessage.bind(this);
  }

  addMessage(content) {

    const newMessage = {
      id: Math.random(),
      username: this.state.currentUser.name,
      content: content
    };
    const messages = this.state.messages.concat(newMessage);
    this.setState({messages: messages});


  }

  render() {
    //console.log("Rendering <App />");
    return (
     <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
      </nav>
      <MessageList messages={this.state.messages} />
      <ChatBar currentUser={this.state.currentUser} addMessage={this.addMessage}/>
     </div>
    );
  }
}
export default App;
