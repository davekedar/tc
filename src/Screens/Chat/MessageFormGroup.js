import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  Picker,
  AsyncStorage
} from "react-native";
import axios from "axios";
import { Dropdown } from "react-native-material-dropdown";
import { Input } from "native-base";

class MessageForm extends Component {
  state = {
    message: "",
    rc_id: this.props.rc_id,
    usertype: this.props.usertype,
    senderid: this.props.userid,
    subject: this.props.subject
  };

  sendMessage = async () => {
    console.log(
      this.state.rc_id,
      this.state.usertype,
      this.state.senderid,
      this.state.message,
      this.state.subject
    );
    try {
      let { data } = await axios
        .post("https://tgesconnect.org/api/Communicate_class", {
          userid: this.state.rc_id,
          usertype: this.state.usertype,
          message: this.state.message,
          senderid: this.state.senderid,
          subject: this.state.subject
        })
        .then(response => {
          console.log(response.data);
          this.setState({
            message: ""
          });
        });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <View>
        <View style={styles.container}>
          <Input
            style={styles.textInput}
            value={this.state.message}
            placeholder={this.props.message}
            underlineColorAndroid="transparent"
            onChangeText={message => {
              this.setState({ message });
            }}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.sendMessage();
            }}
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
    borderTopWidth: 1,
    flex: 1,
    justifyContent: "flex-end"
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
  container1: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
