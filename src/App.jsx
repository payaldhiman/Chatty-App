import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';




class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"},
      messages: []
    };

    this.addMessage = this.addMessage.bind(this);
    this.newUsername = this.newUsername.bind(this);
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");
    console.log("Connected to server");
    this.socket.onmessage = (payload) => {
      console.log('received message from web socket server:', payload.data);
      // Update your state
      const newMessage = JSON.parse(payload.data);
      const messages = this.state.messages.concat(newMessage);
      this.setState({messages: messages});

    }
  }

  addMessage(content) {
    const newMessage = {
      username: this.state.currentUser.name,
      content: content,
      type:"message"
    };
    this.socket.send(JSON.stringify(newMessage));
  }

  newUsername(user) {

    const newUser = {
      oldUserName: this.state.currentUser.name,
      newUserName: user,
      type: 'notification'
    }
    this.setState({ currentUser: {name: user}});
    this.socket.send(JSON.stringify(newUser));
  }

  render() {
    //console.log("Rendering <App />");
    return (
     <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
      </nav>
      <MessageList messages={this.state.messages} />
      <ChatBar currentUser={this.state.currentUser}
        addMessage={this.addMessage}
        newUsername={this.newUsername} />
     </div>
    );
  }
}
export default App;
