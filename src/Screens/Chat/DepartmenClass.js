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

class DepartmentClass extends Component{
    static navigationOptions = {
        header : null
    }
    state = {
        school_id: null,
        class_name: null,
        class_id: null,
        section: []
    }

    componentWillMount = async() => {
        const {class_id, class_name, school_id, employee_id} = this.props.navigation.state.params;
            await this.setState({
                school_id,
                class_id,
                class_name,
                employee_id
            })
            //console.log(this.state.school_id)
    }

    componentDidMount = async () => {
        try {
          let { data } = await axios
            .post("https://tgesconnect.org/api/General_communication", {
                employee_id: 17669,
                school_id: this.state.school_id,
                class_master_id: this.state.class_id
              })
            .then(response => {
              //console.log(response.data.data.school_data)
              if (response.data.status === "success") {
                // console.log("Success")
                this.setState({
                  section: response.data.data.section_data
                });
                console.log(this.state.class)
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
                            <Button transparent onPress={()=> this.props.navigation.navigate('DepartmentSchools')}>
                                <Icon name="ios-arrow-dropleft" size={24} color='white' />
                            </Button>
                        </Left>
                        <Body>
                            <Title style={{ color: "white" }}>{this.state.class_name}</Title>
                        </Body>
                        <Right/>
                    </Header>
                    <View style={{flex: 1, backgroundColor: '#fff'}}>
                    <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
                    <FlatList
                            data={this.state.section}
                            renderItem={({ item }) => (
                                <ListItem
                                title={item.section_name}
                                onPress={() => {
                                    let destination =
                                    item.section_name === "All Section"
                                        ? "DepartmentIndividualSection"
                                        : "DepartmentSection";
                                    this.props.navigation.navigate(destination, {
                                        class_id: this.state.class_id,
                                        school_id: this.state.school_id,
                                        section_id: item.class_section_id,
                                        employee_id: this.state.employee_id
                                    });
                                }}
                                />
                            )}
                            keyExtractor={item => item.section_name}
                            ItemSeparatorComponent={this.renderSeparator}
                            />
                    </List>
                    </View>
                </Container>
        );
    }
}
export default DepartmentClass;

const styles = StyleSheet.create({
    container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
    }
});