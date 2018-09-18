import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, AsyncStorage } from "react-native";
//import AdminChat from './Chat/AdminChat';
//import AcademicChat from './Chat/AcademicChat';
//import ActiveChat from './Chat/ActiveChat';
import { createMaterialTopTabNavigator } from "react-navigation";
import Icon from "react-native-vector-icons/Ionicons";
import {
  Button,
  Container,
  Content,
  Header,
  Body,
  Left,
  Right,
  Title
} from "native-base";
import axios from "axios";
import Metrics from "../Styles/themes/Metrics";
import Fonts from "../Styles/themes/Fonts";

class ChatScreen extends Component {
  state = {
    userid: "",
    usertype: "",
    show_department_communication: "",
    show_academy_communication: "",
    show_class_communication: "",
    show_subject_communication: "",
    show_group_list: "",
    show_student_subject: "",
    student_subject: [],
    teacher_subject: [],
    class_teacher: []
  };

  componentWillMount = async () => {
    const userid = await AsyncStorage.getItem("userid");
    const usertype = await AsyncStorage.getItem("usertype");
    this.setState({
        userid,
        usertype
    })
    console.log(this.state.userid, this.state.usertype)
    try {
      let { data } = await axios
        .post("https://tgesconnect.org/api/Communication_group", {
          userid: userid,
          group_id: "0",
          is_sub_group: "0",
          usertype: usertype
        })
        .then(response => {
          //console.log(response.data.data);
          // console.log(response.data.data.show_group_list)
          // console.log(response.data.data.show_academy_communication);
          // console.log(response.data.data.show_class_communication);
          // console.log(response.data.data.show_subject_communication);
          // console.log(response.data.data.show_student_subject);
          if (response.data.status === "success") {
            //console.log("Success")
            this.setState({
              show_department_communication:
                response.data.data.show_department_communication,
              show_academy_communication:
                response.data.data.show_academy_communication,
              show_class_communication:
                response.data.data.show_class_communication,
              show_subject_communication:
                response.data.data.show_subject_communication,
              show_group_list: response.data.data.show_group_list,
              show_student_subject: response.data.data.show_student_subject
            });
          } else {
            alert("Something went wrong");
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: "#8E44AD" }}>
          <Left />
          <Body>
            <Title style={{ color: "white" }}>Chat</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          {this.state.usertype === '1' ? (
            <Button
              style={styles.signInBtn}
              onPress={() =>
                this.props.navigation.navigate("ActiveChatStudent")
              }
            >
              <Text style={styles.signInBtnText}>Active Chats</Text>
            </Button>
          ) : (
            <Button
              style={styles.signInBtn}
              onPress={() =>
                this.props.navigation.navigate("ActiveChatEmployee")
              }
            >
              <Text style={styles.signInBtnText}>Active Chats</Text>
            </Button>
          )}
          <Text style={{ marginTop: 10, alignSelf: "center" }}>
            Start New Chat
          </Text>
          {this.state.show_group_list === 1 ? (
            <Button
              style={styles.signInBtn}
              onPress={() => this.props.navigation.navigate("AdminChat")}
            >
              <Text style={styles.signInBtnText}>Administrative Work</Text>
            </Button>
          ) : null}
          {this.state.show_student_subject === 1 ? (
            <Button
              style={styles.signInBtn}
              onPress={() => this.props.navigation.navigate("StudentSubject")}
            >
              <Text style={styles.signInBtnText}>Academic Work</Text>
            </Button>
          ) : null}
          {this.state.show_academy_communication === 1 ? (
            <Button style={styles.signInBtn}>
              <Text
                style={styles.signInBtnText}
                onPress={() => this.props.navigation.navigate("Head")}
              >
                As Academic Head
              </Text>
            </Button>
          ) : null}
          {this.state.show_subject_communication === 1 ? (
            <Button style={styles.signInBtn}>
              <Text
                style={styles.signInBtnText}
                onPress={() => this.props.navigation.navigate("TeacherSubjectName")}
              >
                As Subject Teacher
              </Text>
            </Button>
          ) : null}
          {this.state.show_class_communication === 1 ? (
            <Button style={styles.signInBtn}>
              <Text
                style={styles.signInBtnText}
                onPress={() => this.props.navigation.navigate("ClassTeacher")}
              >
                As Class Teacher
              </Text>
            </Button>
          ) : null}
          {this.state.show_department_communication === 1 ? (
            <Button style={styles.signInBtn}>
              <Text 
                style={styles.signInBtnText}
                onPress={() => this.props.navigation.navigate("DepartmentMain")}
                >
                Department Communication
                </Text>
            </Button>
          ) : null}
        </Content>
      </Container>
    );
  }
}
export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
  },
  signInBtn: {
    backgroundColor: "#4cd964",
    height: Metrics.HEIGHT * 0.08,
    width: Metrics.WIDTH * 0.92,
    borderRadius: 5,
    alignSelf: "center",
    elevation: 3,
    marginTop: 10
  },
  signInBtnText: {
    color: "#fff",
    fontSize: Fonts.moderateScale(17),
    width: Metrics.WIDTH * 0.92,
    textAlign: "center"
    // fontFamily: Fonts.type.sfuiDisplaySemibold,
  }
});
