import React, { useState, useEffect } from 'react';
import { StyleSheet, View, StatusBar, FlatList, Text, Image, TouchableOpacity } from 'react-native';
import TrackPlayer, { usePlaybackState } from "react-native-track-player";
import Player from "../Play_Progress";
import localTrack from "../../assets/pure.m4a";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native';
const QuizAudio = ({quiz}) => {
    const [bgColor, setBgColor] = useState(false)
    const playbackState = usePlaybackState();
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
        setup()
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

    async function setup() {
        await TrackPlayer.setupPlayer({});
        await TrackPlayer.updateOptions({
            stopWithApp: true,
            capabilities: [
                TrackPlayer.CAPABILITY_PLAY,
                TrackPlayer.CAPABILITY_PAUSE,
                TrackPlayer.CAPABILITY_STOP
            ],
            compactCapabilities: [
                TrackPlayer.CAPABILITY_PLAY,
                TrackPlayer.CAPABILITY_PAUSE
            ]
        });
    }

    async function togglePlayback() {
        const currentTrack = await TrackPlayer.getCurrentTrack();
        if (currentTrack == null) {
            await TrackPlayer.reset();
            await TrackPlayer.add({
                id: "local-track",
                url: localTrack,
            });
            await TrackPlayer.play();
        } else {
            if (playbackState === TrackPlayer.STATE_PAUSED) {
                await TrackPlayer.play();
            } else {
                await TrackPlayer.pause();
            }
        }
    }
    return (
        <View style={styles.screenContainer}>
            <View style={styles.boxQuestion} >
                <View style={{ marginLeft: 50, marginRight: 30,flexDirection:"row",height:20 }}>
                    {/* <Text style={styles.question}>{currentQuestion?.preQuestion}: </Text> */}
                    <Player
                        style={styles.player}
                        onTogglePlayback={togglePlayback}
                    />
                </View>
            </View>
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
            
        </View>
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
        padding:8,
    },
    active: {
        flexDirection: "row",
        marginLeft: 50,
        marginRight: 50,
        marginTop: 30,
        marginBottom: 10,
        backgroundColor:"#1DA1F2",
        padding:5,
        borderRadius:5
    },
    // Đáp án đúng
    answerCorrect: {
        flexDirection: "row",
        marginLeft: 20,
        marginRight: 50,
        backgroundColor:"#1DA1F2",
        padding:5,
        borderRadius:5,
        marginTop: 30,
        marginBottom: 10,
    },
    // Đáp án sai
    answerWrong: {
        flexDirection: "row",
        marginLeft: 20,
        marginRight: 50,
        backgroundColor:"#E63946",
        padding:5,
        borderRadius:5,
        marginTop: 30,
        marginBottom: 10,

    },
    boxAnswer: {
        flex:1
    },
    boxNumber: {
        backgroundColor: "#fff",
        borderRadius: 50,
        paddingTop: 6,
        paddingLeft: 10,
        width: 50,
        height: 50,
        marginLeft:8
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
        marginTop: 10
    },
    question: {
        fontSize: 28,
        color: "#fff",
        marginTop: 25,
        fontWeight: 'bold',
        marginRight:30
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
        marginTop: 80,
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

export default QuizAudio;