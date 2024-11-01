import React, { Component } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import Firebase from "../../Firebase";
import * as firebase from "firebase";

class KarachiChat extends Component {
  state = {
    messages: [],
    displayName: "",
  };
 

  render() {
    return (
      <GiftedChat
        renderUsernameOnMessage={true}
        messages={this.state.messages}
        onSend={(message) => {
          Firebase.sendMessage(message);
        }}
        user={{
          _id: Firebase.getUid(),
          name: this.state.displayName,
        }}
      />
    );
  }
  async componentDidMount() {
      const { email, displayName } = await firebase.auth().currentUser;
    
   
    this.setState({ email, displayName });
    console.ignoredYellowBox = ["Setting a timer"];
    await Firebase.loadMessagesKarachi((message) => {
      this.setState((previousState) => {
        return {
          messages: GiftedChat.append(previousState.messages, message),
        };
      });
    });
  }

  componentWillUnmount() {
    Firebase.closeChat();
  }
}

export default KarachiChat;
