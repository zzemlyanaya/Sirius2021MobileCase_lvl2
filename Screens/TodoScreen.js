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
const viewPadding = 24;

export default class TodoScreen extends Component {
  state = {
    tasks: [],
    text: ""
  };

  changeTextHandler = text => {
    this.setState({ text: text });
  };

  addTask = () => {
    let notEmpty = this.state.text.trim().length > 0;

    if (notEmpty) {
      this.setState(
        prevState => {
          let { tasks, text } = prevState;
          return {
            tasks: tasks.concat({ key: tasks.length, text: text }),
            text: ""
          };
        },
        () => Tasks.save(this.state.tasks)
      );
    }
  };

  deleteTask = i => {
    this.setState(
      prevState => {
        let tasks = prevState.tasks.slice();

        tasks.splice(i, 1);

        return { tasks: tasks };
      },
      () => Tasks.save(this.state.tasks)
    );
  };

  componentDidMount() {
    Keyboard.addListener(
      isAndroid ? "keyboardDidShow" : "keyboardWillShow",
      e => this.setState({ viewPadding: e.endCoordinates.height + viewPadding })
    );

    Keyboard.addListener(
      isAndroid ? "keyboardDidHide" : "keyboardWillHide",
      () => this.setState({ viewPadding: viewPadding })
    );

    Tasks.all(tasks => this.setState({ tasks: tasks || [] }));
  }

  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state,callback)=>{
        return;
    };
}

  render() {
    return (
      <View
        style={[styles.container, { paddingBottom: this.state.viewPadding }]}
      >
        <View style={styles.grid}>
          <Text style={styles.header}> Tasks </Text>
          <TouchableOpacity style={styles.rightButton}>
            <Text style={{fontSize: 21, fontFamily: "Roboto-Bold", color: "#000000", alignSelf: 'center'}}>
              {this.state.tasks.length.toString()}
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          style={styles.list}
          data={this.state.tasks}
          renderItem={({ item, index }) =>
            <View>
              <View style={styles.listItemCont}>
                <Text style={styles.listItem}>
                  {item.text}
                </Text>
                <DeleteButton onPress={() => this.deleteTask(index)} />
              </View>
            </View>}
        />
        <TextInput
          style={styles.textInput}
          onChangeText={this.changeTextHandler}
          onSubmitEditing={this.addTask}
          value={this.state.text}
          placeholder="Type your task here"
          returnKeyType="done"
          returnKeyLabel="done"
        />
      </View>
    );
  }
}

const DeleteButton = ({onPress}) =>{
  return (
    <View>
      <TouchableOpacity onPress = { onPress } style= { { backgroundColor: '#FCFCFC'} }>
      <Text style = { {color: "#FFC19D", fontFamily: "Roboto-Black" }} > { "DONE" } </Text>
      </TouchableOpacity>
    </View>
  );
};

let Tasks = {
  convertToArrayOfObject(tasks, callback) {
    return callback(
      tasks ? tasks.split("||").map((task, i) => ({ key: i.toString(), text: task })) : []
    );
  },
  convertToStringWithSeparators(tasks) {
    return tasks.map(task => task.text).join("||");
  },
  all(callback) {
    return AsyncStorage.getItem("TASKS", (err, tasks) =>
      this.convertToArrayOfObject(tasks, callback)
    );
  },
  save(tasks) {
    AsyncStorage.setItem("TASKS", this.convertToStringWithSeparators(tasks));
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FCFCFC",
    padding: viewPadding,
    paddingTop: 24
  },
  header:{
    flex: 0.8,
    fontWeight: "700",
    fontFamily: "Roboto-Bold",
    fontSize: 48,
    color:"#323232"
  },
  list: {
    width: "100%"
  },
  listItem: {
    paddingTop: 4,
    paddingBottom: 8,
    fontSize: 21
  },
  listItemCont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  textInput: {
    height: 54,
    paddingRight: 12,
    paddingLeft: 12,
    borderColor: "#FFE3D3",
    borderWidth: 2,
    borderRadius: 10,
    width: "100%",
    fontFamily: "Roboto",
    color: "#000000",
    fontSize: 18
  },
  rightButton: {
    flex: 0.2,
    alignSelf: 'flex-end',
    marginTop: -4,
    justifyContent: 'center',
    backgroundColor: "#FFE3D3",
    height: 48,
    width: 71,
    marginEnd: -24,
    borderBottomLeftRadius: 13,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 0
  },
  grid: {
       width: "100%",
       flexDirection: 'row',
       marginBottom: 24
   },
});
