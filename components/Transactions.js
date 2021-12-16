import React, { useEffect, useState, useCallback } from "react";
import {
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Image,
  RefreshControl,
} from "react-native";
import { Block, Card, Text, Icon, Label } from "../buttons";
import * as Animatable from "react-native-animatable";
import { useSelector, useDispatch } from "react-redux";
import AppLoading from "expo-app-loading";
import { useFonts, Ubuntu_400Regular } from "@expo-google-fonts/ubuntu";
import { Loading } from "./LoadingComponent";
import { fetchUser } from "../redux/ActionCreators";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function Transactions({ navigation }) {
  useEffect(() => {
    let id = auth.id;
    dispatch(fetchUser(id));

  }, []);

  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const history = useSelector((state) => state.history);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const styles = StyleSheet.create({
    overview: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: "white",
    },
    margin: {
      marginHorizontal: 15,
    },
    driver: {
      marginBottom: 11,
    },
    avatar: {
      width: 48,
      height: 48,
      borderRadius: 24,
    },
    headerText: {
      flex: 4,
      justifyContent: "center",
      alignItems: "center",
    },
  });

  let [fontsLoaded] = useFonts({
    Ubuntu_400Regular,
  });

  if (user.isLoading) {
    return <Loading />;
  } else if (user.errMess) {
    return (
      <View>
        <Text>{user.errMess}</Text>
      </View>
    );
  } else {
    if (!fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <React.Fragment>
          {/*CONTENT**/}
          <SafeAreaView style={styles.overview}>
            <ScrollView
              contentContainerStyle={{ paddingVertical: 15 }}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            >
              <Animatable.View animation="fadeInRightBig" duration={2000}>
                <SafeAreaView style={{ flex: 1 }}>
                  <ScrollView>
                    <Card
                      style={{
                        backgroundColor: "#4682B4",
                        marginHorizontal: 15,
                        marginTop: 10,
                        borderRadius: 16,
                        borderWidth: 0.5,
                        borderColor: "#ddd",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <View style={{ flex: 1 }}>
                          <Image
                            source={require("../assets/images/profile.png")}
                            style={{
                              marginTop: 5,
                              marginLeft: 10,
                              width: 120,
                              height: 120,
                              borderRadius: 50,
                            }}
                          />
                        </View>
                        <View style={{ flex: 1.5 }}>
                          <Text
                            style={{
                              paddingHorizontal: 30,
                              marginTop: 15,
                              marginLeft: 30,
                              color: "#fff",
                              fontFamily: "Ubuntu_400Regular",
                              fontSize: 30,
                              fontWeight: "bold",
                            }}
                          >
                            👋Hi, {user.user.lastname} {user.user.firstname}{" "}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          marginVertical: 10,
                          backgroundColor: "#fff",
                          width: "100%",
                          height: 1,
                        }}
                      ></View>
                      <View
                        style={{
                          paddingTop: 5,
                          paddingHorizontal: 20,
                          marginBottom: 10,
                        }}
                      >
                        <Text
                          style={{
                            color: "#fff",
                            fontSize: 20,
                            fontWeight: "500",
                            fontFamily: "Ubuntu_400Regular",
                          }}
                        >
                          Investment Balance
                        </Text>
                        <Text
                          style={{
                            color: "#fff",
                            fontSize: 29,
                            fontWeight: "bold",
                            paddingTop: 5,
                            fontFamily: "Ubuntu_400Regular",
                          }}
                        >
                          ₦ {user.user.balance.toLocaleString()}
                        </Text>
                      </View>
                    </Card>
                    <Card
                      title="TRANSACTION INFORMATION"
                      style={{
                        backgroundColor: "#4682B4",
                        marginHorizontal: 15,
                        marginTop: 18,
                        borderRadius: 16,
                        borderWidth: 0.5,
                        borderColor: "#ddd",
                      }}
                    >
                      {history.history.slice(0, 4).map((history) => (
                        <View key={history._id}>
                          <Block style={styles.driver}>
                            <TouchableOpacity activeOpacity={0.8}>
                              <Block row center>
                                <Block flex={2}>
                                  {history.format === "Debit" ? (
                                    <Label red />
                                  ) : (
                                    <Label green />
                                  )}
                                  <Text h4 style={{ color: "white" }}>
                                    {history.category}
                                  </Text>
                                  <Text paragraph color="gray">
                                    {history.format}
                                  </Text>
                                </Block>
                                <Block>
                                  <Label />
                                  <Text paragraph right color="white">
                                    ₦ {history.value}
                                  </Text>
                                  <Text paragraph right color="gray">
                                    {history.date}
                                  </Text>
                                </Block>
                              </Block>
                            </TouchableOpacity>
                          </Block>
                        </View>
                      ))}
                    </Card>
                    <Card
                      title="TRANSACTIONS BY TYPE"
                      style={{
                        backgroundColor: "#4682B4",
                        marginHorizontal: 15,
                        marginTop: 18,
                        borderRadius: 16,
                        borderWidth: 0.5,
                        borderColor: "#ddd",
                      }}
                    >
                      <Block>
                        <Text>Chart</Text>
                      </Block>
                      <Block row space="between" style={{ marginTop: 25 }}>
                        <Block>
                          <Text h2 light style={{ color: "white" }}>
                            0
                          </Text>
                          <Block row center>
                            <Label blue />
                            <Text paragraph color="gray">
                              Affordable
                            </Text>
                          </Block>
                        </Block>
                        <Block>
                          <Text h2 light style={{ color: "white" }}>
                            0
                          </Text>
                          <Block row center>
                            <Label purple />
                            <Text paragraph color="gray">
                              Premium
                            </Text>
                          </Block>
                        </Block>
                      </Block>
                    </Card>

                    <View style={{ flexDirection: "row", marginTop: 18 }}>
                      <View
                        style={{
                          margin: 10,
                          width: 150,
                          height: 200,
                          borderWidth: 0.5,
                          borderColor: "#ddd",
                          borderRadius: 10,
                          marginRight: 15,
                          paddingHorizontal: 15,
                        }}
                      >
                        <View
                          style={{
                            marginTop: 5,
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          {<Icon vehicle />}
                        </View>
                        <View
                          style={{
                            marginTop: 5,
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Text h2 style={{ marginTop: 17, color: "#5d616f" }}>
                            {user.user.progress}
                          </Text>
                        </View>
                        <View
                          style={{
                            marginTop: 5,
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Text paragraph color="gray">
                            Transactions in Progress
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          margin: 10,
                          width: 150,
                          height: 200,
                          borderWidth: 0.5,
                          borderColor: "#ddd",
                          borderRadius: 10,
                          marginRight: 15,
                          paddingHorizontal: 15,
                        }}
                      >
                        <View
                          style={{
                            marginTop: 5,
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          {<Icon distance />}
                        </View>
                        <View
                          style={{
                            marginTop: 5,
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Text h2 style={{ marginTop: 17, color: "#5d616f" }}>
                            {user.user.total}
                          </Text>
                        </View>
                        <View
                          style={{
                            marginTop: 5,
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Text paragraph color="gray">
                            Total Transactions
                          </Text>
                        </View>
                      </View>
                    </View>
                  </ScrollView>
                </SafeAreaView>
                {/*CONTENT**/}
              </Animatable.View>
            </ScrollView>
          </SafeAreaView>
        </React.Fragment>
      );
    }
  }
}
