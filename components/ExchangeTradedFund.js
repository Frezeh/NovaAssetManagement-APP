import React, { useEffect, useState, useRef } from 'react';
import { Text, ScrollView, Modal, View, Button, Alert, StyleSheet, Platform, TouchableHighlight, SafeAreaView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Animatable from 'react-native-animatable';
import { Card, Icon, Input } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEtf, postEtfSale, addEtfSale } from '../redux/ActionCreators';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import AppLoading from 'expo-app-loading';
import { useFonts, Ubuntu_400Regular, } from '@expo-google-fonts/ubuntu';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
  
export default function ExchangeTradedFund() {
    
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

  useEffect(() => {
    dispatch(fetchEtf());       
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

    const etf = useSelector(state => state.etf);
    const auth = useSelector(state => state.auth);

    const [showModal, setShowModal] = useState(false);
    const [comment, setComment] = useState('');
    const [author, setAuthor] = useState('');
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const value = (comment * author);

    const push = async () => {
        await schedulePushNotification(date);
      }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const dispatch = useDispatch();

    let [fontsLoaded] = useFonts({
        Ubuntu_400Regular,
    });

    const handleComment = () => {
        postEtf();
        setShowModal(!showModal);
    }

    const closeComment = () => {
        alert("Modal has been closed.");
        setShowModal(!showModal);
    }

    const newSale = {
        category: "Exchange Traded Fund",
        value: value,
      };

    const token = auth.token;

    const postEtf = () => {        
      
        const bearer = 'Bearer ' +  token;//asyn
      
        return fetch(baseUrl + 'stock/buy', {
          method: "POST",
          // take this JavaScript object, and then turn that into a JSON
          body: JSON.stringify(newSale),
          headers: {
            "Content-Type": "application/json",
            'Authorization': bearer
          },
          credentials: "same-origin"
        })
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
              throw error;
            })
          .then(response => response.json())
          //this response coming in from the server will contain the updated comment that has been posted to the server site
          .then(stock => { dispatch(addEtfSale(stock)); alert('Your Request Is Being Processed! '); push(); })
          .catch(error => { alert('Your purchase could not be posted\nError: ' + error.message); });
      };

    const RenderCard = ({ item }) => {

        return (
            <Card
                featuredTitle={item.name}
                featuredTitleStyle={{ fontFamily: 'Ubuntu_400Regular' }}
                image={{ uri: baseUrl + item.image }}>
                <Text
                    style={{ margin: 10, fontFamily: 'Ubuntu_400Regular' }}>
                    {item.description}
                </Text>
                <View style={styles.buttonWrapper}>
                    <TouchableHighlight
                        onPress={() => setShowModal(!showModal)}
                        style={styles.solid}>
                        <Text style={styles.solidText}>Get Started</Text>
                    </TouchableHighlight>
                </View>
            </Card>
        );

    }

    const home = etf.etf.map((etf) => {
        return (
            <ScrollView key={etf._id}>
                <RenderCard item={etf} />
            </ScrollView>
        );
    });

    if (etf.isLoading) {
        return (
            <Loading />
        );
    }
    else if (etf.errMess) {
        return (
            <View>
                <Text>{etf.errMess}</Text>
            </View>
        );
    }
    else {

        if (!fontsLoaded) {
            return <AppLoading />;
        } else {


            return (
                <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
                    <ScrollView>
                        <Animatable.View animation="fadeInRightBig" duration={2000} delay={1000}>
                            {home}
                        </Animatable.View>
                        <View>
                            <Modal animationType={"slide"} transparent={false}   //modal
                                visible={showModal}
                                onRequestClose={() => { Alert.alert("Modal has been closed."); }}>
                                <View style={styles.modal}>
                                    <Input
                                        placeholder='# Price'
                                        onChangeText={(comment) => setComment(comment)}
                                        value= {comment}
                                    />
                                </View>
                                <View style={styles.modal}>
                                    <Input
                                        placeholder='Unit'
                                        onChangeText={(author) => setAuthor(author)}
                                        value= {author}
                                    />
                                </View>
                                <View style={styles.modal}>
                                    <TouchableHighlight onPress={showDatepicker}>
                                        <Text style={{ fontFamily: 'Ubuntu_400Regular', color: "#4682B4" }}>Maturity Date</Text>
                                    </TouchableHighlight>
                                    {show && (
                                        <DateTimePicker
                                            testID="dateTimePicker"
                                            value={date}
                                            mode={mode}
                                            is24Hour={true}
                                            display="default"
                                            onChange={onChange}
                                        />
                                    )}
                                </View>
                                <View style={styles.modal}>
                                    <Button
                                        onPress={(value) => handleComment(value)}
                                        color="#4682B4"
                                        title="Submit"
                                    />
                                </View>
                                <View style={styles.modal}>
                                    <Button
                                        onPress={closeComment}
                                        color="#a9a9a9"
                                        title="Close"
                                    />
                                </View>
                            </Modal>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            );
        }
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2,
        fontFamily: 'Ubuntu_400Regular'
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
    modal: {
        justifyContent: 'center',
        margin: 20
    }
});

async function schedulePushNotification(date) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got mail! 📬",
        body: 'Exchange Traded Fund Transaction Maturing ' + date + ' is in Progress',
        data: { data: 'goes here' },
      },
      trigger: { seconds: 2 },
    });
  }
  
  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#4682B4',
      });
    }
  
    return token;
  }