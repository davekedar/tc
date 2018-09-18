import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet, AsyncStorage } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";
import axios from 'axios';

class Head extends Component{
    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#8E44AD',
          },
        headerTintColor: '#fff',
        title: 'Chat As Academic Head'
    }
    state = {
        headChat:[],
        userid: "",
        usertype: '',
      }
      
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
                userid: this.state.userid,
                group_id: '0',
                is_sub_group: '0',
                usertype: this.state.usertype,
              })
              .then(response => {
                console.log(response.data.data);
                if (response.data.status === "success") {
                  //console.log("Success")
                  this.setState({
                    headChat: response.data.data.academy_communication,
                  });
                } else {
                  alert("Something went wrong");
                }
              });
          } catch (err) {
            console.log(err);
          }
          //console.log(this.state.adminChat.group_name[0])
        };
      
        renderSeparator = () => {
              return (
                <View
                  style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#CED0CE",
                  }}
                />
              );
        };
      
        render () {
            
          return (
              <View style={{flex: 1, backgroundColor: '#fff'}}>
              <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
              <FlatList
                data={this.state.headChat}
                renderItem={({ item }) => (
                  <ListItem
                    // roundAvatar
                    title={item.class_section_name}
                    // subtitle={item.email}
                    // avatar={{ uri: item.picture.thumbnail }}
                    containerStyle={{ borderBottomWidth: 0 }}
                    onPress={()=>this.props.navigation.navigate('HeadSingle', {
                    class_id: item.class_section_name,
                    userid: this.state.userid,
                    usertype: this.state.usertype,
                    student_list: this.state.headChat
                    })}
                  />
                )}
                keyExtractor={item => item.class_section_name}
                ItemSeparatorComponent={this.renderSeparator}
                
              />
            </List>
            </View>
          )
        }
}
export default Head;

const styles = StyleSheet.create({
    container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
    }
});

// , {
//     groupId: item.group_id,
//     userid: this.state.userid,
//     usertype: this.state.usertype,
//     groupName: item.group_name
//     }