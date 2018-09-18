import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Image
    } from "react-native";
import { Container, Header, Title, Button, Left, Right, Body, Icon } from 'native-base';
import styles from '../Styles/ProfileStyle';
import Icons from 'react-native-vector-icons/FontAwesome'

class ProfileScreen extends Component{
    render(){
        return (
            <Container>
                <Header style={{backgroundColor: '#8E44AD'}}>
                <Left>
                </Left>
                <Body>
                    <Title style={{color: 'white'}}>Profile</Title>
                </Body>
                <Right />
                </Header>
                <ImageBackground style={styles.mainimg} source={require('../Assets/Images/banner.jpg')}>
                    </ImageBackground>
                <Image source={require('../Assets/Images/profile.jpg')} style={styles.userimg}/>
                <View style={{backgroundColor: 'white', flex: 1, justifyContent: 'center'}}>
                    <Text style={{alignSelf: 'center'}}>Name : Shree Nitin Bhut</Text>            
                    <Text style={{alignSelf: 'center'}}>Class : 1 O</Text>            
                    <Text style={{alignSelf: 'center'}}>School: SN Kansagra School</Text>            
                </View>
            </Container>
        );
    }
}
export default ProfileScreen;

