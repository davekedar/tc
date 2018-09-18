import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    FlatList,
    TextInput,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView
    } from "react-native";
import axios from 'axios';
import { Button, Container, Content, Header, Body, Left, Right, Title } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { List, ListItem, SearchBar } from "react-native-elements";
    
    // const itemId = this.props.navigation.getParam('itemId', 'NO-ID');
    // const otherParam = this.props.navigation.getParam('otherParam', 'some default value');

    class DepartmentIndividualSchool extends Component{
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
            school_id: null,
            school_name: null,
            employee_id: null,
            message: 'Type Here'
        }

        componentWillMount = async () => {
            const {school_name, school_id, employee_id} = this.props.navigation.state.params;
            await this.setState({
                school_id,
                school_name,
                employee_id
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

        sendMessage = async () => {
            try {
              let { data } = await axios
                .post("https://tgesconnect.org/api/General_communication_send_chat", {
                    employee_id: this.state.employee_id,
                    school_id: this.state.school_id,
                    message: this.state.message,
                })
                .then(response => {
                  alert("Message Sent Successfully")
                //   if (response.data.status === "success") {
                //     //console.log("Success")
                //     this.setState({
                //       headChat: response.data.data.academy_communication,
                //     });
                //   } else {
                //     alert("Something went wrong");
                //   }
                });
            } catch (err) {
              console.log(err);
            }
            {this.props.navigation.navigate('ChatScreen')}
          };


        render(){
            
            return (
                <Container>
                    <Header style={{ backgroundColor: "#8E44AD" }}>
                        <Left>
                            <Button transparent onPress={()=> this.props.navigation.navigate('DepartmentMain')}>
                                <Icon name="ios-arrow-dropleft" size={24} color='white' />
                            </Button>
                        </Left>
                        <Body>
                            <Title style={{ color: "white" }}>{this.state.school_name}</Title>
                        </Body>
                        <Right />
                    </Header>
                    <KeyboardAvoidingView style={{flex: 1, justifyContent: 'flex-end'}} behavior="padding" enabled>
                        <View style={styles.container}>
    
                            <TextInput
                            style={styles.textInput}
                            placeholder={this.state.message}
                            returnKeyType='send'
                            onChangeText={(message) => {this.setState({message}); }}
                            //value={this.props.message}
                            multiline
                            numberOfLines = {4}
                            underlineColorAndroid={'transparent'}
                            />
                    
                            <TouchableOpacity
                                style={styles.button}
                                onPress={this.sendMessage}
                                // disabled={isButtonDisabled}
                                >
                    
                                <Image
                                source={require('../../Assets/Images/ic_send.png')}
                                />
                    
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </Container>
            );
        }
    }
export default DepartmentIndividualSchool;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        minWidth: '100%',
        backgroundColor: '#eeeeee',
        borderTopColor: '#cccccc',
        borderTopWidth: 1,
      },
      textInput: {
        flex: 1,
        backgroundColor: '#ffffff',
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
        alignItems: 'center',
        justifyContent:'center'
      }
});