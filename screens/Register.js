import {
  Text,
  TextInput,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  View,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const Register = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Name, setName] = useState("");
  const HandleRegister = () => {
    const User = {
      Name: Name,
      Email: Email,
      Password: Password,
    };

    //Send a Post Request TO Backend Server
    axios
      .post("http://192.168.29.184:8000/register", User)
      .then((response) => {
        console.log(response);

        Alert.alert(
          "Registration Succesful👍",
          "You Have Been Registered Successfully"
        );
        setEmail("");
        setName("");
        setPassword("");
      })
      .catch((error) => {
        Alert.alert("Registration Failed");
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.error("Request data:", error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error message:", error.message);
        }
        console.log("Registration Failed", error);
      });
  };

  const navigation = useNavigation();

  return (
    <View
      style={{ backgroundColor: "White", padding: 10, alignItems: "center" }}
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
            Register
          </Text>
          <Text style={{ fontSize: 16, marginTop: 15, fontWeight: "600" }}>
            Register To Your Account
          </Text>
        </View>

        <View style={{ marginTop: 50, marginLeft: "auto" }}>
          <View>
            <Text style={{ fontSize: 18, fontWeight: "500", color: "gray" }}>
              Name :
            </Text>
            <TextInput
              value={Name}
              onChangeText={(text) => setName(text)}
              style={{
                borderBottomColor: "gray",
                borderBottomWidth: 3,
                marginVertical: 10,
                width: 300,
              }}
              placeholder="Enter Your Name"
            />
          </View>
          <View style={{ marginTop: 25 }}>
            <Text style={{ fontSize: 18, fontWeight: "500", color: "gray" }}>
              Email :
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

          <View style={{ marginTop: 25 }}>
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
            onPress={HandleRegister}
            style={{
              width: 200,
              backgroundColor: "red",
              padding: 15,
              marginTop: 25,
              marginLeft: "auto",
              marginRight: "auto",
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
              Register
            </Text>
          </Pressable>

          <Pressable
            onPress={() => {
              navigation.goBack();
            }}
            style={{
              marginTop: 15,
            }}
          >
            <Text
              style={{
                textDecorationLine: "underline",
                textAlign: "center",
                color: "gray",
                fontSize: 16,
              }}
            >
              Have An Account? Sign In
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({});
