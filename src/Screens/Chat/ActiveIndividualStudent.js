import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Image
} from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";
import axios from "axios";
import Message from "./message";
import MessageList from './MessageList';
import MessageFormStudent from "./MessageFormStudent";

class ActiveIndividual extends Component {
  
  state = {
    activeChat: [],
    activeSubject: [],
    sender_id: null,
    receiver_id: null,
    page: 1,
    group_name: null,
    message: 'Type Here'
  };

  componentWillMount = async () => {
    const {
      senderID,
      userid,
      usertype,
    } = this.props.navigation.state.params;
    await this.setState({
      sender_id: senderID,
      receiver_id: userid,
      group_name: userid
    });
    console.log(this.state.sender_id, this.state.receiver_id, this.state.group_name)
  };

  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#8E44AD"
    },
    headerTintColor: "#fff",
    title: "Chat with Student"
  };

  componentDidMount = async () => {
    console.log(this.state.sender_id, this.state.receiver_id, this.state.group_name, this.state.page)
    //console.log(this.state.userid)
    try {
      let { data } = await axios
        .post("https://tgesconnect.org/api/Communication_load_conversation", {
          userid: this.state.sender_id,
          employee_id: this.state.receiver_id,
          page: this.state.page,
          group_name: this.state.receiver_id
        })
        .then(response => {
          console.log(response.data);
          if (response.data.status === "success") {
            //console.log("Success")
              this.setState({
                activeChat: response.data.chats,
              });
          } else {
            alert(response.data.message);
          }
        });
    } catch (err) {
      console.log(err);
    }
    //console.log(this.state.activeSubject)
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE"
        }}
      />
    );
  };

  render() {
    //console.log(this.state.activeSubject)
    return (
        <KeyboardAvoidingView
                style={styles.container}
                behavior='padding'
                keyboardVerticalOffset={64}>
        
              <MessageList 
                data={this.state.activeChat}
                id={item => item.chat_converstion_id}
                sender_id={this.state.receiver_id}/>
              <MessageFormStudent 
                message={this.state.message}
                sender_id={this.state.sender_id}
                usertype={1}
                subject={this.state.group_name}
                />
        </KeyboardAvoidingView>
    );
  }
}
export default ActiveIndividual;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: '#eeeeee'
  }
});