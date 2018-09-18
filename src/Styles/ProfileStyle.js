import { Platform, StyleSheet, Dimensions } from 'react-native';
import Metrics from '../Styles/themes/Metrics';
import Fonts from '../Styles/themes/Fonts';
import Colors from '../Styles/themes/Colors';

const styles = StyleSheet.create({

  main: {
    height: Metrics.HEIGHT,
    width: Metrics.WIDTH,
    backgroundColor: "white",
    flexDirection: 'column'
  },
  tabheader:{
    backgroundColor: "#0691ce",
    width: (Metrics.WIDTH) * 0.15,
    marginLeft: 15
  },
  mainimg:{
    width: Metrics.WIDTH,
    height: (Metrics.HEIGHT) * 0.30
  },
  title:{
    color: "#fff",
    fontSize: Fonts.moderateScale(18),
    // fontFamily: Fonts.type.SFUIDisplaySemibold,
    textAlign: 'center'
  },
  left: {
    flex:1
  },
  body:{
    flex:2,
    alignItems:'center'
  },
  userimg:{
    position:'absolute',
    top: (Metrics.HEIGHT) * 0.30,
    width: (Metrics.WIDTH) * 0.34,
    height: (Metrics.WIDTH) * 0.34,
    borderRadius: (Metrics.WIDTH)* 0.17,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    alignSelf: 'center',
    zIndex: 30,
  },
  userinfo:{
    flexDirection: 'row',
    justifyContent:'space-between',
    marginLeft: 15,
    marginRight: 15
  },
  header: {
    backgroundColor: 'transparent',
    height: 65,
    width: Metrics.WIDTH,
    flexDirection: 'row',
    borderBottomColor: 'transparent',
    ...Platform.select({
        ios: {
          paddingTop: 12,
        },
        android: {
          paddingTop: 15
        }
    }),
  },

  ShowProfileTxt: {
    color: "#fff",
    backgroundColor: "#2d324f",
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: Fonts.moderateScale(18),
    // fontFamily: Fonts.type.SFUIDisplaySemibold,
    alignSelf: 'center',
    marginTop: (Metrics.HEIGHT) * 0.40
  },

  modal: {
      width: (Metrics.WIDTH) * 0.80,
      height: (Metrics.HEIGHT) * 0.66,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: (Metrics.HEIGHT)  * 0.15,
      flexDirection: 'column'
   },
   backArrow: {
         justifyContent: 'center',
         alignItems: 'center'
   },
   followerFollowingBg: {
     width: (Metrics.WIDTH) * 0.33,
     marginTop: 10,
     backgroundColor: 'transparent',
     flexDirection: 'column'
   },

   followerFollowingCountTxt: {
     color: "#363636",
     fontSize: Fonts.moderateScale(15),
    //  fontFamily: Fonts.type.SFUIDisplayMedium,
     textAlign: 'center',
   },

   followerFollowingTxt: {
     color: "#959595",
     fontSize: Fonts.moderateScale(12),
    //  fontFamily: Fonts.type.SFUIDisplayRegular,
     textAlign: 'center',
     marginTop: -5
   },

   nameTxts: {
     color: "#6f6f6f",
     fontSize: Fonts.moderateScale(18),
    //  fontFamily: Fonts.type.SFUIDisplayMedium,
     alignSelf: 'center',
     ...Platform.select({
           ios: {
               marginTop: 20,
           },
           android: {
        marginTop: 15
      }
       }),
   },

   designationTxt: {
     color: "#b7b7b7",
     fontSize: Fonts.moderateScale(12),
    //  fontFamily: Fonts.type.SFUIDisplayRegular,
     alignSelf: 'center',
   },

   followTxtBg: {
     backgroundColor: "#0691ce",
     borderRadius: 20,
     width: (Metrics.WIDTH) * 0.45,
     alignSelf: 'center',
     marginTop: 17
   },

   followTxt: {
     color: "#fff",
     fontSize: Fonts.moderateScale(18),
    //  fontFamily: Fonts.type.SFUIDisplayMedium,
     alignSelf: 'center',
     paddingTop: 5,
     paddingBottom: 5,
   },

   dividerHorizontal: {
     backgroundColor: "#e6e6e6",
     height: 0.8,
     width: Metrics.WIDTH,
     marginTop: 20
   },

   label: {
     fontSize: Fonts.moderateScale(16),
    //  fontFamily: Fonts.type.SFUIDisplayRegular,
     color: "#595959"
   },

   container: {
       flex: 1,
     },
});

export default styles;