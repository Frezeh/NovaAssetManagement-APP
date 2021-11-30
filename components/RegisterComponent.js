import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableHighlight,
  Text,
  SafeAreaView,
} from "react-native";
import { Icon } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import * as ImageManipulator from "expo-image-manipulator";
import { useDispatch } from "react-redux";
import { Control, Form, Errors, actions } from "react-redux-form/native";
import { postFeedback } from "../redux/ActionCreators";

export default function Regiser() {
  const [imageUrl, setImageUrl] = useState();

  const required = (val) => val && val.length;
  const maxLength = (len) => (val) => !val || val.length <= len;
  const minLength = (len) => (val) => val && val.length >= len;
  const isNumber = (val) => !isNaN(Number(val));
  const validEmail = (val) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    dispatch(postFeedback(values));
    dispatch(actions.reset("feedback"));
  };

  const getImageFromCamera = async () => {
    const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
    const cameraRollPermission = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );

    if (
      cameraPermission.status === "granted" &&
      cameraRollPermission.status === "granted"
    ) {
      let capturedImage = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      if (!capturedImage.cancelled) {
        console.log(capturedImage);
        processImage(capturedImage.uri);
      }
    }
  };

  const getImageFromGallery = async () => {
    const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
    const cameraRollPermission = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );

    if (
      cameraPermission.status === "granted" &&
      cameraRollPermission.status === "granted"
    ) {
      let selectedImage = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!selectedImage.cancelled) {
        console.log(selectedImage);
        processImage(selectedImage.uri);
      }
    }
  };

  const processImage = async (imageUri) => {
    let processedImage = await ImageManipulator.manipulateAsync(
      imageUri,
      [{ resize: { width: 400 } }],
      { format: "png" }
    );
    console.log(processedImage);
    setImageUrl(processedImage.uri);
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
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: imageUrl }}
              loadingIndicatorSource={{
                uri: "https://flyclipart.com/thumb2/account-avatar-client-person-profile-user-icon-196361.png",
              }}
              style={styles.image}
            />
            <Icon
              raised
              reverse
              name="camera"
              type="font-awesome"
              color="#4682B4"
              onPress={getImageFromCamera}
            />
            <Icon
              raised
              reverse
              name="folder"
              type="font-awesome"
              color="#4682B4"
              onPress={getImageFromGallery}
            />
          </View>

          <Form model="feedback" onSubmit={(values) => handleSubmit(values)}>
            <Control.TextInput
              model=".firstname"
              placeholder="First Name"
              validators={{
                required,
                minLength: minLength(3),
                maxLength: maxLength(30),
              }}
            />
            <Errors
              style={{ backgroundColor: "tomato" }}
              model=".firstname"
              show="touched"
              messages={{
                required: "Required",
                minLength: "Must be greater than 2 characters",
                maxLength: "Must be 30 characters or less",
              }}
            />
            <View style={styles.divider}></View>

            <Control.TextInput
              model=".lastname"
              placeholder="Last Name"
              validators={{
                required,
                minLength: minLength(3),
                maxLength: maxLength(30),
              }}
            />
            <Errors
              style={{ backgroundColor: "tomato" }}
              model=".lastname"
              show="touched"
              messages={{
                required: "Required",
                minLength: "Must be greater than 2 characters",
                maxLength: "Must be 30 characters or less",
              }}
            />
            <View style={styles.divider}></View>

            <Control.TextInput
              model=".telnum"
              placeholder="Tel. Number"
              validators={{
                required,
                minLength: minLength(3),
                maxLength: maxLength(11),
                isNumber,
              }}
            />
            <Errors
              style={{ backgroundColor: "tomato" }}
              model=".telnum"
              show="touched"
              messages={{
                required: "Required",
                minLength: "Must be greater than 2 numbers",
                maxLength: "Must be 11 numbers",
                isNumber: "Must be a number",
              }}
            />
            <View style={styles.divider}></View>

            <Control.TextInput
              model=".email"
              placeholder="Email"
              validators={{
                required,
                validEmail,
              }}
            />
            <Errors
              style={{ backgroundColor: "tomato" }}
              model=".email"
              show="touched"
              messages={{
                required: "Required",
                validEmail: "Invalid Email Address",
              }}
            />
            <View style={styles.divider}></View>

            <Control.TextInput
              model=".bvnnum"
              placeholder="BVN Number"
              validators={{
                required,
                minLength: minLength(11),
                maxLength: maxLength(11),
                isNumber,
              }}
            />
            <Errors
              style={{ backgroundColor: "tomato" }}
              model=".bvnnum"
              show="touched"
              messages={{
                required: "Required",
                minLength: "Must be 11 numbers",
                maxLength: "Must be 11 numbers",
                isNumber: "Must be a number",
              }}
            />
            <View style={styles.divider}></View>

            <Control.TextInput
              model=".address"
              placeholder="Address"
              validators={{
                required,
                minLength: minLength(3),
              }}
            />
            <Errors
              style={{ backgroundColor: "tomato" }}
              model=".address"
              show="touched"
              messages={{
                required: "Required",
                minLength: "Must be greater than 2 characters",
              }}
            />
            <View style={styles.divider}></View>

            <View style={styles.buttonWrapper}>
              <TouchableHighlight
                onPress={() => dispatch(actions.submit("feedback"))}
                style={styles.solid}
              >
                <Text style={styles.solidText}>Register</Text>
              </TouchableHighlight>
            </View>
          </Form>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    margin: 20,
  },
  imageContainer: {
    flex: 1,
    flexDirection: "row",
    margin: 20,
    justifyContent: "space-around",
  },
  image: {
    margin: 10,
    width: 80,
    height: 60,
  },
  formInput: {
    margin: 20,
  },
  formCheckbox: {
    margin: 20,
    backgroundColor: null,
  },
  formButton: {
    margin: 60,
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
  btnEye: {
    position: "absolute",
    top: 10,
    right: 37,
  },
  divider: {
    marginVertical: 10,
    backgroundColor: "black",
    width: "100%",
    height: 1,
  },
});
