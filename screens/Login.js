import {
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const navigation = useNavigation();

  const HandleLogin = () => {
    const User = {
      Email: Email,
      Password: Password,
    };
    console.log(User);

    axios
      .post("http://192.168.29.184:8000/login", User)
      .then((response) => {
        console.log(response);
        const token = response.data.Token;
        AsyncStorage.setItem("authToken", token);
        navigation.replace("Home");
      })
      .catch((err) => {
        Alert.alert("Login Error", "There was an error during login.");

        console.log("Login Error", err);
      });
  };

  return (
    <View
      styles={{ backgroundColor: "White", padding: 10, alignItems: "center" }}
    >
      <KeyboardAvoidingView>
        <View
          style={{
            marginTop: 100,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: "red",
              alignItems: "center",
              fontSize: 20,
              fontWeight: "600",
            }}
          >
            Sign In
          </Text>
          <Text style={{ fontSize: 16, marginTop: 15, fontWeight: "600" }}>
            Sign In To Your Account
          </Text>
        </View>

        <View style={{ marginLeft: 27, marginTop: 50 }}>
          <View>
            <Text style={{ fontSize: 18, fontWeight: "500", color: "gray" }}>
              Email :{" "}
            </Text>
            <TextInput
              value={Email}
              onChangeText={(text) => setEmail(text)}
              style={{
                borderBottomColor: "gray",
                borderBottomWidth: 3,
                marginVertical: 10,
                width: 300,
              }}
              placeholder="Enter Your Email Id"
            />
          </View>

          {/* //Password */}

          <View style={{ marginTop: 30 }}>
            <Text style={{ fontSize: 18, fontWeight: "500", color: "gray" }}>
              Password:{" "}
            </Text>
            <TextInput
              value={Password}
              onChangeText={(text) => setPassword(text)}
              style={{
                borderBottomColor: "gray",
                borderBottomWidth: 3,
                marginVertical: 10,
                width: 300,
              }}
              placeholder="Enter Your Password"
              secureTextEntry={true}
            />
          </View>

          <Pressable
            onPress={HandleLogin}
            style={{
              width: 200,
              backgroundColor: "red",
              padding: 15,
              marginTop: 25,
              marginLeft: 48,
              borderRadius: 6,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Login
            </Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate("Register")}
            style={{
              marginTop: 15,
            }}
          >
            <Text
              style={{
                textDecorationLine: "underline",
                marginLeft: 41,
                color: "gray",
                fontSize: 15,
              }}
            >
              Don't Have An Account? Sign Up
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
