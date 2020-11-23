/***
* @author Evgeniya Zemlyanaya @zzemlyanaya
*/
'use strict';
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  TextInput,
  Keyboard,
  Platform,
  TouchableOpacity
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const isAndroid = Platform.OS == "android";
const viewPadding = 32;

export default class ArchiveScreen extends Component {
}
