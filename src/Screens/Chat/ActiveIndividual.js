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
  Image,
  AsyncStorage
} from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";
import axios from "axios";
import Message from "./message";
import MessageList from './MessageList';
import MessageForm from "./MessageForm";
import { Container, Content, Header} from 'native-base'

class ActiveIndividual extends Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#8E44AD"
    },
    headerTintColor: "#fff",
    title: "Active Chat"
  };
  state = {
    activeChat: [],
    activeSubject: [],
    sender_id: null,
    receiver_id: null,
    page: null,
    group_name: null,
    //loggedinUser: '908',
    message: 'Type Here'
  };

  componentWillMount = async () => {
    const {
      sender_id,
      receiver_id,
      page,
      group_name
    } = this.props.navigation.state.params;
    await this.setState({
      sender_id: sender_id,
      receiver_id: receiver_id,
      page: page,
      group_name: group_name
    });
  };

  componentDidMount = async () => {
    const userid = await AsyncStorage.getItem("userid");
    //const usertype = await AsyncStorage.getItem("usertype");
    this.setState({
        receiver_id: userid,
        //usertype
    })
    console.log(this.state.sender_id, this.state.receiver_id, this.state.page)
    try {
      let { data } = await axios
        .post("https://tgesconnect.org/api/Communication_load_conversation", {
          userid: this.state.sender_id,
          employee_id: this.state.receiver_id,
          page: this.state.page,
          group_name: ""
        })
        .then(response => {
          //console.log(response.data);
          if (response.data.status === "success") {
            //console.log("Success")
              this.setState({
                activeChat: response.data.chats,
                activeSubject: response.data.subjects
              });
          } else {
            alert("Something went wrong");
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
                sender_id={this.state.sender_id}/>
              <MessageForm 
                message={this.state.message}
                rc_id={this.state.sender_id}
                usertype={2}
                subject={this.state.activeSubject}
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

// , {
//     groupId: item.group_id,
//     userid: this.state.userid,
//     usertype: this.state.usertype,
//     groupName: item.group_name
//     }
