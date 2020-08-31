import React, {useState} from 'react'
// useState is creating a state variables in functional components
import 
{ 
    View, 
    Text, 
    StyleSheet, 
    Button,  
    Keyboard, 
    TouchableWithoutFeedback,
    Alert,
    ScrollView,
    KeyboardAvoidingView
}   from 'react-native';

import Card from '../components/Card';
import Colors from '../constants/colors';
import Input from '../components/Input';
import BodyText from '../components/BodyText';
import NumberContainer from '../components/NumberContainer';
import MainButton from '../components/MainButton';

const StartGameScreen = props => {
    const [enteredValue, setEnteredValue] = useState('');
    // has the user confirmed yet
    const [confirmed, setConfirmed] = useState(false); 
    const [selectedNumber, setSelectedNumber] = useState ('');

        // this const is to make input section to accept 0-9 only
    const numberInputHandler = InputText => {
        setEnteredValue(InputText.replace(/[^0-9]/g, ''));
        // /[^0-9]/g it means you can only enter 0-9, g means globally
    };
    // this is to make button 'reset' work
    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    };
    // this is to make button 'confirm' to work and promt user to make sure
    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        //Nan = Not a number 
        if ( isNaN(chosenNumber) ||chosenNumber <= 0 || chosenNumber > 99) 
            {
            Alert.alert(
                'invalid number!', 
                'Number has to be a number between 1 and 99.', 
            [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }]
            );
            return;
        }
        setConfirmed(true);
        setSelectedNumber(chosenNumber);
        setEnteredValue (''); // reset and save  
        Keyboard.dismiss();   
    };
        let confirmedOutput;

        if (confirmed) {
        confirmedOutput = (
        <Card style={styles.summaryContainer}>
            <BodyText>You selected</BodyText>
            <NumberContainer>{selectedNumber}</NumberContainer>
            <MainButton onPress={() => props.onStartGame(selectedNumber)} >
               Start Game
            </MainButton> 
        </Card>
        );
        }

    return (
     <ScrollView>   
      <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={30}> 
       <TouchableWithoutFeedback 
       onPress={() => {
           Keyboard.dismiss();
       }}> 
        <View style={styles.screen}>
            <Text style={styles.title}>Start a New Game!</Text>  
            <Card style={styles.inputContainer}>
                <Text style={styles.tex}>Select a Number</Text>
                <Input
                 style={styles.input} 
                 blurOnSubmit autoCapitalize='none' 
                 autoCorrect={false} 
                 keyboardType='number-pad' 
                 maxLength={2} 
                 onChangeText = {numberInputHandler} // onChangeText point to numberInputHandler
                 value= {enteredValue}
                 />
                    <View style={styles.buttonContainer}> 
                        <View style={styles.button}>
                         <Button title = 'Reset' onPress={ resetInputHandler } color={Colors.accent}/> 
                        </View>
                        <View style={styles.button}>
                         <Button title = 'Confirm' onPress={confirmInputHandler} color={Colors.primary}/> 
                        </View>
                    </View>
            </Card>
            {confirmedOutput}
        </View>
        </TouchableWithoutFeedback> 
       </KeyboardAvoidingView>
     </ScrollView>   
    )
};

const styles=StyleSheet.create({
screen: {
    flex: 1,
    padding: 10, // space around
    alignItems: 'center', // horizontal
    },
     title: {
         fontSize: 20,
         marginVertical: 10, //spacing on vertical axis
         color: 'green',
         fontFamily: 'open-sans-bold',
     },
     inputContainer: {
         width: '80%', //pixels
         maxWidth: '95%', // so it does not overflow
         minWidth: 300,//to automatically adjust on any screen
         //maxWidth: '80%', // responsive on size of device
         alignItems: 'center', // cross axis
         // shadow ios
         //shadowColor: 'black', // around the buttons  
         //shadowOffset: {width:0, height: 2},//an object, offset for your container 
         //shadowRadius: 6, // how sharp a shadow, sharp or blurry
         //shadowOpacity: 0.26, // transparent 
         //backgroundColor: 'white', // always be white even if you change background
         // elevation only on android
         //elevation: 5,
         //padding: 20, // seperates from text
         //borderRadius: 10 // rounded borders
         },
     buttonContainer: {
         flexDirection: 'row', //default is column
         width: '100%',
         justifyContent: "space-between", //postion buttons
         paddingHorizontal: 15, //to the left and right for button space    
    }, 
    button: {
        width: 110,
        // you can also use width: dimensions.get('window').width / 4 - for android 
    },
    tex:{
        color: 'green',
        fontSize: 18,
        fontFamily: 'open-sans',
    },
    input: {
        width: 50,
        textAlign: 'center'
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center',
    },

});

export default StartGameScreen;

// <KeyboardAvoidingView:
// position for ios 
// padding for android
// dimension- automatically updates your code when dimensions change
// listeners- whenever you need re-calculated dimensions and your dimensions can change
// dimensions api - most important api on RN width and height
// you can import from expo
// import {ScreenOrientation} from 'expo'; to lock
