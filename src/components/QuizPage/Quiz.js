import React, { useEffect, useState } from 'react';
import { StyleSheet, View, StatusBar, FlatList, Text, Image, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';
const Quiz = ({quiz}) => {
    const [bgColor, setBgColor] = useState(false)
    const [answers, setAnswers] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState({
        answers: []
    })
    const [isBusy, setIsBusy] = useState(true);
    // console.log(quiz);
    useEffect(() => {
        // if(Object.keys(quiz).length > 0){
        //     setQuestions(quiz?.questions);
        //     setCurrentQuestion(quiz.questions[index])
        //     setIsBusy(false)
        // }
        console.log(quiz)
        setQuestions(quiz)
        setCurrentQuestion(quiz)
        setIsBusy(false)
    }, [quiz])
    
    // useEffect(() => {
    //     setCurrentQuestion(questions[index]);
    // }, [index])
    // const selectIndex = (index) => {
    //     setIndex(index);
    // }
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
        
        <ScrollView style={styles.screenContainer}>
            {!isBusy &&  <View style={styles.boxQuestion} >
                <Text style={styles.question}>{currentQuestion?.preQuestion}: {currentQuestion?.content}</Text>

            </View>}
           
            <View style={styles.kengang}></View>
            <View style={styles.boxAnswer} >
                {!isBusy && <ScrollView>
                    {currentQuestion?.answers.map((answer, index) =>
                        <TouchableOpacity disabled={answers.some(ans => ans.question == currentQuestion)} key={index} onPress={() => selectAnswer(answer,index)} style={answers.find(ans => ans.answer == answer) != undefined ? answers.find(ans => ans.answer == answer).result && answers.find(ans => ans.answer == answer).index == index ? styles.answerCorrect : styles.answerWrong : styles.answer}>
                            {answers.find(ans => ans.answer == answer) != undefined && <FontAwesome
                                name={answers.find(ans => ans.answer == answer).result ? 'check' : 'remove'}
                                color="#ffffff"
                                size={32}
                                style={answers.find(ans => ans.answer == answer).result ? styles.check : styles.remove}
                            />
                            }
                            <View style={styles.boxNumber}>
                                <Text style={styles.titleNumber}>{index = index + 1}</Text>
                            </View>
                            <View>
                                <Text style={styles.contentAnswer}>{answer.answer}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                </ScrollView>}
                
            </View>
            
        </ScrollView>
        
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: '#15202B'
    },
    answer: {
        flexDirection: "row",
        marginLeft: 50,
        marginRight: 50,
        marginTop: 30,
        marginBottom: 10,
        padding: 8,
    },
    active: {
        flexDirection: "row",
        marginLeft: 50,
        marginRight: 50,
        marginTop: 30,
        marginBottom: 10,
        backgroundColor: "#1DA1F2",
        padding: 5,
        borderRadius: 5
    },
    // Đáp án đúng
    answerCorrect: {
        flexDirection: "row",
        marginLeft: 20,
        marginRight: 50,
        backgroundColor: "#1DA1F2",
        padding: 5,
        borderRadius: 5,
        marginTop: 30,
        marginBottom: 10,
    },
    // Đáp án sai
    answerWrong: {
        flexDirection: "row",
        marginLeft: 20,
        marginRight: 50,
        backgroundColor: "#E63946",
        padding: 5,
        borderRadius: 5,
        marginTop: 30,
        marginBottom: 10,

    },
    boxAnswer: {
        flex: 1
    },
    boxNumber: {
        backgroundColor: "#fff",
        borderRadius: 50,
        paddingTop: 6,
        paddingLeft: 10,
        width: 50,
        height: 50,
        marginLeft: 8
    },
    titleNumber: {
        color: "#15202B",
        fontSize: 28,
        marginLeft: 6,
        fontWeight: 'bold'
    },
    contentAnswer: {
        marginLeft: 16,
        marginTop: 10,
        fontSize: 24,
        color: "#fff",
        fontWeight: 'bold'
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
        fontWeight: 'bold',
    },
    kengang: {
        width: '90%',
        borderBottomColor: '#ededed',
        borderBottomWidth: 1,
        marginLeft: 30,
    },
    check : {
        paddingTop:8,
    },
    remove : {
        paddingTop:8,
        paddingRight:8
    }
});

export default Quiz;