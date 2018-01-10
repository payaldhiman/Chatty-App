import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';




class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"},
      messages: [],
      activeUsers: 0,
      color:'black'
    };

    this.addMessage = this.addMessage.bind(this);
    this.newUsername = this.newUsername.bind(this);
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");
    console.log("Connected to server");

    this.socket.onmessage = (event) => {
      console.log('received message from web socket server:', event.data);
      // Update your state
      console.log(event.data.length);


      if (event.data.length === 1) {
        const activeUsers = event.data;
        this.setState({activeUsers: activeUsers});

      } else {
        const newMessage = JSON.parse(event.data);
        const messages = this.state.messages.concat(newMessage);

        console.log(newMessage.color);
        this.setState({messages: messages});
      }

    }
  }

  addMessage(content) {
    const newMessage = {
      type:"message",
      username: this.state.currentUser.name,
      content: content
    };
    this.socket.send(JSON.stringify(newMessage));
  }

  newUsername(user) {

    const newUser = {
      type: 'notification',
      oldUserName: this.state.currentUser.name,
      newUserName: user
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
        <div>{this.state.activeUsers} users online</div>
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
