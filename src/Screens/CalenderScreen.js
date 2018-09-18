import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";
import axios from "axios";
//import Icon from 'react-native-vector-icons/FontAwesome';
import { Container, Header, Title, Left, Right, Body, Icon } from "native-base";

export default class App extends React.Component {
  state = {
    userid: "2513",
    start_date: "",
    end_date: "",
    school_id: "29",
    present_array: [],
    absent_array: [],
    holiday_array: [],
    event_array: [],
    present: {},
    day: "",
    dayName: "",
    month: "",
    holiday: null,
    sunday: null,
    start_year: "",
    wd: null,
    student_name: ""
  };

  componentWillMount = async () => {
    await this.getDate();
    console.log(this.state.start_date);
    console.log(this.state.end_date);
    try {
      let { data } = await axios
        .post("https://tgesconnect.org/api/Get_one_student_attendance", {
          userid: this.state.userid,
          start_date: this.state.start_date,
          end_date: this.state.end_date,
          school_id: this.state.school_id
        })
        .then(response => {
          //console.log(response.data);
          if (response.data.status === "success") {
            this.setState({
              present_array: response.data.data.present_array,
              absent_array: response.data.data.absent_array,
              holiday_array: response.data.data.holiday_array,
              sunday: response.data.data.total_sundays,
              start_year: response.data.data.school_class_start_date,
              wd: response.data.data.working_days,
              event_array: response.data.data.activity_array,
              student_name: response.data.data.student_name
            });
          } else {
            alert("Something went wrong");
          }
        });
    } catch (err) {
      console.log(err);
    }

    console.log(this.state.holiday_array.length);
    console.log(this.state.present_array.length);
    console.log(this.state.absent_array.length);

    //highlight condition
    if (this.state.present_array.length !== 0) {
      if (this.state.absent_array.length !== 0) {
        if (this.state.holiday_array.length !== 0) {
          console.log("All available");
          var objP = Object.assign(
            ...this.state.present_array.map(o => ({
              [o]: { selected: true, selectedColor: "green", type: "present" }
            }))
          );
          var objA = Object.assign(
            ...this.state.absent_array.map(o => ({
              [o]: { selected: true, selectedColor: "red", type: "absent" }
            }))
          );
          var objH = Object.assign(
            ...this.state.holiday_array.map(o => ({
              [o["holiday_date"]]: {
                selected: true,
                selectedColor: "#D4AF37",
                type: "Holiday"
              }
            }))
          );
          var merged = { ...objP, ...objA, ...objH };
          // console.log("Came Here");
          this.setState({ present: merged });
        } else {
          console.log("Presend and Absent are availble");
          var objP = Object.assign(
            ...this.state.present_array.map(o => ({
              [o]: { selected: true, selectedColor: "green", type: "present" }
            }))
          );
          var objA = Object.assign(
            ...this.state.absent_array.map(o => ({
              [o]: { selected: true, selectedColor: "red", type: "absent" }
            }))
          );
          var merged = { ...objP, ...objA };
          this.setState({ present: merged });
        }
      } else if (this.state.holiday_array.length !== 0) {
        console.log("Present and Holiday are available");
        var objP = Object.assign(
          ...this.state.present_array.map(o => ({
            [o]: { selected: true, selectedColor: "green", type: "present" }
          }))
        );
        var objH = Object.assign(
          ...this.state.holiday_array.map(o => ({
            [o["holiday_date"]]: {
              selected: true,
              selectedColor: "#D4AF37",
              type: "Holiday"
            }
          }))
        );
        var merged = { ...objP, ...objH };
        this.setState({ present: merged });
      } else {
        console.log("Only Present Available");
        var objP = Object.assign(
          ...this.state.present_array.map(o => ({
            [o]: { selected: true, selectedColor: "green", type: "present" }
          }))
        );
        this.setState({ present: objP });
      }
    } else {
      if (this.state.holiday_array.length !== 0) {
        console.log("Only Holiday is available");
        var objH = Object.assign(
          ...this.state.holiday_array.map(o => ({
            [o["holiday_date"]]: {
              selected: true,
              selectedColor: "#D4AF37",
              type: "Holiday"
            }
          }))
        );
        this.setState({ present: objH });
      }
    }
    // if (this.state.event_array.length !== 0) {
    //   var objE = Object.assign(...this.state.event_array.map(o => ({[o['activity_date']]: {marked: true, dotColor: 'orange', type: 'Event'}})));
    //   this.setState({present: objE})
    // }
  };

  componentDidMount = () => {
    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    var days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let d = new Date();
    let dd = d.getDate();
    let dn = days[d.getDay()];
    var month = months[d.getMonth()];
    this.setState({ day: dd, dayName: dn, month: month });
  };

