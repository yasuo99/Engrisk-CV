import React, { useState, useEffect } from 'react';
import { StyleSheet, View, StatusBar, FlatList, Text, Image, TouchableOpacity, Button } from 'react-native';
import TrackPlayer, { usePlaybackState } from "react-native-track-player";
import Player from "../Play_Progress";
import localTrack from "../../assets/pure.m4a";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native';
import { Input } from 'react-native-elements';
import { TextInput } from 'react-native';
const QuizConversation = () => {
    const [bgColor, setBgColor] = useState(false)
    const playbackState = usePlaybackState();

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
            <View style={styles.boxQuestion} >
                {/* <Text style={styles.titleQuestion}>Quiz về động vật</Text>
                <Text style={styles.timeQuestion}>Thời gian còn lại: 00:10:30</Text>
                <Text style={styles.numberQuestion}>Số câu đã chọn: 1/15</Text> */}
                <View style={{ marginLeft: 50, marginRight: 30, flexDirection: "row", height: 60 }}>
                    <Text style={styles.question}>Câu 2:</Text>
                    <Player
                        style={styles.player}
                        onTogglePlayback={togglePlayback}
                    />
                </View>
            </View>
            <View style={styles.kengang}></View>
            <ScrollView>
                <View style={styles.boxConversation}>
                    <View style={styles.conversationA}>
                        <Image source={require('../../assets/avatar.png')} style={{ marginTop: 10, marginRight: 10 }}></Image>
                        <FontAwesome
                            name="caret-left"
                            color="#fff"
                            size={48}
                            style={{ marginTop: 16 }}
                        />
                        <View style={styles.boxA}>
                            <Text style={{ fontSize: 21 }}>ThanhLap</Text>
                            <View style={styles.content}>
                                <Text style={{fontSize:18}}>Which</Text>
                                <TouchableOpacity><Text style={{fontSize:18}}> ______ </Text></TouchableOpacity>
                                <Text style={{fontSize:18}}>do you work for?</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.conversationB}>
                        <View style={styles.boxB}>
                            <Text style={{ fontSize: 21, marginLeft: "70%" }}>ThanhLap</Text>
                            <View style={styles.content}>
                                <Text style={{fontSize:18}}>Which</Text>
                                <TouchableOpacity><Text style={{fontSize:18}}> ______ </Text></TouchableOpacity>
                                <Text style={{fontSize:18}}>do you work for?</Text>
                            </View>
                        </View>
                        <FontAwesome
                            name="caret-right"
                            color="#fff"
                            size={48}
                            style={{ marginTop: 16 }}
                        />
                        <Image source={require('../../assets/avatar.png')} style={{ marginTop: 10, marginLeft: 10 }}></Image>
                    </View>
                    <View style={styles.conversationA}>
                        <Image source={require('../../assets/avatar.png')} style={{ marginTop: 10, marginRight: 10 }}></Image>
                        <FontAwesome
                            name="caret-left"
                            color="#fff"
                            size={48}
                            style={{ marginTop: 16 }}
                        />
                        <View style={styles.boxA}>
                            <Text style={{ fontSize: 21 }}>ThanhLap</Text>

                            <View style={styles.content}>
                                <Text style={{fontSize:18}}>Which</Text>
                                <TouchableOpacity><Text style={{fontSize:18}}> ______ </Text></TouchableOpacity>
                                <Text style={{fontSize:18}}>do you work for?</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.conversationB}>
                        <View style={styles.boxB}>
                            <Text style={{ fontSize: 21, marginLeft: "70%" }}>ThanhLap</Text>
                            <View style={styles.content}>
                                <Text style={{fontSize:18}}>Which</Text>
                                <TouchableOpacity><Text style={{fontSize:18}}> ______ </Text></TouchableOpacity>
                                <Text style={{fontSize:18}}>do you work for?</Text>
                            </View>
                        </View>
                        <FontAwesome
                            name="caret-right"
                            color="#fff"
                            size={48}
                            style={{ marginTop: 16 }}
                        />
                        <Image source={require('../../assets/avatar.png')} style={{ marginTop: 10, marginLeft: 10 }}></Image>
                    </View>
                    <View style={styles.conversationA}>
                        <Image source={require('../../assets/avatar.png')} style={{ marginTop: 10, marginRight: 10 }}></Image>
                        <FontAwesome
                            name="caret-left"
                            color="#fff"
                            size={48}
                            style={{ marginTop: 16 }}
                        />
                        <View style={styles.boxA}>
                            <Text style={{ fontSize: 21 }}>ThanhLap</Text>

                            <View style={styles.content}>
                                <Text style={{fontSize:18}}>Which</Text>
                                <TouchableOpacity><Text style={{fontSize:18}}> ______ </Text></TouchableOpacity>
                                <Text style={{fontSize:18}}>do you work for?</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.conversationB}>
                        <View style={styles.boxB}>
                            <Text style={{ fontSize: 21, marginLeft: "70%" }}>ThanhLap</Text>
                            <View style={styles.content}>
                                <Text style={{fontSize:18}}>Which</Text>
                                <TouchableOpacity><Text style={{fontSize:18}}> ______ </Text></TouchableOpacity>
                                <Text style={{fontSize:18}}>do you work for?</Text>
                            </View>
                        </View>
                        <FontAwesome
                            name="caret-right"
                            color="#fff"
                            size={48}
                            style={{ marginTop: 16 }}
                        />
                        <Image source={require('../../assets/avatar.png')} style={{ marginTop: 10, marginLeft: 10 }}></Image>
                    </View>

                </View>
            </ScrollView>
            <View style={styles.boxWord}>
                <ScrollView>
                    <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity style={styles.word}>
                            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#15202B" }}>hello</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.word}>
                            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#15202B" }}>hello</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.word}>
                            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#15202B" }}>hello</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity style={styles.word}>
                            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#15202B" }}>Notification</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.word}>
                            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#15202B" }}>Notification</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.word}>
                            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#15202B" }}>Notification</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
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
        marginLeft: 60,
        marginRight: 60,
        marginTop: 30,
        marginBottom: 30,

    },
    active: {
        flexDirection: "row",
        marginLeft: 60,
        marginRight: 60,
        marginTop: 30,
        marginBottom: 30,
        backgroundColor: "#1DA1F2",
        padding: 5,
        borderRadius: 5
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
        height: 50
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
        marginRight: 30
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
        marginTop: 30,
        marginLeft: 30,
    },
    conversationA: {
        flexDirection: "row",
        margin: 16
    },
    conversationB: {
        flexDirection: "row",
        margin: 16
    },
    boxA: {
        backgroundColor: "#fff",
        width: "80%",
        padding: 10,
        borderRadius: 10,
        marginLeft: -5
    },
    boxB: {
        backgroundColor: "#fff",
        width: "80%",
        padding: 10,
        borderRadius: 10,
        marginRight: -5
    },
    content: {
        color: "#15202B",
        fontSize: 21,
        marginTop: 8,
        marginBottom: 8,
        display: "flex",
        flexDirection:"row"
    },
    boxWord: {
        height: 120,
        marginLeft: 20,
    },
    word: {
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 10,
        minWidth: 135,
        height: 50,
        borderRadius: 20,
        shadowColor: "#1DA1F2",
        shadowOffset: {
            width: 2,
            height: 5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 6,
        elevation: 8,
        margin: 5,

    },
});

export default QuizConversation;