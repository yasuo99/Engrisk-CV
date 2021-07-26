import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Keyboard, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import FontAwesome from "react-native-vector-icons/FontAwesome";
const QuizInput = ({question, submitAnswer, isLastQuestion}) => {
    const [answer,setAnswer] = useState('')
    useEffect(() => {
       setAnswer('')
    }, [question]);
    useEffect(() => {
        if(isLastQuestion){
            setAnswer('')
        }
    },[isLastQuestion])
    return (
        <View style={styles.screenContainer}>
            <View style={styles.boxQuestion}>
                <ScrollView>
                <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16, color: "#1DA1F2" }}>{question.preQuestion.replace(/(<([^>]+)>)/gi, "")}</Text>
                <Text style={styles.question}>{question.content.replace(/(<([^>]+)>)/gi, "")}</Text>
                </ScrollView>
            </View>
            <View style={styles.kengang}></View>
            <Text style={{fontSize:24,color:"#fff", marginLeft:30, marginTop:20}}>ĐÁP ÁN:</Text>
            <TextInput
                style={styles.input}
                placeholder='Nhập câu trả lời...'
                value={answer}
                onChangeText={(val) => setAnswer(val)}
                onSubmitEditing={() => {Keyboard.dismiss; submitAnswer(answer)}}
            />
            {/* <Text style={styles.status}>{keyboardStatus}</Text> */}
        </View>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: '#15202B'
    },

    boxQuestion: {
        marginLeft: 30,
        marginTop: 50,
        height:140
    },
    question: {
        fontSize: 28,
        color: "#fff",
        height:100
    },
    textQuestion: {
        marginLeft: 10,
        fontSize: 24,
        fontWeight: 'bold',
        color: "#15202B",
        padding: 5,
    },
    titleQuestion: {
        fontSize: 38,
        color: "#fff",
        fontWeight: 'bold'
    },
    timeQuestion: {
        fontSize: 18,
        color: "#fff",
        marginTop: 5
    },
    numberQuestion: {
        fontSize: 18,
        color: "#fff",
        marginTop: 5
    },
    kengang: {
        width: '90%',
        borderBottomColor: '#ededed',
        borderBottomWidth: 1,
        marginTop: 20,
        marginLeft: 30,
    },
    input: {
        marginLeft:30,
        marginRight:30,
        marginTop:20,
        padding: 10,
        borderWidth: 0.5,
        borderRadius: 20,
        borderColor:"#fff",
        height:60,
        backgroundColor:"#fff",
        fontSize:21,
        color:"#333"
      },
      status: {
        padding: 10,
        textAlign: "center"
      }
});

export default QuizInput;