  dateSelected = async (date, string) => {
    try {
      let { data } = await axios
        .post("https://tgesconnect.org/api/get_holiday", {
          userid: this.state.userid,
          date: string
        })
        .then(response => {
          //console.log(response.data.data.present_array);
          if (response.data.status === "success") {
            this.setState({
              holiday: response.data.data.name
            });
          } else {
            this.setState({
              holiday: null
            });
          }
        });
    } catch (err) {
      console.log(err);
    }
    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    var days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    var d = new Date(date);
    var dayName = days[d.getDay()];
    var dayDate = d.getDate();
    var month = months[d.getMonth()];
    this.setState({ dayName: dayName, day: dayDate, month: month });
  };

  monthChangedHandler = async date => {
    var now = new Date(date);
    var prevMonthLastDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    var prevMonthFirstDate = new Date(
      now.getFullYear() - (now.getMonth() + 1 > 0 ? 0 : 1),
      (now.getMonth() + 1 - 1 + 12) % 12,
      1
    );

    var formatDateComponent = function(dateComponent) {
      return (dateComponent < 10 ? "0" : "") + dateComponent;
    };

    var formatDate = function(date) {
      return (
        formatDateComponent(date.getFullYear()) +
        "-" +
        formatDateComponent(date.getMonth() + 1) +
        "-" +
        date.getDate()
      );
      // return formatDateComponent(date.getMonth() + 1) + '/' + formatDateComponent(date.getDate()) + '/' + date.getFullYear();
    };

    await this.setState({
      start_date: formatDate(prevMonthFirstDate),
      end_date: formatDate(prevMonthLastDate)
    });

    try {
      let { data } = await axios
        .post("https://tgesconnect.org/api/Get_one_student_attendance", {
          userid: this.state.userid,
          start_date: this.state.start_date,
          end_date: this.state.end_date,
          school_id: this.state.school_id
        })
        .then(response => {
          //console.log(response.data);
          if (response.data.status === "success") {
            this.setState({
              present_array: response.data.data.present_array,
              absent_array: response.data.data.absent_array,
              holiday_array: response.data.data.holiday_array,
              sunday: response.data.data.total_sundays,
              wd: response.data.data.working_days
            });
          } else {
            alert("Something went wrong");
          }
        });
    } catch (err) {
      console.log(err);
    }

    console.log(this.state.holiday_array.length);
    console.log(this.state.present_array.length);
    console.log(this.state.absent_array.length);

    //highlight condition
    if (this.state.present_array.length !== 0) {
      if (this.state.absent_array.length !== 0) {
        if (this.state.holiday_array.length !== 0) {
          console.log("All available");
          var objP = Object.assign(
            ...this.state.present_array.map(o => ({
              [o]: { selected: true, selectedColor: "green", type: "present" }
            }))
          );
          var objA = Object.assign(
            ...this.state.absent_array.map(o => ({
              [o]: { selected: true, selectedColor: "red", type: "absent" }
            }))
          );
          var objH = Object.assign(
            ...this.state.holiday_array.map(o => ({
              [o["holiday_date"]]: {
                selected: true,
                selectedColor: "#D4AF37",
                type: "Holiday"
              }
            }))
          );
          var merged = { ...objP, ...objA, ...objH };
          // console.log("Came Here");
          this.setState({ present: merged });
        } else {
          console.log("Presend and Absent are availble");
          var objP = Object.assign(
            ...this.state.present_array.map(o => ({
              [o]: { selected: true, selectedColor: "green", type: "present" }
            }))
          );
          var objA = Object.assign(
            ...this.state.absent_array.map(o => ({
              [o]: { selected: true, selectedColor: "red", type: "absent" }
            }))
          );
          var merged = { ...objP, ...objA };
          this.setState({ present: merged });
        }
      } else if (this.state.holiday_array.length !== 0) {
        console.log("Present and Holiday are available");
        var objP = Object.assign(
          ...this.state.present_array.map(o => ({
            [o]: { selected: true, selectedColor: "green", type: "present" }
          }))
        );
        var objH = Object.assign(
          ...this.state.holiday_array.map(o => ({
            [o["holiday_date"]]: {
              selected: true,
              selectedColor: "#D4AF37",
              type: "Holiday"
            }
          }))
        );
        var merged = { ...objP, ...objH };
        this.setState({ present: merged });
      } else {
        console.log("Only Present Available");
        var objP = Object.assign(
          ...this.state.present_array.map(o => ({
            [o]: { selected: true, selectedColor: "green", type: "present" }
          }))
        );
        this.setState({ present: objP });
      }
    } else {
      if (this.state.holiday_array.length !== 0) {
        console.log("Only Holiday is available");
        var objH = Object.assign(
          ...this.state.holiday_array.map(o => ({
            [o["holiday_date"]]: {
              selected: true,
              selectedColor: "#D4AF37",
              type: "Holiday"
            }
          }))
        );
        this.setState({ present: objH });
      }
    }
  };

