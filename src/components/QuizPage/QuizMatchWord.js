import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
const QuizMatchWord = ({ question, isLastQuestion, submitAnswer }) => {
    const [wordActive, setWordActive] = useState(false)
    const [wordActiveRight, setWordActiveRight] = useState(false)
    const [firstCol, setFirstcol] = useState([]);
    const [secondCol, setSecondCol] = useState([]);
    useEffect(() => {
        const tempFirst = []
        const tempSecond = []
        for (var i = 0; i < question.answers.length; i++) {
            const answer = question.answers[i].answer;
            var n = answer.indexOf("</p>");
            var m = answer.indexOf("<p>");
            const firstWord = answer.substring(m, n)
            const secondWord = answer.substring(n, answer.length)
            const firstStr = firstWord.replace(/(<([^>]+)>)/gi, "");
            const secondStr = secondWord.replace(/(<([^>]+)>)/gi, "");
            tempFirst.push(firstStr)
            tempSecond.push(secondStr)
        }
        setFirstcol(tempFirst.sort(() => Math.random() - 0.3))
        setSecondCol(tempSecond.sort(() => Math.random() - 0.7))
    }, [question])
    console.log(firstCol);
    return (
        <View style={styles.screenContainer}>
            <ScrollView>
                <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 100, textAlign: 'center', color: "#1DA1F2" }}>{question?.preQuestion}</Text>
                <View style={styles.boxAnswer} >
                    <View style={{ flexDirection: "column" }}>
                        {firstCol.map((val, idx) =>
                            <TouchableOpacity key={idx} onPress={() => { setWordActive(!wordActive) }} style={wordActive === false ? { flexDirection: "row" } : styles.active}>
                                <View style={styles.word}>
                                    <Text style={styles.textWord}>{val}</Text>
                                </View>
                                <FontAwesome
                                    name="caret-right"
                                    color="#fff"
                                    size={48}
                                    style={{ marginLeft: -18, marginTop: 22, zIndex: 4 }}
                                />
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={{ flexDirection: "column" }}>
                        {secondCol.map((val, idx) =>
                            <TouchableOpacity key={idx} onPress={() => { setWordActiveRight(!wordActiveRight) }} style={wordActiveRight === false ? { flexDirection: "row" } : styles.activeRight}>
                                <FontAwesome
                                    name="caret-right"
                                    color={wordActiveRight === false ? "#15202B" : "#fff"}
                                    // color="#15202B"
                                    size={48}
                                    style={{ marginTop: 22, marginLeft: 26, zIndex: 2 }}
                                />
                                <View style={styles.wordRight}>
                                    <Text style={styles.textWord}>{val}</Text>
                                </View>

                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: '#15202B'
    },
    boxAnswer: {
        flex: 1,
        flexDirection: "row",
        marginLeft: 20,
        marginRight: 20,
        marginTop: 100
    },
    active: {
        marginLeft: 30,
        flexDirection: "row",
    },
    activeRight: {
        marginLeft: -40,
        flexDirection: "row",
    },
    boxQuestion: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        height: 250,
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
    word: {
        backgroundColor: "#fff",
        width: 180,
        height: 60,
        padding: 10,
        alignItems: "center",
        margin: 16,
    },
    wordRight: {
        backgroundColor: "#fff",
        width: 180,
        height: 60,
        padding: 10,
        alignItems: "center",
        marginLeft: -16,
        marginBottom: 16,
        marginTop: 16,
    },
    textWord: {
        fontSize: 24,
        color: "#15202B",
        fontWeight: "bold"
    },
});

export default QuizMatchWord;