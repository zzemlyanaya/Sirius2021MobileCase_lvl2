/***
* @author Evgeniya Zemlyanaya @zzemlyanaya
*/
'use strict';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

export default function LoginScreen ({ navigation }) {
const [email, setEmail] = useState(true);
const [password, setPassword] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>1more TODO list</Text>
      <View style={styles.inputView} >
        <TextInput
          style={styles.inputText}
          placeholder="Enter email..."
          placeholderTextColor="#999999"
          onChangeText={text => setEmail(text)}/>
      </View>
      <View style={styles.inputView} >
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Enter password..."
          placeholderTextColor="#999999"
          onChangeText={text => setPassword(text)}/>
      </View>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => {
          (email.length > 0 && password.length > 0) ?
          ( navigation.navigate('Todo') ) : alert("Fill in all the graphs!");
        }}>
        <Text style={styles.loginText}>
          Login
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFCFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    width:"80%",
    fontWeight: "700",
    fontFamily: "Roboto-Bold",
    fontSize: 48,
    color:"#323232",
    marginBottom: 48,
    marginStart: 24,
    marginEnd: 24
  },
  inputView:{
    width:"80%",
    backgroundColor:"#FCFCFC",
    borderRadius:10,
    borderWidth:1,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"#323232",
    fontWeight: "700",
    fontFamily: "Roboto-Bold",
    fontSize: 13
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#FFE3D3",
    borderRadius:10,
    height:54,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:34,
    shadowColor: '#323232',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 15,
    elevation: 15
  },
  loginText:{
    color:"#323232",
    fontWeight: "900",
    fontFamily: "Roboto-Black"
  }
});
