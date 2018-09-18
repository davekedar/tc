import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Platform,
    Image,
    AsyncStorage,
    SafeAreaView
} from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Body, Title, Button } from 'native-base';
import Metrics from '../Styles/themes/Metrics';
import Fonts from '../Styles/themes/Fonts';
import Colors from '../Styles/themes/Colors';
import styles from '../Styles/AuthStyle';
import logo from '../Assets/Images/logo.png';
import axios from 'axios';

let i = 1;

class AuthScreen extends Component {
    static navigationOptions = {
        header : null
    }

    state = {
        username: '2980',
        password: '9898208987',
        devie_type: 'ios',
        device_token: '123456',
        usertype: null,
        loading: false,
    }

    componentWillMount = async() => {
        const userid = await AsyncStorage.getItem('userid');
        if (userid !== null) {
            this.props.navigation.navigate('HomeScreenTabs')
        }
    }
    
    loginHandler = async () => {
        try {
          let { data } = await axios.post('https://tgesconnect.org/api/Login', {
            username: this.state.username,
            password: this.state.password,
            usertype: this.state.usertype,
            device_type : 'android',
            device_token: '123456'
          })
          .then((response) => {
            // console.log(response.data);
            if(response.data.status === 'success'){
              AsyncStorage.setItem('usertype', response.data.data.user_type_id);
              AsyncStorage.setItem('userid', response.data.data.userid.toString());
              this.props.navigation.navigate('HomeScreenTabs')
            } else {
              alert('Something went wrong');
            }
        })
        } catch (err) {
          console.log(err);
        }
    }

    patentButtonPressed = async() => {
        try {
            await this.setState({
                usertype: 'parents'
            });
            //console.log(this.state.usertype)
            this.loginHandler();
        }
        catch (err) {
            console.log(err);
        }
    }

    employeButtonPressed = async() => {
        try {
            await this.setState({
                usertype: 'employee'
            });
            //console.log(this.state.usertype)
            this.loginHandler();
        }
        catch (err) {
            console.log(err);
        }
    }

    admissionButtonPressed = async() => {
        try {
            await this.setState({
                usertype: 'applicant'
            });
            //console.log(this.state.usertype)
            this.loginHandler();
        }
        catch (err) {
            console.log(err);
        }
    }

    render(){
        return (
            
            <Container>
                {/* <Header style={{backgroundColor:"#8E44AD"}}>
                    <Body>
                        <Title style={{color:'white'}}>TGES Connect</Title>
                    </Body>
                </Header> */}
                <Content style={{backgroundColor:'black'}}>
                <Image source={require('../Assets/Images/logo.png')} style={styles.image}/>
                <View style={styles.inputFieldStyles}>
                        <View style={styles.containEmail}>
							<Input
								ref='email'
								style={styles.inputEmail}
								editable={true}
								keyboardType='email-address'
								returnKeyType='next'
								autoCapitalize='none'
								autoCorrect={false}
                                placeholder="Username"
								underlineColorAndroid='transparent'
                                onChangeText={(username) => {this.setState({username}); }}
								/>
						</View>
                        <View style={styles.divider}/>
                        <View style={styles.containPassword}>
							<Input
								ref='password'
								style={styles.inputEmail}
								editable={true}
								keyboardType='default'
								returnKeyType='next'
								autoCapitalize='none'
								autoCorrect={false}
								underlineColorAndroid='transparent'
								placeholder='Password'
								placeholderTextColor="rgba(0,0,0,0.20)"
								secureTextEntry={true}
                                onChangeText={(password) => {this.setState({password}); }}/>
						</View>
                </View>
                <View style={styles.signbtnSec}>
						<Button style={styles.signInBtn} onPress={this.patentButtonPressed}>
							<Text style={styles.signInBtnText}>Parent Login</Text>
						</Button>
				</View>
                <View style={styles.signbtnSec1}>
						<Button style={styles.signInBtn} onPress={this.employeButtonPressed}>
							<Text style={styles.signInBtnText}>Employee Login</Text>
						</Button>
				</View>
                <View style={styles.signbtnSec1}>
						<Button style={styles.signInBtn} onPress={this.admissionButtonPressed}>
							<Text style={styles.signInBtnText}>New Admission Login</Text>
						</Button>
				</View>
			    <Text style={styles.forgotPassword} onPress={() => alert("Forgot Password")}>Forgot your password?</Text>
                <Text style={styles.forgotPassword} onPress={() => alert("Privacy Policy Clicked")}>Privacy Policy</Text>
                </Content>
            </Container>
            
        );
    }
}

export default AuthScreen;