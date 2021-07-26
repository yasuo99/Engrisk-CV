import React, { useEffect, useState } from 'react';
import { StyleSheet, View, StatusBar, FlatList, Text, Image, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import Quiz from '../components/QuizPage/Quiz';
import QuizAudio from '../components/QuizPage/QuizAudio'
import QuizImage from '../components/QuizPage/QuizImage'
import QuizMatchWord from '../components/QuizPage/QuizMatchWord'
import QuizSort from '../components/QuizPage/QuizSort'
import QuizSelect from '../components/QuizPage/QuizSelect'
import QuizInput from '../components/QuizPage/QuizInput'
import QuizConversation from '../components/QuizPage/QuizConversation'
import Section from '../components/SectionPage/Section'
import QuestionSection from '../components/SectionPage/QuestionSection'
import MenuDrawer from 'react-native-side-drawer'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import QuizActions from '../redux/actions/quiz';
import { set } from 'lodash';
import { QuestionTypes } from '../constants/QuestionTypes';
const QuizScreen = ({ route, navigation }) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [currentQuestion, setCurrentQuestion] = useState({});
    const [index, setIndex] = useState(1)
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const [open, setOpen] = useState(false)
    const [quiz, setQuiz] = useState({
        questions: [],
    })
    const [checkAudio, setCheckAudio] = useState(null)
    const [checkImage, setCheckImage] = useState(null)
    const [isLastQuestion, setIsLastQuestion] = useState(false);
    const [remainQuestion, setRemainQuestion] = useState([])
    const [isFinish, setIsFinish] = useState(false);
    const { quizId } = route.params

    useEffect(() => {
        async function fetchQuizData() {
            try {
                const quizData = await QuizActions.doQuiz(quizId);
                setQuiz(quizData.quiz)
                setCheckAudio(quizData.quiz.questions[currentQuestionIndex].audio)
                setCheckImage(quizData.quiz.questions[currentQuestionIndex].photoUrl)
                setCurrentQuestion(quizData.quiz.questions[currentQuestionIndex]);
            } catch (error) {
                console.log(error);
            }
        }
        if (quizId) {
            fetchQuizData();
        }
    }, [quizId])
    useEffect(() => {
        setCurrentQuestion(quiz.questions[currentQuestionIndex])
        if(currentQuestionIndex == quiz.questions.length - 1){
            setIsLastQuestion(true);
        }
    }, [currentQuestionIndex])
    useEffect(() => {
        if (remainQuestion.length > 0) {
            setQuiz({
                ...quiz,
                questions: [...quiz.questions, ...remainQuestion]
            })
            setRemainQuestion([])
            setIsLastQuestion(false);
        }
    }, [remainQuestion.length])
    function addRemainQuestion(question) {
        setRemainQuestion([...remainQuestion, question])
    }
    const toggleOpen = () => {
        setOpen(!open);
    };
    const drawerContent = () => {
        return (
            <TouchableOpacity onPress={toggleOpen} style={styles.animatedBox}>
                <FontAwesome
                    name="bars"
                    color="#ffffff"
                    size={32}
                // style={{ marginLeft: 10, marginTop: 10, paddingTop: 5 }}
                />
                <TouchableOpacity style={{ flexDirection: "row", marginTop: "40%" }} onPress={() => { navigation.navigate('Home'), setOpen(!open) }}>
                    <MaterialIcons
                        name="home"
                        size={32}
                        color="#ffffff"
                        style={{ marginLeft: 16 }}></MaterialIcons>
                    <Text style={{ fontSize: 21, color: "#fff", paddingLeft: 16 }}>Trang chủ</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: "row", marginTop: 36 }} onPress={() => { navigation.navigate('ListSection'), setOpen(!open) }}>
                    <MaterialIcons
                        name="ballot"
                        size={32}
                        color="#ffffff"
                        style={{ marginLeft: 16 }}></MaterialIcons>
                    <Text style={{ fontSize: 21, color: "#fff", paddingLeft: 16 }}>Section</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: "row", marginTop: 36 }} onPress={() => { navigation.navigate('ListExam'), setOpen(!open) }}>
                    <MaterialIcons
                        name="rule"
                        size={32}
                        color="#ffffff"
                        style={{ marginLeft: 16 }}></MaterialIcons>
                    <Text style={{ fontSize: 21, color: "#fff", paddingLeft: 16 }}>Quiz</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: "row", marginTop: 36 }} onPress={() => { navigation.navigate('ListFlashCard'), setOpen(!open) }}>
                    <MaterialIcons
                        name="book"
                        size={32}
                        color="#ffffff"
                        style={{ marginLeft: 16 }}></MaterialIcons>
                    <Text style={{ fontSize: 21, color: "#fff", paddingLeft: 16 }}>Flash card</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: "row", marginTop: 36 }} onPress={() => { navigation.navigate('Message'), setOpen(!open) }}>
                    <MaterialIcons
                        name="chat"
                        size={32}
                        color="#ffffff"
                        style={{ marginLeft: 16 }}></MaterialIcons>
                    <Text style={{ fontSize: 21, color: "#fff", paddingLeft: 16 }}>Tin nhắn</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: "row", marginTop: 36 }} onPress={() => { navigation.navigate('Calender'), setOpen(!open) }}>
                    <MaterialIcons
                        name="today"
                        size={32}
                        color="#ffffff"
                        style={{ marginLeft: 16 }}></MaterialIcons>
                    <Text style={{ fontSize: 21, color: "#fff", paddingLeft: 16 }}>Lịch</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: "row", marginTop: 36 }} onPress={() => { navigation.navigate('Notification'), setOpen(!open) }}>
                    <MaterialIcons
                        name="notifications"
                        size={32}
                        color="#ffffff"
                        style={{ marginLeft: 16 }}></MaterialIcons>
                    <Text style={{ fontSize: 21, color: "#fff", paddingLeft: 16 }}>Thông báo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: "row", marginTop: "100%" }}>
                    <MaterialIcons
                        name="logout"
                        size={32}
                        color="#ffffff"
                        style={{ marginLeft: 16 }}></MaterialIcons>
                    <Text style={{ fontSize: 21, color: "#fff", paddingLeft: 16 }}>Đăng xuất</Text>
                </TouchableOpacity>
            </TouchableOpacity>
        );
    };
    const nextQuestion = () => {
        if (currentQuestionIndex < quiz.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1)
            setIndex(index + 1)
        } else {
            setIsFinish(true);
        }
    }
    const skipQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1)
            setIndex(index - 1)
        }

    }
    const selectQuestion = (number) => {
        setIndex(number)
        setCheckAudio(quiz.questions[number - 1].audio)
        setCheckImage(quiz.questions[number - 1].photoUrl)
        setCurrentQuestionIndex(number = number - 1)
    }
    console.log(quiz.questions.length);
    return (
        <View style={styles.screenContainer}>
            <StatusBar barStyle="light-content" />

            <View style={{ flexDirection: "row" }}>
                <MenuDrawer
                    open={open}
                    drawerContent={drawerContent()}
                    drawerPercentage={45}
                    animationTime={250}
                    overlay={true}
                    opacity={0.4}
                >
                </MenuDrawer>
                <TouchableOpacity onPress={toggleOpen}>
                    <FontAwesome
                        name="bars"
                        color="#ffffff"
                        size={32}
                        style={{ marginLeft: 10, marginTop: 10, paddingTop: 5 }}
                    />
                </TouchableOpacity>
                <View >
                    <Text style={{ fontWeight: 'bold', fontSize: 42, color: '#ffffff', marginLeft: '35%' }}>ENGRISK</Text>
                </View>
                <View style={styles.buttonExit}>
                    <TouchableOpacity
                        style={styles.exit}
                        onPress={() => navigation.navigate('Home')}
                    >
                        <LinearGradient
                            colors={['#1DA1F2', '#1DA1F2']}
                            style={styles.exit}
                        >
                            <Text style={[styles.textExit, {
                                color: '#fff'
                            }]}>Thoát</Text>
                            <FontAwesome
                                name="sign-out"
                                color="#ffffff"
                                size={32}
                                style={{ marginLeft: 5, }}
                            />
                        </LinearGradient>

                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ justifyContent: "center", alignItems: "center", marginTop: 20 }}>
                <Text style={styles.titleQuestion}>{quiz.quizName}</Text>
                {/* <Text style={styles.timeQuestion}>Thời gian còn lại: 00:10:30</Text> */}
                <Text style={styles.numberQuestion}>Số câu đã chọn : {index} /{quiz.questions.length}</Text>
            </View>
            {/* {
                checkAudio !== null ?
                <QuizAudio quiz={quiz.questions[currentQuestionIndex]}></QuizAudio> :
                (checkImage !== null ?
                <QuizImage quiz={quiz.questions[currentQuestionIndex]}></QuizImage> :
                <Quiz quiz={quiz.questions[currentQuestionIndex]}></Quiz>)
            } */}
            {/* <QuizSelect></QuizSelect> */}
            <QuestionSection question={currentQuestion} navigation={navigation} nextIndex={nextQuestion} addRemainQuestion={addRemainQuestion} isLastQuestion={isLastQuestion} isFinish={isFinish}></QuestionSection>
            {/* <QuizConversation></QuizConversation> */}
            {/* <Quiz quiz={quiz.questions[currentQuestionIndex]}></Quiz> */}
            {/* <View style={styles.changeQuestion}>
                <TouchableOpacity onPress={() => { skipQuestion() }}>
                    <FontAwesome
                        name="chevron-left"
                        color="#ffffff"
                        size={24}
                        style={{ marginLeft: 10, marginTop: 10, paddingTop: 5 }}
                    />
                </TouchableOpacity>
                <View style={{ width: 420, alignItems: "center" }}>
                    <Text style={{ fontSize: 18, color: "#fff", fontWeight: "bold", marginTop: 8 }} onPress={toggleModal}>Câu {index} /{quiz.questions.length}</Text>
                </View>
                <TouchableOpacity onPress={() => { nextQuestion() }}>
                    <FontAwesome
                        name="chevron-right"
                        color="#ffffff"
                        size={24}
                        style={{ marginLeft: 10, marginTop: 10, paddingTop: 5 }}
                    />
                </TouchableOpacity>
            </View>
            <Modal isVisible={isModalVisible} backdropOpacity={0} deviceWidth={100} swipeDirection={'down'} style={styles.view}>
                <View style={styles.modal}>
                    <View style={styles.headerModal}>
                        <TouchableOpacity onPress={() => { skipQuestion() }}>
                            <FontAwesome
                                name="chevron-left"
                                color="#ffffff"
                                size={24}
                                style={{ marginLeft: 10, marginTop: 10, paddingTop: 5 }}
                            />
                        </TouchableOpacity>
                        <View style={{ width: 420, alignItems: "center" }}>
                            <Text style={{ fontSize: 18, color: "#fff", fontWeight: "bold", marginTop: 8 }} onPress={toggleModal}>Câu {index} /{quiz.questions.length}</Text>
                        </View>

                        <TouchableOpacity onPress={() => { nextQuestion() }}>
                            <FontAwesome
                                name="chevron-right"
                                color="#ffffff"
                                size={24}
                                style={{ marginLeft: 10, marginTop: 10, paddingTop: 5, paddingRight: 10 }}
                            />
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={quiz.questions}
                        numColumns={5}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity style={styles.box} onPress={() => { selectQuestion(index) }}>
                                <View style={quiz.result ? styles.boxNumberActive : styles.boxNumber}>
                                    <Text style={styles.titleNumber}>{index = index + 1}</Text>
                                </View>
                            </TouchableOpacity>
                        )}>

                    </FlatList>


                </View>
            </Modal> */}
        </View>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: '#15202B'
    },
    changeQuestion: {
        flexDirection: "row",
        backgroundColor: "#1DA1F2",
        height: 60,
        position: 'absolute',
        bottom: 0
    },
    headerModal: {
        flexDirection: "row",
        backgroundColor: "#1DA1F2",
        height: 60,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    buttonExit: {
        marginTop: 8,
        marginLeft: 10
    },
    exit: {
        flexDirection: "row",
        borderRadius: 10,
        width: 80,
        height: 40,
        paddingTop: 5,
        paddingLeft: 5,
    },
    textExit: {
        paddingTop: 5,
        fontSize: 16
    },
    modal: {
        marginBottom: 50,
        justifyContent: "flex-end",
        alignItems: "center",
        color: "#fff",
        backgroundColor: "#192734",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        shadowColor: "#1DA1F2",
        shadowOffset: {
            width: 1,
            height: 2,
        },
        shadowOpacity: 0.5,
        paddingBottom: 20,
    },
    boxNumber: {
        backgroundColor: "#fff",
        borderRadius: 50,
        paddingTop: 10,
        width: 60,
        height: 60,
        marginTop: 10
    },
    boxNumberActive: {
        backgroundColor: "#1DA1F2",
        borderRadius: 50,
        paddingTop: 10,
        width: 60,
        height: 60
    },
    titleNumber: {
        color: "#15202B",
        fontSize: 28,
        textAlign: "center",
        fontWeight: 'bold'
    },
    titleNumberActive: {
        color: "#fff",
        fontSize: 28,
        textAlign: "center",
        fontWeight: 'bold'
    },
    box: {
        width: 100,
        alignItems: 'center'
    },
    view: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    animatedBox: {
        flex: 1,
        backgroundColor: "#192734",
        padding: 10
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
});

export default QuizScreen;