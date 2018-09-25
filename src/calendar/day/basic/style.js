import {StyleSheet, Platform} from 'react-native';
import * as defaultStyle from '../../../style';

const STYLESHEET_ID = 'stylesheet.day.basic';

export default function styleConstructor(theme={}) {
  const appStyle = {...defaultStyle, ...theme};
  return StyleSheet.create({
    bg: {
      width: 48,
      height: 48,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'hsl(20, 51.2%, 83.9%)'
    },
    base: {
      width: 48,
      height: 48,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'hsl(20, 51.2%, 83.9%)'
    },
    text: {
      fontSize: appStyle.textDayFontSize,
      fontFamily: appStyle.textDayFontFamily,
      fontWeight: '600',
      color: appStyle.dayTextColor,
      backgroundColor: 'rgba(255, 255, 255, 0)'
    },
    alignedText: {
      marginTop: Platform.OS === 'android' ? 4 : 6
    },
    selected: {
      width: 40,
      height: 40,
      backgroundColor: appStyle.selectedDayBackgroundColor,
      borderRadius: 24
    },
    todayText: {
      color: appStyle.todayTextColor
    },
    todayBg: {
      backgroundColor: 'hsl(23, 40.5%, 71%)'
    },
    selectedText: {
      color: appStyle.selectedDayTextColor
    },
    disabledText: {
      color: appStyle.textDisabledColor,
      fontWeight: '300'
    },
    dot: {
      width: 4,
      height: 4,
      marginTop: 1,
      borderRadius: 2,
      opacity: 0
    },
    visibleDot: {
      opacity: 1,
      backgroundColor: appStyle.dotColor
    },
    selectedDot: {
      backgroundColor: appStyle.selectedDotColor
    },
    ...(theme[STYLESHEET_ID] || {})
  });
}