  getDate = () => {
    var now = new Date();
    var prevMonthLastDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    var prevMonthFirstDate = new Date(
      now.getFullYear() - (now.getMonth() + 1 > 0 ? 0 : 1),
      (now.getMonth() + 1 - 1 + 12) % 12,
      1
    );

    var formatDateComponent = function(dateComponent) {
      return (dateComponent < 10 ? "0" : "") + dateComponent;
    };

    var formatDate = function(date) {
      return (
        formatDateComponent(date.getFullYear()) +
        "-" +
        formatDateComponent(date.getMonth() + 1) +
        "-" +
        date.getDate()
      );
      // return formatDateComponent(date.getMonth() + 1) + '/' + formatDateComponent(date.getDate()) + '/' + date.getFullYear();
    };

    this.setState({
      start_date: formatDate(prevMonthFirstDate),
      end_date: formatDate(prevMonthLastDate)
    });
    // console.log(this.state.start_date)
  };

  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: "#8E44AD" }}>
          <Left />
          <Body>
            <Title style={{ color: "white" }}>Calender</Title>
          </Body>
          <Right />
        </Header>
        <View>
          <View>
            <Calendar
              //current={'2018-06-01'}
              minDate={this.state.start_year}
              markedDates={this.state.present}
              //markingType={'multi-dot'}
              onDayPress={day => {
                this.dateSelected(day.timestamp, day.dateString);
              }}
              // onPressArrowLeft={substractMonth => substractMonth()}
              // onPressArrowRight={addMonth => addMonth()}
              onMonthChange={month =>
                this.monthChangedHandler(month.dateString)
              }
              hideExtraDays={true}
            />
          </View>
          <View style={styles.notes}>
            <View style={styles.notes_notes}>
              <Text style={styles.notes_text}>
                {this.state.holiday !== null
                  ? this.state.holiday
                  : "Hello, Have a Nice Day"}
              </Text>
            </View>
            <View style={[styles.notes_selected_date]}>
              <Text style={styles.small_text}>
                {this.state.month} {this.state.day} {this.state.dayName}
              </Text>
              {/* <Text style={styles.big_text}>{this.state.day}</Text>
              <Text style={styles.small_text}>{this.state.dayName}</Text> */}
              {/* <View style={styles.inline}>
                  <Icon name="bicycle" size={20} color="#CCC" />
                  <Text style={styles.small_text}> THURSDAY</Text>
              </View> */}
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1, backgroundColor: "red" }}>
              <Text style={styles.bottomTitle}>Absent</Text>
              <Text style={styles.bottomText}>
                {this.state.absent_array.length}
              </Text>
            </View>
            <View style={{ flex: 1, backgroundColor: "green" }}>
              <Text style={styles.bottomTitle}>Present</Text>
              <Text style={styles.bottomText}>
                {this.state.present_array.length}
              </Text>
            </View>
            <View style={{ flex: 1, backgroundColor: "#D4AF37" }}>
              <Text style={styles.bottomTitle}>Holiday</Text>
              <Text style={styles.bottomText}>
                {this.state.holiday_array.length}
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1, backgroundColor: "salmon" }}>
              <Text style={styles.bottomTitle}>Sunday</Text>
              <Text style={styles.bottomText}>{this.state.sunday}</Text>
            </View>
            <View style={{ flex: 1, backgroundColor: "orange" }}>
              <Text style={styles.bottomTitle}>Event</Text>
              <Text style={styles.bottomText}>
                {this.state.event_array.length}
              </Text>
            </View>
            <View style={{ flex: 1, backgroundColor: "black" }}>
              <Text style={styles.bottomTitle}>T. W. D.</Text>
              <Text style={styles.bottomText}>{this.state.wd}</Text>
            </View>
          </View>
          <View style={{ padding: 10, backgroundColor: "#2196F3" }}>
            <Text style={[styles.notes_text, { color: "white" }]}>
              Out of {this.state.wd} working days, {this.state.student_name} was
              present for {this.state.present_array.length} days and absent for{" "}
              {this.state.absent_array.length} days.
            </Text>
          </View>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  bottomTitle: {
    alignSelf: "center",
    fontSize: 20,
    color: "white"
  },
  bottomText: {
    alignSelf: "center",
    fontSize: 28,
    color: "white"
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  notes: {
    marginTop: 2,
    padding: 5,
    borderColor: "#F5F5F5",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    flexDirection: "row",
    backgroundColor: "#EBC5FB"
  },
  notes_notes: {
    flex: 2,
    justifyContent: "center",
    alignItems: "flex-start"
  },
  notes_text: {
    fontSize: 18
  },
  notes_selected_date: {
    flex: 1,
    alignItems: "flex-end",
    flexDirection: "column",
    justifyContent: "center"
  },
  small_text: {
    fontSize: 15
  },
  big_text: {
    fontSize: 50,
    fontWeight: "bold"
  },
  inline: {
    flexDirection: "row"
  }
});
