import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
    } from "react-native";


class Message extends Component{
    render(){
        const alignItems = this.props.align === 'Left' ? 'flex-start' : 'flex-end'
        const alignText = alignText === 'flex-start' ? 'flex-end' : 'flex-start'
        const MESSAGE_TEXT_MARGIN = 50
        const margin = this.props.align === 'Left' ? {marginLeft: MESSAGE_TEXT_MARGIN} : {marginRight: MESSAGE_TEXT_MARGIN}
        return (
            <View style={styles.container}>
                <View style={ [this.props.align === 'Left' ? styles.bubbleLeft : styles.bubbleRight, {alignItems: alignItems}, margin] }>
                    <Text style={{alignSelf: alignText}}>{this.props.text}</Text>
                    <Text style={{alignSelf: 'flex-end'}}>{this.props.from}</Text>
                </View>
            </View>
        );
    }
}
export default Message;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#eeeeee',
        borderRadius: 5
      },
      bubbleRight: {
        backgroundColor: '#e5bbf7',
        flex: 1,
        borderRadius: 8,
        padding:8
      },
      bubbleLeft: {
        backgroundColor: '#fff',
        flex: 1,
        borderRadius: 8,
        padding:8
      },
      userText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold'
      },
      messageText: {
        flex: 1,
        color: 'white',
        fontSize: 16
      }
});