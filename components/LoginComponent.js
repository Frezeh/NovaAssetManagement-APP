import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Modal,
  SafeAreaView,
} from "react-native";
import { Input, CheckBox } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import {
  receiveLogin,
  requestLogin,
  loginError,
} from "../redux/ActionCreators";
import { baseUrl } from "../shared/baseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPass, setShowPass] = useState(true);
  const [loadingVisible, setLoadingVisible] = useState(false);

  const dispatch = useDispatch();
  const creds = { username: username, password: password };

  const handleLogin = () => {  
    // dispatch(loginUser(creds));
    setLoadingVisible(!loadingVisible);

    dispatch(requestLogin(creds));

    return (
      fetch(baseUrl + "users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(creds),
      })
        .then(
          (response) => {
            if (response.ok) {
              return response;
            } else if (!response.ok) {
              setLoadingVisible(loadingVisible);
              alert("ERROR:" + " " + "Failed to load response!");
            } else {
              setLoadingVisible(loadingVisible);
              var error = new Error(
                "Error " + response.status + ": " + response.statusText
              );
              error.response = response;
              throw error;
            }
          },
          (error) => {
            throw error;
          }
        )
        .then((response) => response.json())
        .then((response) => {
          if (response.success) {
            AsyncStorage.setItem("token", response.token);
            AsyncStorage.setItem("creds", JSON.stringify(creds));
            AsyncStorage.setItem("id", response.id);

            setLoadingVisible(loadingVisible);
            dispatch(receiveLogin(response));
            alert("Login Successful:" + " " + "Welcome " + creds.username);
          } else {
            setLoadingVisible(loadingVisible);
            var error = new Error("Error " + response.status);
            error.response = response;
            throw error;
          }
        })
        .catch((error) => {
          setLoadingVisible(loadingVisible);
          dispatch(loginError(error.message));
        })
    );
  };

  const toggleRemember = () => {
    setRemember(!remember);
  };

  const toggleShowPass = () => {
    setShowPass(!showPass);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        borderTopRightRadius: 75,
        borderTopLeftRadius: 75,
      }}
    >
      <ScrollView>
        <View style={styles.container}>
          <Input
            placeholder="Username"
            placeholderTextColor="#000000"
            leftIcon={{
              type: "font-awesome",
              name: "user-o",
              color: "#000000",
            }}
            onChangeText={(username) => setUsername(username)}
            value={username}
            style={styles.formInput}
          />
          <View>
            <Input
              placeholder="Password"
              placeholderTextColor="#000000"
              leftIcon={{ type: "font-awesome", name: "key", color: "#000000" }}
              onChangeText={(password) => setPassword(password)}
              value={password}
              style={styles.formInput}
              secureTextEntry={showPass}
            />
            <TouchableOpacity style={styles.btnEye} onPress={toggleShowPass}>
              <AntDesign name={"eye"} size={22} color={"#000000"} />
            </TouchableOpacity>
          </View>

          <CheckBox
            title="Remember Me"
            center
            checked={remember}
            onPress={toggleRemember}
            style={styles.formCheckbox}
          />
          <View style={styles.buttonWrapper}>
            <TouchableHighlight onPress={handleLogin} style={styles.solid}>
              <Text style={styles.solidText}>Login</Text>
            </TouchableHighlight>
          </View>
        </View>

        <Modal visible={loadingVisible} transparent={true} animationType="fade">
          <View style={styles.wrapper}>
            <View style={styles.loadingView}>
              <ActivityIndicator size="large" color="#4682B4" />
              <Text style={styles.loadingText}>Loading . . .</Text>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: "center",
    margin: 20,
  },
  formButton: {
    margin: 20,
  },
  formInput: {
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
  btnEye: {
    position: "absolute",
    top: 10,
    right: 37,
  },
  solid: {
    width: 250,
    backgroundColor: "#4682B4",
    padding: 15,
    justifyContent: "center",
    marginBottom: 20,
    borderRadius: 24,
  },
  solidText: {
    textTransform: "uppercase",
    textAlign: "center",
    fontWeight: "bold",
    letterSpacing: 3,
    color: "#000000",
  },
  buttonWrapper: {
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 20,
  },
  formCheckbox: {
    alignItems: "center",
  },
  wrapper: {
    zIndex: 9,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
  },
  loadingView: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  loadingText: {
    color: "#4682B4",
    fontSize: 14,
    fontWeight: "bold",
  },
});
