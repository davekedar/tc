import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Button,
    } from "react-native";
import AwesomeAlert from 'react-native-awesome-alerts';
import { Container, Header, Title, Left, Right, Body, Icon } from 'native-base';

class SettingScreen extends Component{

    state = {
        showAlert : false
    }

    showAlert = () => {
        this.setState({
          showAlert: true
        });
    };
    
    hideAlert = () => {
        this.setState({
          showAlert: false
        });
    };

    logoutHandler = () => {
        this.props.navigation.navigate('AuthScreen')
    }

    render(){
        let data = [{
            value: 'Banana',
          }, {
            value: 'Mango',
          }, {
            value: 'Pear',
          }];
        return (
            <Container>
                <Header style={{backgroundColor: '#8E44AD'}}>
                    <Left>
                    </Left>
                    <Body>
                        <Title style={{color: 'white'}}>Settings</Title>
                    </Body>
                    <Right />
                </Header>
                <View style={styles.container}>
                    <Button 
                        onPress={()=> {this.showAlert()}}
                        title='Log Out' />
                    <AwesomeAlert
                        show={this.state.showAlert}
                        showProgress={false}
                        title="Are you Sure, you want to Logout?"
                        closeOnTouchOutside={true}
                        closeOnHardwareBackPress={false}
                        showCancelButton={true}
                        showConfirmButton={true}
                        cancelText="No, cancel"
                        confirmText="Yes, Log Out"
                        confirmButtonColor="#8E44AD"
                        onCancelPressed={() => {
                            this.hideAlert();
                        }}
                        onConfirmPressed={() => {
                            this.logoutHandler();
                        }}
                        />
                </View>
            </Container>
        );
    }
}
export default SettingScreen;

const styles = StyleSheet.create({
    container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
    }
});