import { Platform, StyleSheet, Dimensions } from "react-native";
// Screen Styles
import Metrics from "../Styles/themes/Metrics";
import Fonts from "../Styles/themes/Fonts";
import Colors from "../Styles/themes/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  inputFieldStyles: {
    height: Metrics.HEIGHT * 0.3,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  containEmail: {
    backgroundColor: "#fff",
    height: Metrics.HEIGHT * 0.08,
    width: Metrics.WIDTH * 0.92,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    elevation: 3
  },
  inputEmail: {
    height: Metrics.HEIGHT * 0.08,
    width: Metrics.WIDTH * 0.84,
    color: "#000"
  },
  divider: {
    width: Metrics.WIDTH * 0.92,
    height: 0.6,
    backgroundColor: "rgba(0,0,0,0.1)",
    left: 15,
    right: 15
  },
  containPassword: {
    backgroundColor: "#fff",
    height: Metrics.HEIGHT * 0.08,
    width: Metrics.WIDTH * 0.92,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    elevation: 3
  },
  signbtnSec: {
    marginTop: Fonts.moderateScale(20),
    height: Metrics.HEIGHT * 0.12
  },
  signbtnSec1: {
    marginTop: Fonts.moderateScale(1),
    height: Metrics.HEIGHT * 0.12
  },
  signInBtn: {
    backgroundColor: "#4cd964",
    height: Metrics.HEIGHT * 0.08,
    width: Metrics.WIDTH * 0.92,
    borderRadius: 5,
    alignSelf: "center",
    elevation: 3
  },
  signInBtnText: {
    color: "#fff",
    fontSize: Fonts.moderateScale(17),
    width: Metrics.WIDTH * 0.92,
    textAlign: "center"
    // fontFamily: Fonts.type.sfuiDisplaySemibold,
  },
  forgotPassword: {
    color: Colors.snow,
    fontSize: Fonts.moderateScale(15),
    height: Metrics.HEIGHT * 0.05,
    width: Metrics.WIDTH,
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: Colors.transparent
    // fontFamily: Fonts.type.sfuiDisplayRegular,
  },
  image: {
    marginTop: 25, 
    height: 60, 
    width: 200,
    alignSelf: 'center',
  }
});
export default styles;
