import * as React from "react";
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Text,
  Image,
} from "react-native";
import { Video } from "expo-av";

export default function Welcome({ navigation }) {
  const video = React.useRef(null);
  const alert = () => {
    alert("Contact Administrator for Create Account");
  };
  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: "https://mbluxury1.s3.amazonaws.com/2020/09/18141509/home-video-2020.mp4",
        }}
        resizeMode="cover"
        rate={1}
        shouldPlay={true}
        isLooping={true}
        volume={1}
        muted={true}
      />
      <View style={styles.welcomeWrapper}>
        <Image
          style={styles.logo}
          source={require("../assets/images/logo.png")}
        />
        <Text style={styles.welcomeText}>Welcome to Nova Asset Management</Text>
        <Text style={styles.welcomeSubText}>
          We Offer Mutual Funds, Structured Products, Portfolio Administration
          Service and Trustee Services.
        </Text>
        <View style={styles.buttonWrapper}>
          <TouchableHighlight
            onPress={() => navigation.navigate("Login")}
            style={styles.solid}
          >
            <Text style={styles.solidText}>Login</Text>
          </TouchableHighlight>

          <TouchableHighlight
            onPress={() => navigation.navigate("Register")}
            style={styles.transparent}
          >
            <Text style={styles.transparentText}>Create Account</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  video: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  buttons: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeWrapper: {
    padding: 20,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
  },
  logo: {
    width: 100,
    height: 100,
    maxWidth: 100,
    resizeMode: "contain",
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#f4f4f4",
    margin: 20,
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 3,
  },
  welcomeSubText: {
    letterSpacing: 3,
    color: "#f4f4f4",
    textAlign: "center",
    textTransform: "uppercase",
  },
  buttonWrapper: {
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 100,
  },
  solid: {
    width: 250,
    backgroundColor: "#f3f8ff",
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
    color: "#666",
  },
  transparent: {
    width: 250,
    backgroundColor: "transparent",
    padding: 15,
    justifyContent: "center",
    marginBottom: 20,
    borderRadius: 24,
  },
  transparentText: {
    textTransform: "uppercase",
    textAlign: "center",
    fontWeight: "bold",
    letterSpacing: 3,
    color: "#f3f8ff",
  },
});
