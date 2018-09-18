import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet, AsyncStorage } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";
import axios from 'axios';

class ActiveChatStudent extends Component{
    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#8E44AD',
          },
        headerTintColor: '#fff',
        title: 'Active Chat'
    }
    state = {
        activeChat : [],
        userid: "",
        group_id: '0',
        is_sub_group: '0',
        usertype: ''
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
              .post("https://tgesconnect.org/api/Communication_student_react", {
                userid: this.state.userid,
                group_id: '0',
                is_sub_group: '0',
                usertype: this.state.usertype,
              })
              .then(response => {
                console.log(response.data);
                if (response.data.status === "success") {
                  //console.log("Success")
                  this.setState({
                    activeChat: response.data.data.chats,
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
                data={this.state.activeChat}
                renderItem={({ item }) => (
                  <ListItem
                    // roundAvatar
                    title={item.subject_name}
                    badge={item.count_msg > 0 ? { value: item.count_msg, textStyle: { color: 'white' }, containerStyle: {backgroundColor: '#8E44AD'} }: null}
                    // subtitle={item.email}
                    // avatar={{ uri: item.picture.thumbnail }}
                    containerStyle={{ borderBottomWidth: 0 }}
                    onPress={()=>this.props.navigation.navigate('ActiveIndividualStudent', {
                    senderID: this.state.userid,
                    userid: item.subject_name,
                    usertype: this.state.usertype,
                    //groupName: item.group_name
                    })}
                    
                  />
                )}
                keyExtractor={item => item.subject_id}
                ItemSeparatorComponent={this.renderSeparator}
                
                // ListHeaderComponent={this.renderHeader}
                // ListFooterComponent={this.renderFooter}
                // onRefresh={this.handleRefresh}
                // refreshing={this.state.refreshing}
                // onEndReached={this.handleLoadMore}
                // onEndReachedThreshold={50}
              />
            </List>
            </View>
          )
        }
}
export default ActiveChatStudent;

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