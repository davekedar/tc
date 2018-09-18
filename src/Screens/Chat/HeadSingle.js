import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    FlatList
    } from "react-native";
import axios from 'axios';
import { Button, Container, Content, Header, Body, Left, Right, Title } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { List, ListItem, SearchBar, CheckBox } from "react-native-elements";
    
    // const itemId = this.props.navigation.getParam('itemId', 'NO-ID');
    // const otherParam = this.props.navigation.getParam('otherParam', 'some default value');

    class TeacherSubjectSingle extends Component{
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
            class_id: null,
            userid: null,
            usertype: null,
            student_list: [],
            checked: [],
        }

        componentWillMount = async () => {
            const {class_id, student_list, userid, usertype} = this.props.navigation.state.params;
            await this.setState({
                class_id : class_id,
                student_list : student_list,
                userid : userid,
                usertype : usertype,
            })
            //console.log(this.state.student_list.subject_name)
            var result = student_list.filter(function( obj ) {
                return obj.class_section_name == class_id;
              });
            this.setState({
                student_list: result[0],
            })
            
        }

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

        checkItem = (item) => {
            const { checked } = this.state;
            var newArr = [];
        
            if (!checked.includes(item)) {
                newArr = [...checked, item];
            } else {
              newArr = checked.filter(a => a !== item);
            }
            this.setState({ checked: newArr }, () => console.log('updated state', newArr))
        };

        render(){
            
            return (
                <Container>
                    <Header style={{ backgroundColor: "#8E44AD" }}>
                        <Left>
                            <Button transparent onPress={()=> this.props.navigation.navigate('Head')}>
                                <Icon name="ios-arrow-dropleft" size={24} color='white' />
                            </Button>
                        </Left>
                        <Body>
                            <Title style={{ color: "white" }}>{this.state.class_id}</Title>
                        </Body>
                        <Right>
                            {this.state.checked.length !== 0 ? <Button transparent onPress={()=> this.props.navigation.navigate('GroupChat', {
                            rc_id: this.state.checked.join(),
                            userid: this.state.userid,
                            usertype: this.state.usertype,
                            subject_name: this.state.student_list.subject_name
                            })}>
                                <Text style={{color:'white'}}>Start Chat</Text>
                            </Button> : null}
                        </Right>
                    </Header>
                    <View style={{flex: 1, backgroundColor: '#fff'}}>
                    <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
                    <FlatList
                        data={this.state.student_list.students}
                        extraData={this.state.checked}
                        renderItem={({ item }) => (
                        <ListItem
                            title={<CheckBox
                            title={item.name}
                            checkedColor='#8E44AD'
                            onPress={() => this.checkItem(item.userid)}
                            checked={this.state.checked.includes(item.userid)}
                            />}
                            onPress={()=>this.props.navigation.navigate('IndividualChat', {
                            rc_id: item.userid,
                            userid: this.state.userid,
                            usertype: this.state.usertype,
                            subject_name: this.state.student_list.subject_name
                            })}
                        />
                        )}
                        keyExtractor={item => item.userid}
                        ItemSeparatorComponent={this.renderSeparator}
                        
                    />
                    </List>
                    </View>
                </Container>
            );
        }
    }
export default TeacherSubjectSingle;

const styles = StyleSheet.create({
    container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
    }
});