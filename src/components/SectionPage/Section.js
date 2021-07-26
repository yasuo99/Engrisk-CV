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
import TrackPlayer, { usePlaybackState } from "react-native-track-player";
import Player from "../PlayQuizSort";
import localTrack from "../../assets/pure.m4a";
import QuestionSection from './QuestionSection';
import ScriptActions from '../../redux/actions/script';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Section = ({ navigation, routeId, sectionId, scriptId }) => {
    const playbackState = usePlaybackState();
    const [bgColor, setBgColor] = useState(false)

    const [script, setScript] = useState({
        words: [],
        questions: []
    })
    const [words, setWords] = useState([])
    const [questions, setQuestions] = useState([])
    const [wordIndex, setWordIndex] = useState(0)
    const [currentWord, setCurrentWord] = useState({})
    const [questionIndex, setQuestionIndex] = useState(0)
    const [currentQuestion, setCurrentQuestion] = useState({})
    const [isFinish, setIsFinish] = useState(false);
    const [remainQuestions, setRemainQuestions] = useState([])
    const [isLastQuestion,setIsLastQuestion] = useState(false);
    useEffect(() => {
        async function preLoad() {
            const script = await AsyncStorage.getItem('script')
            if (script) {
                const parsedScript = JSON.parse(script);
                if (parsedScript.id == scriptId) {
                    setScript(parsedScript)
                    if (parsedScript.words.length > 0) {
                        setIsVocabularyScreen(true)
                        setCurrentWord(parsedScript.words[wordIndex])
                    } else {
                        if (parsedScript.questions.length > 0) {
                            setIsQuestionScreen(true)
                            setCurrentWord(parsedScript.questions[questionIndex])
                        }
                    }
                } else {
                    fetchData();
                }

            } else {
                await fetchData();
            }
        }
        async function fetchData() {
            const data = await ScriptActions.learn(routeId, sectionId, scriptId);
            console.log('Data nè', data);
            setScript(data.script);
            if (data.script.words.length > 0) {
                setIsVocabularyScreen(true)
                console.log('Tu vung', data.script.words[wordIndex])
                setCurrentWord(data.script.words[wordIndex])

            } else {
                if (data.script.questions.length > 0) {
                    console.log('?', data.script.questions[questionIndex]);
                    setIsQuestionScreen(true)
                    setCurrentQuestion(data.script.questions[questionIndex])
                }
            }
            await AsyncStorage.setItem('script', JSON.stringify(data.script));
        }
        fetchData();
        setQuestionIndex(0);
        setWordIndex(0);
        setIsFinish(false);
    }, [scriptId, sectionId, routeId])
    useEffect(() => {
        setCurrentWord(script.words[wordIndex])
    }, [wordIndex])
    useEffect(() => {
        setCurrentQuestion(script.questions[questionIndex])
        if(questionIndex == script.questions.length - 1){
            setIsLastQuestion(true);
        }
    }, [questionIndex])
    useEffect(() => {
        if(remainQuestions.length > 0){
            setScript({
                ...script,
                questions: [...script.questions, ...remainQuestions]
            })
            setRemainQuestions([]);
            setIsLastQuestion(false);
        }
    },[remainQuestions.length])
    function addRemainQuestion(question){
        setRemainQuestions([...remainQuestions,question])
    }
    const next = () => {
        setBgColor(!bgColor);
    }
    function vocabularyIndexChange() {
        if (wordIndex < script.words.length - 1) {
            setWordIndex(wordIndex + 1)
        } else {
            setIsVocabularyScreen(false);
            if (script.questions.length > 0) {
                setIsQuestionScreen(true);
            } else {
                setIsFinish(true);
            }
        }
    }
    function questionIndexChange(){
        console.log('dkm');
        if(questionIndex < script.questions.length - 1){
            setQuestionIndex(questionIndex + 1);
        }else{
            setIsFinish(true);
        }
    }
    useEffect(() => {
        setup();
    }, []);
    const [isVocabularySreen, setIsVocabularyScreen] = useState(false);
    const [isTheoryScreen, setIsTheoryScreen] = useState(false);
    const [isSplashScreen, setIsSplashScreen] = useState(false);
    const [isQuestionScreen, setIsQuestionScreen] = useState(false);
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
            <StatusBar barStyle="light-content" />
            {isVocabularySreen && <View style={{ margin: 30 }}>
                <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10, color: "#1DA1F2" }}>Đọc và nghe câu</Text>
                <View style={{ alignItems: "center", backgroundColor: "#1DA1F2", borderRadius: 10 }}>
                    <Image source={currentWord?.wordImg ? { uri : `${ currentWord.wordImg.replace('http://localhost:5000/api/v2/streaming/image?image=','http://10.0.3.2:5000/')}`} : require('./../../assets/abideby.jpeg')} style={{ width: 420, height: 200, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}></Image>
                    <Player
                       onTogglePlayback={
                        async () => {
                            await TrackPlayer.reset();
                            await TrackPlayer.add({
                              id: 1, 
                              url:`${ currentWord.wordVoice.replace('http://localhost:5000/api/v2/streaming/audio?audio=','http://10.0.3.2:5000/')}`
                              // url: localTrack
                            });
                            await TrackPlayer.play();
                          
  
                        }
                      }
                    />
                </View>

                <ScrollView style={{ height: 320 }}>
                    <Text style={{ fontSize: 32, fontWeight: "bold", marginTop: 20, color: "#fff" }}>{currentWord?.eng}</Text>
                    <Text style={{ fontSize: 24, marginTop: 10, color: "#fff" }}>{currentWord?.vie}</Text>

                </ScrollView>
            </View>}
            {isQuestionScreen &&
                <QuestionSection navigation={navigation} routeId={routeId} question={currentQuestion} nextIndex={questionIndexChange} isFinish={isFinish} addRemainQuestion={addRemainQuestion} isLastQuestion={isLastQuestion}></QuestionSection>
            }
            {isVocabularySreen &&
                <View style={styles.view}>
                    <TouchableOpacity onPress={() => vocabularyIndexChange()} style={bgColor === false ? styles.next : styles.nextActive}>
                        <Text style={{ color: "#fff", fontSize: 24, fontWeight: "bold" }} >{isFinish ? 'Kết thúc' : 'Tiếp theo'} </Text>
                    </TouchableOpacity>
                </View>}
            {/* {isQuestionScreen && <View style={styles.view}>
                <TouchableOpacity onPress={() => questionIndexChange()} style={bgColor === false ? styles.next : styles.nextActive} onPress={() => setQuestionIndex(questionIndex + 1)}>
                    <Text style={{ color: "#fff", fontSize: 24, fontWeight: "bold" }}>{isFinish ? 'Kết thúc' : 'Tiếp theo'} </Text>
                </TouchableOpacity>
            </View>} */}
            {/* {isFinish && <View style={styles.view}>
                <TouchableOpacity onPress={() => navigation.navigate('Lesson', { routeId: routeId, sectionId: sectionId })} style={bgColor === false ? styles.next : styles.nextActive}>
                    <Text style={{ color: "#fff", fontSize: 24, fontWeight: "bold" }}>Kết thúc </Text>
                </TouchableOpacity></View>} */}
        </View>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: '#15202B',
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
    next: {
        width: 420,
        marginTop: 30,
        padding: 16,
        alignItems: "center",
        backgroundColor: "#999",
        borderRadius: 10,
    },
    nextActive: {
        width: 420,
        marginTop: 30,
        padding: 16,
        backgroundColor: "#1DA1F2",
        padding: 16,
        alignItems: "center",
        borderRadius: 10
    },
    view: {
        flex: 1,
        justifyContent: "flex-end",
        marginBottom: 40,
        alignItems: "center",

    }
});

export default Section;
