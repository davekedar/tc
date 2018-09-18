import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    FlatList
    } from "react-native";
import axios from "axios";
import { Button, Container, Content, Header, Body, Left, Right, Title } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { List, ListItem, SearchBar, CheckBox } from "react-native-elements";


class DepartmentSection extends Component{
    static navigationOptions = {
        header : null
    }
    state = {
        school_id: null,
        class_name: null,
        class_id: null,
        section_id: null,
        student: []
    }

    componentWillMount = async() => {
        const {class_id, class_name, school_id, section_id} = this.props.navigation.state.params;
            await this.setState({
                school_id: school_id,
                class_id: class_id,
                class_name: class_name,
                section_id: section_id
            })
            //console.log(this.state.school_id)
    }

    componentDidMount = async () => {
        try {
          let { data } = await axios
            .post("https://tgesconnect.org/api/General_communication_get_student", {
                employee_id: 17669,
                school_id: this.state.school_id,
                class_master_id: this.state.class_id,
                section_id: this.state.section_id
              })
            .then(response => {
              //console.log(response.data.data.school_data)
              if (response.data.status === "success") {
                // console.log("Success")
                this.setState({
                  student: response.data.data.student_data
                });
                console.log(this.state.student)
              } else {
                alert("Something went wrong");
              }
            });
        } catch (err) {
          console.log(err);
        }
      };
    render(){
        return (
            <Container>
                    <Header style={{ backgroundColor: "#8E44AD" }}>
                        <Left>
                            <Button transparent onPress={()=> this.props.navigation.navigate('DepartmentClass')}>
                                <Icon name="ios-arrow-dropleft" size={24} color='white' />
                            </Button>
                        </Left>
                        <Body>
                            <Title style={{ color: "white" }}>Select Student</Title>
                        </Body>
                        <Right/>
                    </Header>
                    <View style={{flex: 1, backgroundColor: '#fff'}}>
                    <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
                    <FlatList
                        data={this.state.student}
                        renderItem={({ item }) => (
                        <ListItem
                            title={item.name}
                            onPress={()=>this.props.navigation.navigate('DepartmentIndividual', {
                                class_id: item.class_master_id,
                                school_id: this.state.school_id
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
export default DepartmentSection;

const styles = StyleSheet.create({
    container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
    }
});