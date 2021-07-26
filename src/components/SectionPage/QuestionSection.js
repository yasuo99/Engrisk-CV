import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    StatusBar,
    FlatList,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    TextInput
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MenuDrawer from 'react-native-side-drawer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TrackPlayer, { reset, usePlaybackState } from "react-native-track-player";
import Player from "../PlayQuizSort";
import localTrack from "../../assets/pure.m4a";
import Modal from 'react-native-modal';
import QuestionActions from '../../redux/actions/questions';
import { QuestionTypes } from '../../constants/QuestionTypes';
import QuizSort from '../QuizPage/QuizSort';
import QuizInput from '../QuizPage/QuizInput';
import QuizMatchWord from '../QuizPage/QuizMatchWord';
const QuestionSection = ({ navigation, question, nextIndex, addRemainQuestion, removeRemainQuestion, isLastQuestion, isFinish, routeId }) => {
    const [bgColor, setBgColor] = useState(false)
    const [bgColorTwo, setBgColorTwo] = useState(false)
    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalVisibleTwo, setModalVisibleTwo] = useState(false);
    const playbackState = usePlaybackState();
    const [bgColorNext, setBgColorNext] = useState(false)
    const [result, setResult] = useState(null);
    const [isChecked, setIsChecked] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState('')
    const [isOdd,setIsOdd] = useState(false);
    useEffect(() => {
        setModalVisible(false);
        setIsOdd(question?.answers?.length % 2 != 0)
    }, [question])
    useEffect(() => {
        if(isLastQuestion){
            setModalVisible(false);
        }
    },[isLastQuestion])
    function reset() {
        setIsChecked(false);
        setResult(null);
        setSelectedAnswer('')
    }
    useEffect(() => {
        if (isLastQuestion) {
            setIsChecked(false);
            setResult(null);
            setSelectedAnswer('')
            setModalVisible(false);
        }
    }, [isLastQuestion])
    const next = () => {
        setBgColorNext(!bgColorNext);
    }
    const checkAnswer = async (answer) => {
        setSelectedAnswer(answer)
        setModalVisible(!isModalVisible)
        const data = await QuestionActions.checkAnswer(question.id, answer);
        setResult(data.result.result)
        setIsChecked(true);
        if (!data.result.result) {
            addRemainQuestion(question);
        }
    }
    const checkAnswerWrong = () => {
        setBgColorTwo(!bgColorTwo);
        setModalVisibleTwo(!isModalVisibleTwo)
    }
    useEffect(() => {
        setup();
    }, []);
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
            {
                console.log(question)
            }
            <StatusBar barStyle="light-content" />
            {question?.type == QuestionTypes.BASIC && <View style={{ margin: 30 }}>
                <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16, color: "#1DA1F2" }}>{question?.preQuestion.replace(/(<([^>]+)>)/gi, "")}</Text>
               
                <View>
                {
                    question?.photoUrl &&  <Image source={{uri : `${ question.photoUrl.replace('http://localhost:5000/','http://10.0.3.2:5000/')}`}} style={{ width: "100%", height: 150 }}></Image>
                }
                </View>
                <View style={{ alignItems: "center", backgroundColor: "#1DA1F2", borderRadius: 40 }}>
                    {question?.audio &&  <Player
                       onTogglePlayback={
                        async () => {
                            await TrackPlayer.reset();
                            await TrackPlayer.add({
                              id: 1, 
                              url:`${ question.audio.replace('http://localhost:5000/','http://10.0.3.2:5000/')}`
                              // url: localTrack
                            });
                            await TrackPlayer.play();
                        }
                      }
                    />}
                </View>
                <ScrollView style={{ height: 500 }}>
                    <View>
                        <Text style={{ fontSize: 32, fontWeight: "bold", marginTop: 20, color: "#fff" }}>{question?.content.replace(/(<([^>]+)>)/gi, "")}</Text>

                    </View>
                    {/* ĐÁP ÁN LẺ */}
                    {/* <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity onPress={checkAnswer} style={bgColor === false ? styles.answer : styles.answerCorrect}>
                            <Text style={{ fontSize: 21, color: "#fff" }}>Đúng</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity onPress={checkAnswerWrong} style={bgColorTwo === false ? styles.answer : styles.answerWrong}>
                            <Text style={{ fontSize: 21, color: "#fff" }}>Sai</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity onPress={checkAnswerWrong} style={bgColorTwo === false ? styles.answer : styles.answerWrong}>
                            <Text style={{ fontSize: 21, color: "#fff" }}>Sai</Text>
                        </TouchableOpacity>
                    </View> */}
                    {/* ĐÁP ÁN CHẴN */}
                    <View style={{ flexDirection: `${!isOdd ? 'row' : 'column'}` }}>
                        {question?.answers.map((answer, index) =>
                           <TouchableOpacity key={index} onPress={() => checkAnswer(answer.answer)} style={!isChecked ? (isOdd ? styles.answer : styles.answerTwo) : (selectedAnswer == answer.answer ? result ? (isOdd ? styles.answerCorrect : styles.answerCorrectTwo) : (isOdd ? styles.answerWrong : styles.answerWrongTwo) : (isOdd ? styles.answer : styles.answerTwo))}>
                                <Text style={{ fontSize: 21, color: "#fff" }}>{answer.answer}</Text>
                            </TouchableOpacity> 
                        )}
                    </View>
                </ScrollView>
            </View>}
            {question?.type == QuestionTypes.ARRANGE && <QuizSort question={question} isLastQuestion={isLastQuestion} submitAnswer={checkAnswer}></QuizSort>}
            {question?.type == QuestionTypes.FILLOUT && <QuizInput question={question} submitAnswer={checkAnswer} isLastQuestion={isLastQuestion}></QuizInput>}
            {question?.type == QuestionTypes.CONNECTION && <QuizMatchWord question={question} submitAnswer={checkAnswer} isLastQuestion={isLastQuestion}></QuizMatchWord>}
            <Modal isVisible={isModalVisible} backdropOpacity={0} deviceWidth={100} swipeDirection={'down'} onSwipeComplete={() => console.log('Tắt rồi nè')} onModalHide={() => reset()}
                style={styles.view}>
                <View style={styles.modal}>
                    <View style={{ flexDirection: "row" }}>
                        <MaterialIcons
                            name="check-circle"
                            size={32}
                            color="#1DA1F2"
                            style={{ marginLeft: 16 }}></MaterialIcons>
                        {result ? <Text style={{ color: "#1DA1F2", fontSize: 24, fontWeight: "bold", marginLeft: 10 }}>Chính xác</Text> : <Text style={{ color: "#E63946", fontSize: 24, fontWeight: "bold", marginLeft: 10 }}>Không chính xác</Text>
                        }
                    </View>
                    <View style={styles.viewNext}>
                        <TouchableOpacity onPress={() => { if (!isFinish) { nextIndex() } else { navigation.navigate('Finish', { routeId: routeId }) } }} style={result ? styles.nextActive : styles.next}>
                            <Text style={{ color: "#fff", fontSize: 24, fontWeight: "bold" }}> {!isFinish ? 'Tiếp theo' : 'Kết thúc'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: '#15202B',
    },
    boxQuestion: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    },
    buttonExit: {
        marginTop: 8,
        marginLeft: 10,
    },
    exit: {
        flexDirection: 'row',
        borderRadius: 10,
        width: 80,
        height: 40,
        paddingTop: 5,
        paddingLeft: 5,
    },
    textExit: {
        paddingTop: 5,
        fontSize: 16,
    },
    view: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modal: {
        marginBottom: 70,
        color: "#fff",
        backgroundColor: "#fff",
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    next: {
        width: 420,
        marginTop: 16,
        padding: 16,
        alignItems: "center",
        backgroundColor: "#999",
        borderRadius: 10,
    },
    nextActive: {
        width: 420,
        marginTop: 16,
        padding: 16,
        backgroundColor: "#1DA1F2",
        padding: 16,
        alignItems: "center",
        borderRadius: 10
    },
    viewNext: {
        justifyContent: "flex-end",
        alignItems: "center",

    },
    // ĐÁP ÁN CHẲN
    answerTwo: {
        width: 180,
        marginLeft: 20,
        marginTop: 30,
        padding: 16,
        alignItems: "center",
        backgroundColor: "#999",
        borderRadius: 10
    },
    // Đáp án đúng
    answerCorrectTwo: {
        width: 180,
        marginLeft: 20,
        marginTop: 30,
        padding: 16,
        backgroundColor: "#1DA1F2",
        padding: 16,
        alignItems: "center",
        borderRadius: 10
    },
    // Đáp án sai
    answerWrongTwo: {
        width: 180,
        marginLeft: 20,
        marginTop: 30,
        padding: 16,
        backgroundColor: "#E63946",
        padding: 16,
        alignItems: "center",
        borderRadius: 10
    },

    // ĐÁP ÁN LẺ
    answer: {
        width: 420,
        marginTop: 30,
        padding: 16,
        alignItems: "center",
        backgroundColor: "#999",
        borderRadius: 10
    },
    // Đáp án đúng
    answerCorrect: {
        width: 420,
        marginTop: 30,
        padding: 16,
        backgroundColor: "#1DA1F2",
        padding: 16,
        alignItems: "center",
        borderRadius: 10
    },
    // Đáp án sai
    answerWrong: {
        width: 420,
        marginTop: 30,
        padding: 16,
        backgroundColor: "#E63946",
        padding: 16,
        alignItems: "center",
        borderRadius: 10
    }
});

export default QuestionSection;
