import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
    } from "react-native";
import axios from 'axios';
import { Container, Header, Content, Accordion } from "native-base";
    
    // const itemId = this.props.navigation.getParam('itemId', 'NO-ID');
    // const otherParam = this.props.navigation.getParam('otherParam', 'some default value');

    class AdminSingle extends Component{
        static navigationOptions = {
            headerStyle: {
                backgroundColor: '#8E44AD',
              },
            headerTintColor: '#fff',
            title: 'F.A.Q'
        }

        state = {
            group_id: null,
            userid: null,
            usertype: null,
            groupName: '',
            faq : []
        }

        componentWillMount = async () => {
            const {groupId, groupName, userid, usertype} = this.props.navigation.state.params;
            await this.setState({
                group_id : groupId,
                groupName : JSON.stringify(groupName),
                userid : userid,
                usertype : usertype,
            })
            console.log(this.state.userid, this.state.group_id, this.state.usertype);            
        }

        componentDidMount = async () => {
            console.log("..",this.state.userid, this.state.group_id, this.state.usertype);
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
                     <Content>
                        <Accordion dataArray={this.state.faq}
                        headerStyle={{ backgroundColor: "#b7daf8" }}
                        contentStyle={{ backgroundColor: "#ddecf8" }}/>
                    </Content>
                </Container>
            );
        }
    }
export default AdminSingle;

const styles = StyleSheet.create({
    container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
    }
});