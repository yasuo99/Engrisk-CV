import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { BaseApiUrl } from '../../constants/api';
const QuizImage = ({quiz}) => {
    const [bgColor, setBgColor] = useState(false)
    const [answers, setAnswers] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState({
        answers: []
    })
    const [isBusy, setIsBusy] = useState(true);
    useEffect(() => {
        setQuestions(quiz)
        setCurrentQuestion(quiz)
        setIsBusy(false)
    }, [quiz])
    const selectAnswer = (answer,index) => {
        var result = currentQuestion?.answers.find(ans => ans == answer);
        const answerData = {
            question: currentQuestion,
            answer: answer,
            result: result.isQuestionAnswer,
            index: index
        }
        console.log(answerData);
        setAnswers([...answers, answerData])
    }
    return (
        <View style={styles.screenContainer}>
             {!isBusy &&  <View style={styles.boxQuestion} >
                <Text style={styles.question}>{currentQuestion?.preQuestion}: {currentQuestion?.content}</Text>

            </View>}
            <View style={styles.kengang}></View>
            <View style={styles.boxAnswer} >
            {!isBusy && 
            <FlatList
            data={currentQuestion?.answers}
            numColumns={2}
            renderItem={({item, index})=>(
                <TouchableOpacity disabled={answers.some(ans => ans.question == currentQuestion)} key={index} onPress={() => selectAnswer(item,index)} style={answers.find(ans => ans.answer == item) != undefined ? answers.find(ans => ans.answer == item).result && answers.find(ans => ans.answer == item).index == index ? styles.answerCorrect : styles.answerWrong : styles.answer}>
                <Image source={item.photoUrl} style={{width:70,height:70}}></Image>
                <ScrollView>
                    <Text style={styles.contentAnswer}>{item.answer}</Text>
                </ScrollView>
            </TouchableOpacity>
            )}>

            </FlatList>
        }
              </View>
        </View>
    );
};
const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: '#15202B'
    },
    answer: {
        alignItems:"center",
        marginLeft: 35,
        marginRight: 20,
        marginTop: 30,
        marginBottom: 30,
        backgroundColor: "#fff",
        width:180,
        height:150,
        borderRadius:10,
        paddingTop:20
    },
    // Đáp án được chọn
    active: {
        alignItems:"center",
        marginLeft: 35,
        marginRight: 20,
        marginTop: 30,
        marginBottom: 30,
        width:180,
        height:150,
        borderRadius:10,
        paddingTop:20,
        backgroundColor: "#1DA1F2",
    },
     // Đáp án đúng
    answerCorrect: {
        alignItems:"center",
        marginLeft: 35,
        marginRight: 20,
        marginTop: 30,
        marginBottom: 30,
        width:180,
        height:150,
        borderRadius:10,
        paddingTop:20,
        backgroundColor: "#1DA1F2",
    },
    // Đáp án sai
    answerWrong: {
        alignItems:"center",
        marginLeft: 35,
        marginRight: 20,
        marginTop: 30,
        marginBottom: 30,
        width:180,
        height:150,
        borderRadius:10,
        paddingTop:20,
        backgroundColor: "#E63946",
    },
    boxAnswer: {
        flex:1
    },
    contentAnswer: {
        marginTop: 10,
        fontSize: 28,
        color: "#fff",
        fontWeight: 'bold',
        color:'#15202B'
    },
    boxQuestion: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
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
    question: {
        fontSize: 28,
        color: "#fff",
        margin: 20,
        fontWeight: 'bold'
    },
    kengang: {
        width: '90%',
        borderBottomColor: '#ededed',
        borderBottomWidth: 1,
        marginLeft: 30,
    },
});

export default QuizImage;