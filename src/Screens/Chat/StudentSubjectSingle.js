import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
    } from "react-native";
import axios from 'axios';
import { Button, Container, Content, Header, Body, Left, Right, Title } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import MessageFormStudent from './MessageFormStudent';
    
    // const itemId = this.props.navigation.getParam('itemId', 'NO-ID');
    // const otherParam = this.props.navigation.getParam('otherParam', 'some default value');

    class StudentSubjectSingle extends Component{
        static navigationOptions = {
            header : null
        }
        // static navigationOptions = {
        //     headerStyle: {
        //         backgroundColor: '#8E44AD',
        //       },
        //     headerTintColor: '#fff',
            
        // }

        state = {
            subject_id: null,
            userid: null,
            usertype: null,
            subject_name: null,
            
        }

        componentWillMount = async () => {
            const {subject_id, subject_name, userid, usertype} = this.props.navigation.state.params;
            await this.setState({
                subject_id : subject_id,
                subject_name : subject_name,
                userid : userid,
                usertype : usertype,
            })
            //console.log(this.state.userid, this.state.group_id, this.state.usertype);            
        }

        componentDidMount = async () => {
            console.log("..",this.state.userid, this.state.subject_id, this.state.usertype);
            try {
                let { data } = await axios
                  .post("https://tgesconnect.org/api/Communication_group_react", {
                    userid: this.state.userid,
                    group_id: this.state.group_id,
                    is_sub_group: '0',
                    usertype: this.state.usertype,
                  })
                  .then(response => {
                    console.log(response.data.data.faq);
                    if (response.data.status === "success") {
                      //console.log("Success")
                      this.setState({
                        faq: response.data.data.faq,
                      });
                    } else {
                      alert("Something went wrong");
                    }
                  });
              } catch (err) {
                console.log(err);
              }
              //console.log(this.state.adminChat.group_name[0])
        }

        render(){
            
            return (
                <Container>
                    <Header style={{ backgroundColor: "#8E44AD" }}>
                        <Left>
                            <Button transparent onPress={()=> this.props.navigation.navigate('StudentSubject')}>
                                <Icon name="ios-arrow-dropleft" size={24} color='white' />
                            </Button>
                        </Left>
                        <Body>
                            <Title style={{ color: "white" }}>{this.state.subject_name}</Title>
                        </Body>
                        <Right />
                    </Header>
                    <Content>
                        <MessageFormStudent 
                            message='Type Here'
                            usertype={this.state.usertype}
                            sender_id={this.state.userid}
                            subject={this.state.subject_name}
                            />
                    </Content>
                </Container>
            );
        }
    }
export default StudentSubjectSingle;

const styles = StyleSheet.create({
    container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
    }
});