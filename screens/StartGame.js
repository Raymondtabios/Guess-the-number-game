import React, { useState, useRef, useEffect } from 'react';
import {View, Text, StyleSheet, Button, Alert, ScrollView, Dimensions} from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import BodyText from '../components/BodyText';
import MainButton from '../components/MainButton';
import {Ionicons} from '@expo/vector-icons';


const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    // recursion = calling a function from inside the same function
    if (rndNum === exclude){
        return generateRandomBetween (min, max, exclude);
    } else {
        return rndNum;
    }
};

const renderListItem = (value, numOfRound) => (
<View key={value} style={styles.listItem}>
<BodyText>#{numOfRound}</BodyText>
<BodyText>{value}</BodyText>
</View>);

 const StartGame = props => {
    const initialGuess = generateRandomBetween(1, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);

    const [pastGuesses, setPastGuesses] = useState([initialGuess]);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameOver } = props;   

    useEffect(() => {
        if (currentGuess === userChoice){
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver]);

    const nextGuessHandler = direction => {
       if (
        (direction === 'lower' && currentGuess < props.userChoice) || 
        (direction === 'greater' && currentGuess > props.userChoice)
        ){
           Alert.alert('Don\'t lie!', 'You know that this is wrong...', [ 
           {text: 'Sorry!', style: 'cancel', }
        ]); 
            return;
            }   
            if (direction === 'lower') {
              currentHigh.current = currentGuess;
              }
              else {
              currentLow.current = currentGuess + 1;
            }

            const nextNumber = generateRandomBetween(
            currentLow.current, 
            currentHigh.current, 
            currentGuess
            ); 
            setCurrentGuess(nextNumber);
            //setRounds(curRounds => curRounds + 1); 
            setPastGuesses(curPastGuesses => [nextNumber, ...curPastGuesses] );
        };

    return (
        <View style={styles.screen}>
            <BodyText>Opponent's Guess</BodyText>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                    <Ionicons name ="md-remove" size={24} color="white"/>
                </MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
                    <Ionicons name ="md-add" size={24} color="white"/>
                </MainButton>
            </Card>
            <View style={styles.listContainer}>
            <ScrollView contentContainerStyle={styles.list}> 
                {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
            </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create ({
    screen: { 
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
        width: 400,
        maxWidth: '90%',
    },
    listItem: {
       borderColor: 'crimson',
       borderWidth: 1,
       padding: 15,
       marginVertical: 10,
       backgroundColor: 'white',
       flexDirection: 'row', 
       justifyContent: 'space-between',
       width: '60%'
    },
    listContainer: {
        width: '80%',
        flex: 1  // take all the available space
    },
    list:{
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-end' //grow in space especially on scrollable
    }
    
});

export default StartGame;