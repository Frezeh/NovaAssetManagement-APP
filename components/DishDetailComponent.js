/* import React, { useState, useEffect, useRef } from 'react';
import { Text, View, ScrollView, FlatList, Modal, StyleSheet, Button, Alert, Share, TouchableHighlight } from 'react-native';
import { Card, Icon, Input, Rating } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';
import { useSelector, useDispatch } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { fetchDishes, fetchComments, postFavorite, postComment } from '../redux/ActionCreators';
import { AppLoading } from 'expo';
import { useFonts, Ubuntu_400Regular,} from '@expo-google-fonts/ubuntu';

const obtainNotificationPermission = async () => {
    let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
    if (permission.status !== 'granted') {
        permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if (permission.status !== 'granted') {
            Alert.alert('Permission not granted to show notifications');
        }
    }
    return permission;
}

const presentLocalNotification = async () => {
    await obtainNotificationPermission();
    Notifications.presentLocalNotificationAsync({
        title: 'Your Request',
        body: 'Real Estate Transaction Request is in Progress',
        ios: {
            sound: true
        },
        android: {
            sound: 'default',
            vibrate: [0, 250, 250, 250],
            color: '#4682B4',
        }
    });
}

export default function DishDetail ({ route }) {
    
    const dishes = useSelector(state => state.dishes);
    const favorites = useSelector(state => state.favorites);
    const comments = useSelector(state => state.comments);

    const  dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);
    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');
    const [author, setAuthor] = useState('');


    let [fontsLoaded] = useFonts({
        Ubuntu_400Regular,
    });

    const handleComment = () => {
        alert('Your Request Is Being Processed! ');
        //dispatch(postComment(dishId, rating, comment, author));
        presentLocalNotification();
        setShowModal(!showModal);
    }
    const closeComment = () => {
        alert("Modal has been closed.");
        setShowModal(!showModal);
    }

    

    useEffect(() => {
        dispatch(fetchDishes());
    }, []);

    const markFavorite = (dishId) => {
        dispatch(postFavorite(dishId));   
    }

    const sendComment = (dishId, rating, comment, author) => {
        dispatch(postComment(dishId, rating, comment, author));
    }

    const shareDish = (title, message, url) => {
        Share.share({
            title: title,
            message: title + ': ' + message + ' ' + url,
            url: url
        },{
            dialogTitle: 'Share ' + title
        })
    }

        const RenderDish = (props) => {
            const dish = props.dish;

            if (!fontsLoaded) {
                return <AppLoading />;
                } else {

            if (dish != null) {
                return(
                    <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                    <Card
                    featuredTitle={dish.name}
                    featuredTitleStyle={{fontFamily: 'Ubuntu_400Regular'}}
                    image={{uri: baseUrl + dish.image}}>
                        <Text style={{margin: 10, fontFamily: 'Ubuntu_400Regular'}}>
                            {dish.description}
                        </Text>
                        <Text style={{margin: 10, fontFamily: 'Ubuntu_400Regular'}}>
                            {dish.category}
                        </Text>
                        <Text style={{margin: 10, fontFamily: 'Ubuntu_400Regular', fontSize: 30}}>
                             {'₦ ' + dish.price}
                        </Text>
                        <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: "row" }}>
                        <Icon 
                            raised
                            reverse
        //if it is a favorite then I will render a field, heart, to indicate that this is already a favorite dish. If it is not a favorite, I will render 
        //a heart with just the outline to indicate that this is not a favorite. 
                            name={ props.favorite ? 'heart' : 'heart-o'}
                            type='font-awesome'
                            color='#f50'
        //using the props.favorite, if it is true, then I'm going to simply console log(). If it's false, then I'm going to call the onPress(), which will be passed in as a parameter
                            onPress={() => props.favorite ? alert('Already favorite') : props.onPress()}
                            />
                        <Icon
                            raised
                            reverse
                            name='share'
                            type='font-awesome'
                            color='#51D2A8'
                            onPress={() => shareDish(dish.name, dish.description, baseUrl + dish.image)} 
                            />
                        </View>
                        <View style={styles.buttonWrapper}>
                        <TouchableHighlight
                            onPress={() => setShowModal(!showModal)}
                            style={styles.solid}>
                            <Text style={styles.solidText}>Get Started</Text>
                        </TouchableHighlight>
                        </View>
                    </Card>
                    </Animatable.View>
                );
            }

            else {
                return(<View></View>);
            }
        }
    }

//in order to extract data,we will specify that dishId, and then we'll also specify a default option
        
    const dishId = route.params?.dishId ?? '';
        return(

//this.dishes is a JavaScript object array, and so I need to select the specific dish for which, the dishId is what I have obtained as the incoming 
//parameter. since this will be a string here I am going to turn it in to a number. By putting a plus, and this will turn that into the equivalent number 
//so that I will use as the index in to the dishes here. And then, that will be the prop that will be passed in to the render dish
            
            <ScrollView style={{flex: 1}}>
                <RenderDish dish={dishes.dishes.filter((dish) => dish._id === dishId)[0]}

//Some will return a true if there exists an item in there that matches this function, otherwise, it will return a false. I will check every element in 
//this array to see if this element, Is the same as the dishId. return. Favorite will be true if the dish ID already exists in this array. 
//If it doesn't exist, then el === dishId will fail for all the dishIds, and return a false
                    favorite={favorites.some(el => el === dishId)}
                    onPress={markFavorite(dishId)}
                    postComment={sendComment}
                    />
            <View>
            <Modal animationType = {"slide"} transparent = {false}   //modal
                    visible = {showModal}     
                    onRequestClose = {() => {Alert.alert("Modal has been closed."); }}>
            <View style={styles.formRow}>
                <Rating
                    showRating
 
                    style={{ paddingVertical: 10 }}
                    onChangeText={(rating) => setRating(rating)}
                    value={rating}
                />
            </View>
            <View style = {styles.modal}>
                <Input
                    placeholder='Name'
                    leftIcon={
                        <Icon
                            name='user-o'
                            type='font-awesome'
                            size={24}
                            color='black'
                        />
                    }
                    onChangeText={(author) => setAuthor(author)}
                    value={author}
                />
            </View>
            <View style = {styles.modal}>
                <Input
                    placeholder='Email'
                    leftIcon={
                        <Icon
                            name='comment-o'
                            type='font-awesome'
                            size={24}
                            color='black'
                        />
                    }
                    onChangeText={(comment) => setComment(comment)}
                    value={comment}
                />
            </View>
            <View style = {styles.modal}>
            <Button 
                onPress = {(value) => handleComment(value)}
                color="#4682B4"
                title="Submit" 
                    />
            </View>
            <View style = {styles.modal}>
            <Button 
                onPress = {closeComment}
                color="#a9a9a9"
                title="Close" 
                        />
                    </View>
                </Modal>
                </View>
            </ScrollView>
        );
    }

    const styles = StyleSheet.create({
        formRow: {
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          flexDirection: 'row',
          margin: 20
        },
        solid: {
            width: 250,
            backgroundColor: "#4682B4",
            padding:15,
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
         */