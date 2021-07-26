import React, { useState, useEffect } from 'react';
import { StyleSheet, View, StatusBar, FlatList, Text, Image, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import TrackPlayer, { usePlaybackState } from "react-native-track-player";
import Player from "./../components/Play_Progress";
import localTrack from "./../assets/pure.m4a";
import MenuDrawer from 'react-native-side-drawer'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const ResultScreen = ({ navigation }) => {
    const playbackState = usePlaybackState();

    useEffect(() => {
        setup();
    }, []);
    const [open, setOpen] = useState(false)
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
            <TouchableOpacity style={{ flexDirection: "row", marginTop: "40%" }} onPress={() => {navigation.navigate('Home'),setOpen(!open)}}>
              <MaterialIcons
                name="home"
                size={32}
                color="#ffffff"
                style={{ marginLeft: 16 }}></MaterialIcons>
              <Text style={{ fontSize: 21, color: "#fff", paddingLeft: 16 }}>Trang chủ</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: "row", marginTop: 36 }} onPress={() => {navigation.navigate('ListSection'),setOpen(!open)}}>
              <MaterialIcons
                name="ballot"
                size={32}
                color="#ffffff"
                style={{ marginLeft: 16 }}></MaterialIcons>
              <Text style={{ fontSize: 21, color: "#fff", paddingLeft: 16 }}>Section</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: "row", marginTop: 36 }} onPress={() => {navigation.navigate('ListExam'),setOpen(!open)}}>
              <MaterialIcons
                name="rule"
                size={32}
                color="#ffffff"
                style={{ marginLeft: 16 }}></MaterialIcons>
              <Text style={{ fontSize: 21, color: "#fff", paddingLeft: 16 }}>Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: "row", marginTop: 36 }} onPress={() => {navigation.navigate('ListFlashCard'),setOpen(!open)}}>
              <MaterialIcons
                name="book"
                size={32}
                color="#ffffff"
                style={{ marginLeft: 16 }}></MaterialIcons>
              <Text style={{ fontSize: 21, color: "#fff", paddingLeft: 16 }}>Flash card</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: "row", marginTop: 36 }} onPress={() => {navigation.navigate('Message'),setOpen(!open)}}>
              <MaterialIcons
                name="chat"
                size={32}
                color="#ffffff"
                style={{ marginLeft: 16 }}></MaterialIcons>
              <Text style={{ fontSize: 21, color: "#fff", paddingLeft: 16 }}>Tin nhắn</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: "row", marginTop: 36 }} onPress={() => {navigation.navigate('Calender'),setOpen(!open)}}>
              <MaterialIcons
                name="today"
                size={32}
                color="#ffffff"
                style={{ marginLeft: 16 }}></MaterialIcons>
              <Text style={{ fontSize: 21, color: "#fff", paddingLeft: 16 }}>Lịch</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: "row", marginTop: 36 }} onPress={() => {navigation.navigate('Notification'),setOpen(!open)}}>
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
            <Text style={{ marginTop: 20, marginBottom: 20, color: '#fff', fontSize: 36, fontWeight: 'bold', marginLeft: 10 }}>Kết quả bài exam 1</Text>
            <ScrollView style={{ paddingLeft: 16, paddingRight: 16, marginBottom: 30 }}>
                <View>
                    <Text style={styles.question}>Câu 1: What id the meaning of "dog" ?</Text>
                    <View style={styles.answer}>
                        <View>
                            <Text style={styles.titleNumber}>A</Text>
                        </View>
                        <View>
                            <Text style={styles.contentAnswer}>Mèo</Text>
                        </View>
                    </View>
                    <View style={styles.correct}>
                        <View>
                            <Text style={styles.titleNumber}>B</Text>
                        </View>
                        <View>
                            <Text style={styles.contentAnswer}>Mèo</Text>
                        </View>
                    </View>
                    <View style={styles.answer}>
                        <View>
                            <Text style={styles.titleNumber}>C</Text>
                        </View>
                        <View>
                            <Text style={styles.contentAnswer}>Mèo</Text>
                        </View>
                    </View>
                    <View style={styles.answer}>
                        <View>
                            <Text style={styles.titleNumber}>D</Text>
                        </View>
                        <View>
                            <Text style={styles.contentAnswer}>Mèo</Text>
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: 16 }}>
                    <Text style={styles.question}>Câu 2: What id the meaning of "dog" ?</Text>
                    <View style={styles.answer}>
                        <View>
                            <Text style={styles.titleNumber}>A</Text>
                        </View>
                        <View>
                            <Text style={styles.contentAnswer}>Mèo</Text>
                        </View>
                    </View>
                    <View style={styles.wrong}>
                        <View>
                            <Text style={styles.titleNumber}>B</Text>
                        </View>
                        <View>
                            <Text style={styles.contentAnswer}>Mèo</Text>
                        </View>
                    </View>
                    <View style={styles.answer}>
                        <View>
                            <Text style={styles.titleNumber}>C</Text>
                        </View>
                        <View>
                            <Text style={styles.contentAnswer}>Mèo</Text>
                        </View>
                    </View>
                    <View style={styles.answer}>
                        <View>
                            <Text style={styles.titleNumber}>D</Text>
                        </View>
                        <View>
                            <Text style={styles.contentAnswer}>Mèo</Text>
                        </View>
                    </View>
                    <Text style={styles.contentAnswer}>Đáp án đúng: A</Text>
                </View>
                <View style={{ marginTop: 16 }}>
                    <View style={{ flexDirection: "row", height: 70 }}>
                        <Text style={styles.questionAudio}>Câu 3:</Text>
                        <Player
                            style={styles.player}
                            onTogglePlayback={togglePlayback}
                        />
                    </View>
                    <View style={styles.answer}>
                        <View>
                            <Text style={styles.titleNumber}>A</Text>
                        </View>
                        <View>
                            <Text style={styles.contentAnswer}>Mèo</Text>
                        </View>
                    </View>
                    <View style={styles.correct}>
                        <View>
                            <Text style={styles.titleNumber}>B</Text>
                        </View>
                        <View>
                            <Text style={styles.contentAnswer}>Mèo</Text>
                        </View>
                    </View>
                    <View style={styles.answer}>
                        <View>
                            <Text style={styles.titleNumber}>C</Text>
                        </View>
                        <View>
                            <Text style={styles.contentAnswer}>Mèo</Text>
                        </View>
                    </View>
                    <View style={styles.answer}>
                        <View>
                            <Text style={styles.titleNumber}>D</Text>
                        </View>
                        <View>
                            <Text style={styles.contentAnswer}>Mèo</Text>
                        </View>
                    </View>

                </View>
                <View style={{ marginTop: 16 }}>
                    <Text style={styles.question}>Câu 4: What is your name?</Text>

                    <View style={styles.wrong}>
                        <Text style={styles.contentAnswer}>Tôi sống ở đâu?</Text>
                    </View>

                    <Text style={styles.contentAnswer}>Đáp án đúng: Bạn tên là gì?</Text>
                </View>
                <View style={{ marginTop: 16 }}>
                    <Text style={styles.question}>Câu 5: Nối các từ vựng thành cụm từ có nghĩa</Text>

                    <View style={styles.correct}>
                        <Text style={styles.contentAnswer}>Cooked raw</Text>
                    </View>
                    <View style={styles.wrong}>
                        <Text style={styles.contentAnswer}>Stale sweet</Text>
                    </View>
                    <View style={styles.wrong}>
                        <Text style={styles.contentAnswer}>Sour fresh</Text>
                    </View>

                    <Text style={styles.contentAnswer}>Đáp án đúng: Cooked raw, Stale fresh, Sour sweet</Text>
                </View>

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: '#15202B',
    },
    answer: {
        flexDirection: "row",
        marginLeft: 30,
        marginRight: 30,
        marginTop: 5,
        marginBottom: 5,
    },
    correct: {
        flexDirection: "row",
        marginLeft: 30,
        marginRight: 30,
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: "#1DA1F2",
        padding: 5,
        borderRadius: 5
    },
    wrong: {
        flexDirection: "row",
        marginLeft: 30,
        marginRight: 30,
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: "#E63946",
        padding: 5,
        borderRadius: 5
    },
    question: {
        fontSize: 24,
        color: "#fff",
        fontWeight: "bold",
        marginBottom: 8
    },
    questionAudio: {
        fontSize: 24,
        color: "#fff",
        fontWeight: "bold",
        marginTop: 25,
        marginRight: 10
    },
    buttonExit: {
        marginTop: 8,
        marginLeft: 10
    },
    titleNumber: {
        color: "#fff",
        fontSize: 21,
        marginLeft: 16,
        // fontWeight: 'bold'
    },
    contentAnswer: {
        marginLeft: 16,
        fontSize: 21,
        color: "#fff",
        // fontWeight: 'bold'
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
    kengang: {
        width: '100%',
        borderBottomColor: '#ededed',
        borderBottomWidth: 1,
        marginTop: 20
    },
    animatedBox: {
        flex: 1,
        backgroundColor: "#192734",
        padding: 10
    },
});

export default ResultScreen;