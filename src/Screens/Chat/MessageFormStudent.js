import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  Picker
} from "react-native";
import axios from 'axios';


class MessageForm extends Component {
  state = {
    message: "",
    usertype: this.props.usertype,
    senderid: this.props.sender_id,
    subject: this.props.subject
  };

  sendMessage = async () => {
    console.log(this.state.senderid, this.state.usertype, this.state.subject, this.state.message, this.state.subject)
    try {
      let { data } = await axios
        .post("https://tgesconnect.org/api/Communicate_class", {
          userid: this.state.subject,
          usertype: this.state.usertype,
          message: this.state.message,
          senderid: this.state.senderid,
          subject: this.state.subject,
        })
        .then(response => {
          console.log(response.data);
          this.setState ({
            message:""
          })
          this.clearText();
        });
    } catch (err) {
      console.log(err);
    }
  };

  clearText = () => {
    this._textInput.setNativeProps({text: ''});
  }

  render() {
    return (
    <View>
      <View style={styles.container}>
        <TextInput
          ref={component => this._textInput = component}
          style={styles.textInput}
          placeholder={this.state.message === "" ? this.props.message : null}
          onChangeText={message => {
            this.setState({ message });
          }}
          multiline
          numberOfLines={4}
          underlineColorAndroid={"transparent"}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={()=>{this.sendMessage()}}
        >
          <Image source={require("../../Assets/Images/ic_send.png")} />
        </TouchableOpacity>
      </View>
      </View>
    );
  }
}
export default MessageForm;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    minWidth: "100%",
    backgroundColor: "#eeeeee",
    borderTopColor: "#cccccc",
  },
  textInput: {
    flex: 1,
    backgroundColor: "#ffffff",
    height: 40,
    margin: 10,
    borderRadius: 5,
    padding: 3
  },
  button: {
    flexShrink: 0,
    width: 40,
    height: 40,
    marginTop: 10,
    marginRight: 10,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  container1:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
    }
});
