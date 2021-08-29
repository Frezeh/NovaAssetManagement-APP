import React, { Component } from "react";
import propTypes from "prop-types";
import { Text, View, TouchableHighlight, StyleSheet } from "react-native";

export default class RoundedButton extends Component { 
    render() { 
        const { text, icon, textColor, backgroundColor } = this.props;

        const color = textColor || 'black'
        return ( 
            <TouchableHighlight style={[{ backgroundColor }, styles.wrapper]}>
                <View style={styles.ButtonTextWrapper}>
                    {icon}
                    <Text style={[{ color }, styles.buttonText]}>{text}</Text> 
                </View> 
            </TouchableHighlight> 
            ); 
        }
    }RoundedButton.propTypes = { 
        text: propTypes.string.isRequired, 
        textColor: propTypes.string, 
        backgroundColor: propTypes.string
    };

const styles = StyleSheet.create({ 
    wrapper: { 
        padding: 15, 
        display: "flex", 
        borderRadius: 40, 
        borderWidth: 1, 
        borderColor: 'white',
        borderColor: 'white', 
        marginBottom: 15, 
        alignItems: "center"  
    }, 
    buttonText: { 
        fontSize: 16, 
        width: "100%", 
        textAlign: "center" 
    },
    ButtonTextWrapper: { 
        flexDirection: "row", 
        justifyContent: "flex-end" 
    }
});