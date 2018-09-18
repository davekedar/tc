import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Button
    } from "react-native";
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

class WelcomeScreen extends Component{
    static navigationOptions = {
        header : null
    }
    render(){
        return (
            <View style={styles.container}>
                <Text>WelcomeScreen</Text>
                <Button title="Login"
                onPress={()=>this.props.navigation.navigate("AuthScreen")}/>
            </View>
        );
    }
}
export default WelcomeScreen;

const styles = StyleSheet.create({
    container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
    }
});