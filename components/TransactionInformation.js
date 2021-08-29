import React, { useEffect, useState, useCallback } from 'react';
import { TouchableOpacity, SafeAreaView, ScrollView, StyleSheet, View, RefreshControl } from 'react-native'; //Text
import { Block, Card, Text, Icon, Label } from '../buttons';
import * as Animatable from 'react-native-animatable';
import { useSelector, useDispatch } from 'react-redux';
import AppLoading from 'expo-app-loading';
import { useFonts, Ubuntu_400Regular, } from '@expo-google-fonts/ubuntu';
import { Loading } from './LoadingComponent';
import { fetchUser, addUser, userFailed, userLoading, addHistory } from '../redux/ActionCreators';
import { baseUrl } from '../shared/baseUrl';

export default function TransactionInformation() {

 useEffect(() => {
    User();
  }, []);

  const dispatch = useDispatch();

  const auth = useSelector(state => state.auth);
  const user = useSelector(state => state.user);
  const history = useSelector(state => state.history);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() =>
      setRefreshing(false));
  }, []);

  const User = () => {
    let adress = `${auth.id}`
    dispatch(userLoading());

    return fetch(baseUrl + `users/${adress}`)
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
        error => {
          var errmess = new Error(error.message);
          throw errmess;
        })
      .then(response => response.json())
      .then(user => { dispatch(addUser(user)); dispatch(addHistory(user)) })
      .catch(error => dispatch(userFailed(error.message)));
  };

  const styles = StyleSheet.create({
    overview: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: "white"
    },
    margin: {
      marginHorizontal: 15
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
      justifyContent: 'center',
      alignItems: 'center',
    }
  });

  let [fontsLoaded] = useFonts({
    Ubuntu_400Regular,
  });

  if (user.isLoading) {
    return (
      <Loading />
    );
  }
  else if (user.errMess) {
    return (
      <View>
        <Text>{user.errMess}</Text>
      </View>
    );
  }
  else {

    if (!fontsLoaded) {
      return <AppLoading />;

    } else {
      return (
          <SafeAreaView style={styles.overview}>
            <ScrollView
              contentContainerStyle={{ paddingVertical: 15 }}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }
            >
              <Animatable.View animation="fadeInRightBig" duration={2000}>
                <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
                  <ScrollView style={{ flex: 1 }}>
                      <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ color: "#5d616f", fontSize: 40, fontWeight: "500", fontFamily: 'Ubuntu_400Regular' }}>
                           Account Statement
                        </Text>
                      </View>
                      <Card
                        title="ACCOUNT STATEMENT"
                        style={{ backgroundColor: "#4682B4", marginHorizontal: 15, marginTop: 18, borderRadius: 16, borderWidth: 0.5, borderColor: "#ddd", }}
                      >
                        {history.history.map((history) => (
                          <View key={history._id}>
                            <Block style={styles.driver}>
                              <TouchableOpacity activeOpacity={0.8}>
                                <Block row center>
                                  <Block flex={2}>
                                    {history.format === 'Debit' ? <Label red /> : <Label green />}
                                    <Text h4 style={{ color: "white" }}>{history.category}</Text>
                                    <Text paragraph color="gray">{history.format}</Text>
                                  </Block>
                                  <Block>
                                    <Label />
                                    <Text paragraph right color="white">₦ {history.value}</Text>
                                    <Text paragraph right color="gray">{history.date}</Text>
                                  </Block>
                                </Block>
                              </TouchableOpacity>
                            </Block>
                          </View>
                        ))}
                      </Card>
                  </ScrollView>
                </SafeAreaView>
              </Animatable.View>
            </ScrollView>
          </SafeAreaView>
      );
    }
  }
}

