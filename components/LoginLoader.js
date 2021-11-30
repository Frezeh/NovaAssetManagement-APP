import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableHighlight,
  Modal,
} from "react-native";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/ActionCreators";

export default function LoginLoader() {
  const dispatch = useDispatch();

  const [loadingVisible, setLoadingVisible] = useState(true);

  const handleLogout = () => {
    setLoadingVisible(!loadingVisible);
    dispatch(logoutUser());
  };

  return (
    <ScrollView>
      <Modal visible={loadingVisible} transparent={false} animationType="fade">
        <View style={styles.wrapper}>
          <View style={styles.loadingView}>
            <Text style={styles.loadingText}>Session Timed Out!</Text>
            <Text style={styles.loadingText}> Login to unlock screen </Text>
          </View>
          <View style={styles.buttonWrapper}>
            <TouchableHighlight onPress={handleLogout} style={styles.solid}>
              <Text style={styles.solidText}>Login</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
    flexDirection: "column",
    marginTop: 50,
  },
  loadingText: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonWrapper: {
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 50,
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
    color: "#666",
  },
});
