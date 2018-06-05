import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import XDate from 'xdate';
import PropTypes from 'prop-types';
import styleConstructor from './style';
import { weekDayNames } from '../../dateutils';

class CalendarHeader extends Component {
  static propTypes = {
    theme: PropTypes.object,
    hideArrows: PropTypes.bool,
    month: PropTypes.instanceOf(XDate),
    addMonth: PropTypes.func,
    showIndicator: PropTypes.bool,
    firstDay: PropTypes.number,
    renderArrow: PropTypes.func,
    hideDayNames: PropTypes.bool,
    weekNumbers: PropTypes.bool,
    toggleShowYear: PropTypes.func,
    renderArrow: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      showYear: this.props.showYear
    };
    this.style = styleConstructor(props.theme);
    this.addMonth = this.addMonth.bind(this);
    this.substractMonth = this.substractMonth.bind(this);
  }

  addMonth() {
    this.props.addMonth(1);
  }

  substractMonth() {
    this.props.addMonth(-1);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.showIndicator !== this.props.showIndicator) {
      return false;
    }
    if (nextProps.hideDayNames !== this.props.hideDayNames) {
      return false;
    }
    return true;
  }

  render() {
    let leftArrow = <View />;
    let rightArrow = <View />;
    let weekDaysNames = weekDayNames(this.props.firstDay);
    if (!this.props.hideArrows) {
      leftArrow = (
        <TouchableOpacity
          onPress={this.substractMonth}
          style={this.style.arrow}
        >
          {this.props.renderArrow
            ? this.props.renderArrow('left')
            : <Image
                source={require('../img/previous.png')}
                style={this.style.arrowImage}
              />}
        </TouchableOpacity>
      );
      rightArrow = (
        <TouchableOpacity onPress={this.addMonth} style={this.style.arrow}>
          {this.props.renderArrow
            ? this.props.renderArrow('right')
            : <Image
                source={require('../img/next.png')}
                style={this.style.arrowImage}
              />}
        </TouchableOpacity>
      );
    }
    let indicator;
    if (this.props.showIndicator) {
      indicator = <ActivityIndicator />;
    }

    if (this.props.showYear) {
      return (
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              paddingLeft: 10,
              paddingRight: 10,
              alignItems: "center"
            }}
          >
            <View
              style={{
                flexDirection: "row"
              }}
            >
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  justifyContent: "center"
                }}
                onPress={() => {
                  this.props.toggleShowYear();
                }}
              >
                <Text style={this.style.monthText}>
                  {this.props.month.toString(
                    this.props.monthFormat
                      ? this.props.monthFormat
                      : "MMMM yyyy"
                  )}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }

    return (
      <View>
        <View style={this.style.header}>
          {leftArrow}
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => {
                this.props.toggleShowYear();
              }}
            >
              <Text style={this.style.monthText}>
                {this.props.month.toString(
                  this.props.monthFormat ? this.props.monthFormat : "MMMM yyyy"
                )}
              </Text>
            </TouchableOpacity>
            {indicator}
          </View>
          {rightArrow}
        </View>
        {
          !this.props.hideDayNames &&
          <View style={this.style.week}>
            {this.props.weekNumbers && <Text allowFontScaling={false} style={this.style.dayHeader}></Text>}
            {weekDaysNames.map((day, idx) =>
              <Text key={idx} style={this.style.dayHeader}>
                {day}
              </Text>
            )}
          </View>
        }
      </View>
    );
  }
}

export default CalendarHeader;
