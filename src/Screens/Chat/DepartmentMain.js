import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import axios from "axios";
import {
  Button,
  Container,
  Content,
  Header,
  Body,
  Left,
  Right,
  Title
} from "native-base";
import Icon from "react-native-vector-icons/Ionicons";
import { List, ListItem, SearchBar, CheckBox } from "react-native-elements";

class DepartmentMain extends Component {
  static navigationOptions = {
    header: null
  };
  state = {
    schools: [],
    employee_id: 17669
  };
  componentWillMount = async () => {
    try {
      let { data } = await axios
        .post("https://tgesconnect.org/api/General_communication", {
          employee_id: this.state.employee_id
        })
        .then(response => {
          console.log(response.data.data.school_data)
          if (response.data.status === "success") {
            // console.log("Success")
            this.setState({
              schools: response.data.data.school_data
            });
            //console.log(this.state.schools)
          } else {
            alert("Something went wrong");
          }
        });
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: "#8E44AD" }}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("ChatScreen")}
            >
              <Icon name="ios-arrow-dropleft" size={24} color="white" />
            </Button>
          </Left>
          <Body>
            <Title style={{ color: "white" }}>Schools</Title>
          </Body>
          <Right />
        </Header>
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
          <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
            <FlatList
              data={this.state.schools}
              renderItem={({ item }) => (
                <ListItem
                  title={item.school_name}
                  onPress={() => {
                    let destination =
                      item.school_name === "All School"
                        ? "DepartmentIndividualSchool"
                        : "DepartmentSchools";
                    this.props.navigation.navigate(destination, {
                      school_name: item.school_name,
                      school_id: item.school_id,
                      employee_id: this.state.employee_id
                    });
                  }}
                />
              )}
              keyExtractor={item => item.school_name}
              ItemSeparatorComponent={this.renderSeparator}
            />
          </List>
        </View>
      </Container>
    );
  }
}
export default DepartmentMain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
