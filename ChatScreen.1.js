import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
    } from "react-native";
import AdminChat from './Chat/AdminChat';
import AcademicChat from './Chat/AcademicChat';
import ActiveChat from './Chat/ActiveChat';
import { createMaterialTopTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button, Container, Content, Header, Body, Left, Right, Title } from 'native-base';

class UpdateScreen extends Component{
    
    state = {
      activeIndex : 0
    }

    segmentClicked = (index) => {
      this.setState({activeIndex: index})
    }

    renderSection = () => {
      if (this.state.activeIndex === 0) {
        return <AdminChat navigation={this.props.navigation}/>
      } else if (this.state.activeIndex === 1) {
        return <AcademicChat />
      } else {
        return <ActiveChat />
      }
    }

    render(){
        return (
          <Container>
            <Header style={{backgroundColor: '#8E44AD'}}>
                <Left>
                </Left>
                <Body>
                    <Title style={{color: 'white'}}>Chat</Title>
                </Body>
                <Right />
                </Header>
            <View style={styles.container}>
                <View style={{flexDirection: 'row', justifyContent: 'space-around', borderBottomWidth: 1, borderBottomColor: 'grey' }}>
                  <Button 
                    transparent
                    onPress={()=>{this.segmentClicked(0)}}
                    active={this.state.activeIndex === 0}>
                    <Text style={[this.state.activeIndex === 0 ? { color: '#8E44AD' } : {color: 'grey'}]}>Admin</Text>
                  </Button>
                  <Button 
                    transparent
                    onPress={()=>{this.segmentClicked(1)}}
                    active={this.state.activeIndex === 1}>
                    <Text style={[this.state.activeIndex === 1 ? { color: '#8E44AD' } : {color: 'grey'}]}>Academic</Text>
                  </Button>
                  <Button 
                    transparent
                    onPress={()=>{this.segmentClicked(2)}}
                    active={this.state.activeIndex === 2}>
                    <Text style={[this.state.activeIndex === 2 ? { color: '#8E44AD' } : {color: 'grey'}]}>Chat</Text>
                  </Button>
                </View>
                {this.renderSection()}                
            </View>
            </Container>
        );
    }
}
export default UpdateScreen;


const styles = StyleSheet.create({
    container:{
    flex:1,
    marginTop: 20
    }
});