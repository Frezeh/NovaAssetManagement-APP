import React, { useEffect } from "react";
import {
  Text,
  ScrollView,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableHighlight,
  Image,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { Card } from "react-native-elements";
import { baseUrl } from "../shared/baseUrl";
import { Loading } from "./LoadingComponent";
import { useSelector, useDispatch } from "react-redux";
import { fetchPromos } from "../redux/ActionCreators";
import AppLoading from "expo-app-loading";
import { useFonts, Ubuntu_400Regular } from "@expo-google-fonts/ubuntu";

export default function Overview() {
  useEffect(() => {
    dispatch(fetchPromos());
  }, []);

  const dispatch = useDispatch();

  const promotions = useSelector((state) => state.promotions);

  let [fontsLoaded] = useFonts({
    Ubuntu_400Regular,
  });

  function Header() {
    if (!fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingTop: 20,
            }}
          >
            <Image
              source={require("../assets/images/novaHq.png")}
              style={{
                width: 350,
                height: 220,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}
            />
            <Text
              style={{
                fontSize: 20,
                fontWeight: "600",
                fontFamily: "Ubuntu_400Regular",
                fontWeight: "bold",
                color: "black",
                paddingTop: 10,
              }}
            >
              Welcome to Nova Asset Management
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "400",
                paddingTop: 10,
                fontFamily: "Ubuntu_400Regular",
              }}
            >
              Make your first investment today
            </Text>
            <View style={{ paddingTop: 30 }}>
              <TouchableHighlight
                //onPress={() => navigation.navigate('Register')}
                style={styles.transparent}
              >
                <Text style={styles.transparentText}>Fund Account</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      );
    }
  }

  function WhatWeDo() {
    if (!fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "black",
              paddingTop: 20,
              marginLeft: 5,
              fontFamily: "Ubuntu_400Regular",
            }}
          >
            What We Do
          </Text>
          <Card style={{ border: "dark" }}>
            <Text style={{ margin: 10, fontFamily: "Ubuntu_400Regular" }}>
              Our investment management expertise is brought to bear in catering
              to the spectrum of needs of our clientele comprising individuals,
              corporates (private and public), co-operative societies, religious
              institutions, non-governmental organizations through the following
              services and multi-currency denominated products
            </Text>
          </Card>
        </View>
      );
    }
  }

  function Product() {
    return (
      <View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "black",
            paddingTop: 20,
            marginLeft: 5,
            fontFamily: "Ubuntu_400Regular",
          }}
        >
          Products & Services
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ paddingTop: 20 }}
        >
          {promotions.promotions.map((promo) => (
            <View key={promo._id}>
              <View
                style={{
                  margin: 10,
                  width: 250,
                  height: 250,
                  borderWidth: 0.5,
                  borderColor: "#ddd",
                  borderRadius: 10,
                  marginRight: 15,
                  paddingHorizontal: 15,
                }}
              >
                <View>
                  <Image
                    source={{ uri: baseUrl + promo.image }}
                    style={{ width: 220, height: 100, marginTop: 15 }}
                  />
                </View>

                <View
                  style={{
                    marginTop: 5,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "500",
                      fontFamily: "Ubuntu_400Regular",
                    }}
                  >
                    {promo.name}
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: 5,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "400",
                      paddingLeft: 5,
                      color: "#5D616D",
                      fontFamily: "Ubuntu_400Regular",
                    }}
                  >
                    {promo.description}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }

  if (promotions.isLoading) {
    return (
      <ScrollView>
        <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
          <Header />
          <WhatWeDo />
          <View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "black",
                paddingTop: 10,
                marginLeft: 5,
                fontFamily: "Ubuntu_400Regular",
              }}
            >
              Products & Services
            </Text>
          </View>
          <View>
            <Loading />
          </View>
        </Animatable.View>
      </ScrollView>
    );
  } else if (promotions.errMess) {
    return (
      <ScrollView>
        <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
          <Header />
          <WhatWeDo />
          <View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "black",
                paddingTop: 10,
                marginLeft: 5,
                fontFamily: "Ubuntu_400Regular",
              }}
            >
              Products & Services
            </Text>
          </View>
          <View>
            <Text>{promotions.errMess}</Text>
          </View>
        </Animatable.View>
      </ScrollView>
    );
  } else {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "white",
          borderTopRightRadius: 75,
          borderTopLeftRadius: 75,
        }}
      >
        <ScrollView style={{ flex: 1 }}>
          <Animatable.View
            animation="fadeInRightBig"
            duration={2000}
            delay={1000}
          >
            <Header />
            <WhatWeDo />
            <Product />
          </Animatable.View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  transparent: {
    width: 250,
    backgroundColor: "#2150f5",
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
