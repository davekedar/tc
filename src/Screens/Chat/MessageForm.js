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
import axios from 'axios';
import { Dropdown } from 'react-native-material-dropdown';
import { Input } from 'native-base';

class MessageForm extends Component {
  state = {
    message: "",
    rc_id: this.props.rc_id,
    usertype: '',
    senderid: '',
    activeSubject: [],
    selectedSubject: '',
    role: [],
    selectedrole: '',
    touched: true
  };

  sendMessage = async () => {
    console.log(this.state.rc_id, this.state.usertype, this.state.senderid, this.state.message, this.state.selectedrole)
    try {
      let { data } = await axios
        .post("https://tgesconnect.org/api/Communicate_class", {
          userid: this.state.rc_id,
          usertype: this.state.usertype,
          message: this.state.message,
          senderid: this.state.senderid,
          subject: this.state.selectedrole,
        })
        .then(response => {
          console.log(response.data);
          this.setState({
              message: ""
          })
        });
    } catch (err) {
      console.log(err);
    }
  };

  loadSubject = () => {
    return this.state.activeSubject.map(sub => (
        <Picker.Item label={sub.subject_name} value={sub.subject_id} />
     ))
  }

  componentWillMount = async () => {
    const userid = await AsyncStorage.getItem("userid");
    const usertype = await AsyncStorage.getItem("usertype");
    this.setState({
        senderid: userid,
        usertype
    })
    //console.log(this.state.userid, this.state.usertype)
    try {
      let { data } = await axios
        .post("https://tgesconnect.org/api/Communication_load_conversation", {
          userid: this.state.rc_id,
          employee_id: this.state.senderid,
          page: '1',
          group_name: ""
        })
        .then(response => {
          //console.log(response.data);
          if (response.data.status === "success") {
            //console.log("Success")
              this.setState({
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
    var array2 = [];
    for (i = 0; i < this.state.activeSubject.length; i++) {
    var data = {};
    data['value'] = this.state.activeSubject[i].subject_name;
    array2.push(data)	
    }

    this.setState({
        role: array2
    })
  };

  onChangeText = (text) => {
    this.setState({
        selectedrole: text,
        touched: false
    })
  }

  render() {
    //console.log(this.props.subject)
    return (
    <View>
        <Dropdown
            label='select role'
            data={this.state.role}
            onChangeText={(text)=>{this.onChangeText(text)}}
        />
      <View style={styles.container}>
        {/* <TextInput
          ref={component => this._textInput = component}
          style={styles.textInput}
          placeholder={this.state.message === "" ? this.props.message : null}
          //returnKeyType="send"
          onChangeText={message => {
            this.setState({ message });
          }}
          //value={this.props.message}
          multiline
          numberOfLines={4}
          underlineColorAndroid={"transparent"}
        /> */}
        
        <Input 
          style={styles.textInput}
          placeholder={this.props.message}
          underlineColorAndroid='transparent'
          onChangeText={(message) => {this.setState({message}); }}
          />

        <TouchableOpacity
          style={styles.button}
          onPress={() => {this.state.touched === true ? alert("Please select the role first") : this.sendMessage()}}
          //disabled={this.state.touched}
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
    //borderTopWidth: 1
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
