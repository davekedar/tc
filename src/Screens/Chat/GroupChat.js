import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
    } from "react-native";
import MessageFromGroup from './MessageFormGroup';

class GroupChat extends Component{
    state = {
        rc_id: null,
        userid: null,
        usertype: null,
        subject_name: null,
        message: 'Type Here'
      };
    
      componentWillMount = async () => {
        const {
            rc_id,
            userid,
            usertype,
            subject_name,
        } = this.props.navigation.state.params;
        await this.setState({
          rc_id,
          userid,
          usertype,
          subject_name
        });
        console.log(this.state.rc_id, this.state.userid, this.state.usertype, this.state.subject_name)
      };
    
      static navigationOptions = {
        headerStyle: {
          backgroundColor: "#8E44AD"
        },
        headerTintColor: "#fff",
        title: "Chat with Student"
      };
    
    render(){
        return (
            <View style={styles.container}>
                <MessageFromGroup
                    userid={this.state.userid}
                    usertype={this.state.usertype}
                    rc_id={this.state.rc_id}
                    subject={this.state.subject_name} />
            </View>
        );
    }
}
export default GroupChat;

const styles = StyleSheet.create({
    container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
    }
});