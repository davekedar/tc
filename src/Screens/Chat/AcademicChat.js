import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
    } from "react-native";

class AcademicChat extends Component{
    render(){
        return (
            <View style={styles.container}>
                <Text>AcademicChat</Text>
            </View>
        );
    }
}
export default AcademicChat;

const styles = StyleSheet.create({
    container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
    }
});