import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    FlatList
    } from "react-native";
import Message from "./message";

class MessageList extends Component{
    render(){
        return (
            <FlatList 
                ref={ref => this.flatList = ref}
                onContentSizeChange={() => this.flatList.scrollToEnd({animated: true})}
                onLayout={() => this.flatList.scrollToEnd({animated: true})}
                data={this.props.data}
                renderItem={({ item }) => (
                  <Message 
                    align={item.chat_from === this.props.sender_id ? 'Right' : 'Left'}
                    text={item.chat_text}
                    from={item.chat_from_username}/>
                )}
                keyExtractor={this.props.id}/>
        );
    }
}
export default MessageList;

const styles = StyleSheet.create({
    container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
    }
});