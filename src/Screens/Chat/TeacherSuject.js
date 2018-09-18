import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet, AsyncStorage } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";
import axios from 'axios';
import { Button, Container, Content, Header, Body, Left, Right, Title } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

class TeacherSubject extends Component{
    static navigationOptions = {
        header: null
    }
    state = {
        subject_name : null,
        userid: "",
        usertype: '',
        subject_list: [],
        class_id: null
      }
      
      componentWillMount = async () => {
            const {class_id, userid, usertype, subject_list, subject_name} = this.props.navigation.state.params;
            await this.setState({
                class_id : class_id,
                subject_list : subject_list,
                userid : userid,
                usertype : usertype,
                subject_name: subject_name
            })
           
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
              <Container>
              <Header style={{ backgroundColor: "#8E44AD" }}>
              <Left>
                  <Button transparent onPress={()=> this.props.navigation.navigate('TeacherSubject')}>
                      <Icon name="ios-arrow-dropleft" size={24} color='white' />
                  </Button>
              </Left>
              <Body>
                  <Title style={{ color: "white" }}>{this.state.subject_name}</Title>
              </Body>
              <Right>
              </Right>
              </Header>

              <View style={{flex: 1, backgroundColor: '#fff'}}>
              <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
              <FlatList
                data={this.state.subject_list}
                renderItem={({ item }) => (
                  <ListItem
                    // roundAvatar
                    title={item.class_section_name}
                    // subtitle={item.email}
                    // avatar={{ uri: item.picture.thumbnail }}
                    containerStyle={{ borderBottomWidth: 0 }}
                    onPress={()=>this.props.navigation.navigate('TeacherSubjectSingle', {
                    class_id: item.class_section_name,
                    userid: this.state.userid,
                    usertype: this.state.usertype,
                    student_list: item.students,
                    class_name: item.class_section_name,
                    subject_name: this.state.subject_name
                    })}
                  />
                )}
                keyExtractor={item => item.class_section_name}
                ItemSeparatorComponent={this.renderSeparator}
                
              />
            </List>
            </View>
            </Container>
          )
        }
}
export default TeacherSubject;

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