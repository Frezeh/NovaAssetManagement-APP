import React, { Component } from 'react';
import { Text, SafeAreaView } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';
import AppLoading from 'expo-app-loading';
import { useFonts, Ubuntu_400Regular,} from '@expo-google-fonts/ubuntu';
    
export default function Contact () {
    let [fontsLoaded] = useFonts({
        Ubuntu_400Regular,
    });

    const sendMail = () => {
        MailComposer.composeAsync({
            recipients: ['info@novambl.com'],
            subject: 'Enquiry',
            body: 'To whom it may concern:'
        })
    }
    
    if (!fontsLoaded) {
        return <AppLoading />;
         } else {
    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: "white", borderTopRightRadius: 75, borderTopLeftRadius: 75, paddingTop: 20 }}>
        <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
        <Card title="Contact Information" titleStyle={{fontFamily: 'Ubuntu_400Regular'}}>
            <Text style={{margin: 10, fontFamily: 'Ubuntu_400Regular'}}> 
            23, Kofo Abayomi Street 
            </Text>
            <Text style={{margin: 10, fontFamily: 'Ubuntu_400Regular'}}>
            Victoria Island, Lagos
            </Text>
            <Text style={{margin: 10, fontFamily: 'Ubuntu_400Regular'}}>
            Nigeria
            </Text>
            <Text style={{margin: 10, fontFamily: 'Ubuntu_400Regular'}}>
            Telephone: +234 1 280 4000
            </Text>
            <Text style={{margin: 10, fontFamily: 'Ubuntu_400Regular'}}>
            Email: info@novambl.com
            </Text>
            <Button
                title="Send Email"
                buttonStyle={{backgroundColor: "#4682B4"}}
                icon={<Icon name='envelope-o' type='font-awesome' color='white' />}
                onPress={sendMail}
                />
        </Card>
        </Animatable.View>
        </SafeAreaView>
        );
    }
}









