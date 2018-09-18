import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import WelcomeScreen from './src/Screens/welcomeScreen';
import AuthScreen from './src/Screens/loginScreen';
import HomeScreenTabs from './src/Screens/HomeScreenTabs';
import ChatScreen from './src/Screens/ChatScreen';
import AdminSingle from './src/Screens/Chat/AdminSingle';
import AdminChat from './src/Screens/Chat/AdminChat';
import StudentSubject from './src/Screens/Chat/StudentSubject';
import StudentSubjectSingle from './src/Screens/Chat/StudentSubjectSingle';
import TeacherSubject from './src/Screens/Chat/TeacherSuject';
import TeacherSubjectSingle from './src/Screens/Chat/TeacherSubjectSingle';
import Head from './src/Screens/Chat/Head';
import HeadSingle from './src/Screens/Chat/HeadSingle';
import ClassTeacher from './src/Screens/Chat/ClassTeacher';
import ClassTeacherSingle from './src/Screens/Chat/ClassTeacherSingle';
import IndividualChat from './src/Screens/Chat/IndividualChat';
import ActiveChatEmployee from './src/Screens/Chat/ActiveChatEmployee';
import ActiveChatStudent from './src/Screens/Chat/ActiveChatStudent';
import ActiveIndividual from './src/Screens/Chat/ActiveIndividual';
import ActiveIndividualStudent from './src/Screens/Chat/ActiveIndividualStudent';
import GroupChat from './src/Screens/Chat/GroupChat';
import TeacherSubjectName from './src/Screens/Chat/TeacherSujectName';
import DepartmentMain from './src/Screens/Chat/DepartmentMain';
import DepartmentSchools from './src/Screens/Chat/DepartmenSchools';
import DepartmentClass from './src/Screens/Chat/DepartmenClass';
import DepartmentSection from './src/Screens/Chat/DepartmenSection';
import DepartmentIndividualSchool from './src/Screens/Chat/DepartmentIndividualSchool';
import DepartmentIndividualClass from './src/Screens/Chat/DepartmentIndividualClass';
import DepartmentIndividualSection from './src/Screens/Chat/DepartmentIndividualSection';

export default class App extends React.Component {
  render() {
    return (
      <AppStackNavigator />
    );
  }
}

const AppStackNavigator = createStackNavigator({
  // WelcomeScreen: {
  //   screen : WelcomeScreen
  // },
  AuthScreen: {
    screen : AuthScreen
  },
  HomeScreenTabs: {
    screen : HomeScreenTabs,
    navigationOptions: {
      header: null
    }
  },
  AdminChat: {
    screen : AdminChat,
  },
  AdminSingle: {
    screen : AdminSingle,
  },
  StudentSubject: {
    screen : StudentSubject,
  },
  StudentSubjectSingle: {
    screen : StudentSubjectSingle,
  },
  TeacherSubject: {
    screen : TeacherSubject,
  },
  TeacherSubjectSingle: {
    screen : TeacherSubjectSingle,
  },
  Head: {
    screen : Head,
  },
  HeadSingle: {
    screen : HeadSingle,
  },
  ClassTeacher: {
    screen : ClassTeacher,
  },
  ClassTeacherSingle: {
    screen : ClassTeacherSingle,
  },
  IndividualChat: {
    screen : IndividualChat,
  },
  ActiveChatEmployee: {
    screen : ActiveChatEmployee,
  },
  ActiveChatStudent: {
    screen : ActiveChatStudent,
  },
  ActiveIndividual: {
    screen : ActiveIndividual,
  },
  ActiveIndividualStudent: {
    screen : ActiveIndividualStudent,
  },
  GroupChat: {
    screen : GroupChat,
  },
  TeacherSubjectName: {
    screen : TeacherSubjectName,
  },
  DepartmentMain: {
    screen : DepartmentMain,
  },
  DepartmentSchools: {
    screen : DepartmentSchools,
  },
  DepartmentClass: {
    screen : DepartmentClass,
  },
  DepartmentSection: {
    screen : DepartmentSection,
  },
  DepartmentIndividualSchool: {
    screen : DepartmentIndividualSchool,
  },
  DepartmentIndividualClass: {
    screen : DepartmentIndividualClass,
  },
  DepartmentIndividualSection: {
    screen : DepartmentIndividualSection,
  },
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
