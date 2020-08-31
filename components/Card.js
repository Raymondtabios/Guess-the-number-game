import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = props => {
    return (
    <View style ={{ ...styles.card, ...props.style}}>{props.children}</View>
    // ...spread operator pulls objecct out of its object
    );     
};

const styles = StyleSheet.create ({
    card: {
         // shadow ios
         shadowColor: 'black', // around the buttons  
         shadowOffset: {width:0, height: 2},//an object, offset for your container 
         shadowRadius: 6, // how sharp a shadow, sharp or blurry
         shadowOpacity: 0.26, // transparent 
         backgroundColor: 'white', // always be white even if you change background
         // elevation only on android
         elevation: 5,
         padding: 20, // seperates from text
         borderRadius: 10 // rounded borders
    }
});

export default Card; 

