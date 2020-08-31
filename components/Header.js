import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import Colors from '../constants/colors';

const Header = props => {
    return (
        <View style={stlyes.header}>
            <Text style={stlyes.headerTitle}>{props.title}</Text>
        </View>
    );
};

const stlyes = StyleSheet.create({
    header: {
        width: '100%',
        height: 90,
        paddingTop: 36,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerTitle: {
        color: 'white',
        fontSize: 26,
        fontFamily: 'open-sans-bold'
    }
});

export default Header;