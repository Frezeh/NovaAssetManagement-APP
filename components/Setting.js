import React from "react";
import { Text, ScrollView, Image, View, SafeAreaView } from "react-native";
import AppLoading from "expo-app-loading";
import { useFonts, Ubuntu_400Regular } from "@expo-google-fonts/ubuntu";

export default function Setting() {
  let [fontsLoaded] = useFonts({
    Ubuntu_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "white",
          borderTopRightRadius: 75,
          borderTopLeftRadius: 75,
          paddingTop: 20,
        }}
      >
        <ScrollView>
          <View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                paddingTop: 10,
                fontFamily: "Ubuntu_400Regular",
                marginLeft: 5,
              }}
            >
              Account
            </Text>
            <View style={{ flexDirection: "column", paddingTop: 30 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: "300",
                    letterSpacing: 0.5,
                    marginBottom: 30,
                    fontFamily: "Ubuntu_400Regular",
                    marginLeft: 15,
                  }}
                >
                  Limits and features
                </Text>
                <Image
                  source={require("../assets/images/arrow.png")}
                  style={{ width: 10, height: 10 }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: "300",
                    letterSpacing: 0.5,
                    marginBottom: 30,
                    fontFamily: "Ubuntu_400Regular",
                    marginLeft: 15,
                  }}
                >
                  Change Plan
                </Text>
                <Image
                  source={require("../assets/images/arrow.png")}
                  style={{ width: 10, height: 10 }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: "300",
                    letterSpacing: 0.5,
                    marginBottom: 30,
                    fontFamily: "Ubuntu_400Regular",
                    marginLeft: 15,
                  }}
                >
                  Direct Debits
                </Text>
                <Image
                  source={require("../assets/images/arrow.png")}
                  style={{ width: 10, height: 10 }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: "300",
                    letterSpacing: 0.5,
                    marginBottom: 30,
                    fontFamily: "Ubuntu_400Regular",
                    marginLeft: 15,
                  }}
                >
                  Appearance
                </Text>
                <Image
                  source={require("../assets/images/arrow.png")}
                  style={{ width: 10, height: 10 }}
                />
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    paddingTop: 10,
                    fontFamily: "Ubuntu_400Regular",
                    marginLeft: 5,
                  }}
                >
                  Security
                </Text>
                <View style={{ flexDirection: "column", paddingTop: 30 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 17,
                        fontWeight: "300",
                        letterSpacing: 0.5,
                        marginBottom: 30,
                        fontFamily: "Ubuntu_400Regular",
                        marginLeft: 15,
                      }}
                    >
                      Privacy
                    </Text>
                    <Image
                      source={require("../assets/images/arrow.png")}
                      style={{ width: 10, height: 10 }}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 17,
                        fontWeight: "300",
                        letterSpacing: 0.5,
                        marginBottom: 30,
                        fontFamily: "Ubuntu_400Regular",
                        marginLeft: 15,
                      }}
                    >
                      Change Password
                    </Text>
                    <Image
                      source={require("../assets/images/arrow.png")}
                      style={{ width: 10, height: 10 }}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 17,
                        fontWeight: "300",
                        letterSpacing: 0.5,
                        marginBottom: 30,
                        fontFamily: "Ubuntu_400Regular",
                        marginLeft: 15,
                      }}
                    >
                      Change Authorization
                    </Text>
                    <Image
                      source={require("../assets/images/arrow.png")}
                      style={{ width: 10, height: 10 }}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
