import React from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableHighlight } from 'react-native';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/ActionCreators';

export default function Logout() {

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logoutUser());
    }

    return (
        <ScrollView>
            <View style={styles.container}>

                <View style={styles.header}>
                    <Text style={styles.text}>
                        Are you sure you want to Logout?
                </Text>
                </View>

                <View style={styles.buttonWrapper}>
                    <TouchableHighlight
                        onPress={handleLogout}
                        style={styles.solid}>
                        <Text style={styles.solidText}>Yes</Text>
                    </TouchableHighlight>
                </View>

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        justifyContent: 'center',
        margin: 20,
    },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "column",
        marginTop: 50,
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
    text: {
        color: "black",
        fontSize: 20,
        fontWeight: "bold"
    },

});