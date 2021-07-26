import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ModalDropdown from 'react-native-modal-dropdown';
import ProgressBar from 'react-native-progress/Bar';
import TrackPlayer, { usePlaybackState } from "react-native-track-player";
import Player from "../components/Player";
import localTrack from "../assets/pure.m4a";
import MenuDrawer from 'react-native-side-drawer'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import WordsActions from "../redux/actions/word";
import WordCategoriesActions from "../redux/actions/wordCategory";
import { BaseApiUrl } from '../constants/api';
import LinearGradient from 'react-native-linear-gradient';
const FlashCardScreen = ({ route, navigation }) => {
  const playbackState = usePlaybackState();
  const [wordCategories, setWordCategories] = useState({
    vocabulary: [],
  })
  const { WordCategoryId } = route.params
  useEffect(async () => {
    try {
      const wordDetail = await WordCategoriesActions.getDetail(WordCategoryId)
      setWordCategories(wordDetail.data)
      console.log(wordDetail.data)
    } catch (error) {
      console.log(error);
    }
    await setup();
  }, [WordCategoryId]);
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

  async function togglePlayback(url, index) {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack == null) {
      await TrackPlayer.reset();
      await TrackPlayer.add({
        id: index,
        url: url,
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

    <View style={styles.container}>
      <StatusBar backgroundColor='#15202B' barStyle="light-content" />
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
            onPress={() => navigation.navigate('ListFlashCard')}
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
      <View style={{ alignItems: "center" }}>
        <Text style={styles.titleWord}>{wordCategories.categoryName}</Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.title}>{wordCategories.vocabulary.length} flash card avaiable</Text>
      </View>

      <ScrollView
        horizontal={true}
        pagingEnabled
        showsHorizontalScrollIndicator={false}>
        {
          wordCategories.vocabulary.map((word, index) =>
            <View style={{ flexDirection: "column" }}>
              <View style={styles.box}>
                <View>
                  <Text style={styles.word}>{word.eng}</Text>
                </View>
                <View>
                  <Text style={styles.wordVie}>{word.vie}</Text>
                </View>
                <Image source={word.wordImg ? { uri : `${ word.wordImg.replace('http://localhost:5000/api/v2/streaming/image?image=','http://10.0.3.2:5000/')}`} : require('../assets/abideby.jpeg')} style={{ width: 200, height: 100 }}></Image>
                <View style={{ flexDirection: "row" }}>
                  <Player
                    style={styles.player}
                    // onTogglePlayback={word.wordVoice ? togglePlayback( `${BaseApiUrl}/streaming/audio?audio=${word.wordVoice}`) : togglePlayback(localTrack)}
                    onTogglePlayback={
                      async () => {
                          await TrackPlayer.reset();
                          await TrackPlayer.add({
                            id: index, 
                            url:`${ word.wordVoice.replace('http://localhost:5000/api/v2/streaming/audio?audio=','http://10.0.3.2:5000/')}`
                            // url: localTrack
                          });
                          await TrackPlayer.play();
                        

                      }
                    }
                  />
                  <ModalDropdown options={['option 1', 'option 2']}
                    dropdownStyle={{ backgroundColor: '#15202B', height: 90, width: 100, marginTop: 5 }}
                    dropdownTextStyle={{ backgroundColor: '#15202B', fontSize: 16, paddingLeft: 10, color: '#fff' }}
                    dropdownTextHighlightStyle={{ color: '#fff' }}
                    style={{ marginLeft: 20, marginTop: 24 }}>
                    <Image source={require('../assets/more.png')}></Image>
                  </ModalDropdown>
                </View>

              </View>
              <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ProgressBar progress={(index = index + 1) / (wordCategories.vocabulary.length)} width={400} height={35} color={'#1DA1F2'} borderRadius={20} />
              </View>
            </View>
          )
        }

      </ScrollView>

      <View style={{ flex: 1, flexDirection: "row", alignItems: 'center', justifyContent: 'center', marginTop: -100 }}>
        <View>
          <TouchableOpacity animation="fadeInLeft" >
            <Text style={styles.buttonLeft}>I DON'T KNOW</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity animation="fadeInRight">
            <Text style={styles.buttonRight}>I KNOW</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>

  );
};

export default FlashCardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15202B'
  },
  titleWord: {
    marginTop: 20,
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold'
  },
  title: {
    marginTop: 50,
    fontSize: 32,
    color: '#ccc',
    fontWeight: '400'
  },
  box: {
    marginTop: 100,
    marginLeft: 40,
    marginRight: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    width: 400,
    height: 300,
    alignItems: 'center',
    padding: 20,
  },
  word: {
    fontSize: 28,
    color: '#15202B',
    fontWeight: 'bold',
    marginBottom: 5
  },
  wordVie: {
    fontSize: 24,
    color: '#15202B',
    fontWeight: 'bold',
    marginBottom: 5
  },
  example: {
    marginTop: 5,
    fontSize: 21,
    color: '#15202B',
    fontWeight: 'bold'
  },
  buttonLeft: {
    padding: 16,
    color: '#fff',
    fontSize: 18,
    backgroundColor: 'orange',
    width: 180,
    textAlign: 'center',
    marginRight: 20,
    borderRadius: 30,
    fontWeight: 'bold'
  },
  buttonRight: {
    padding: 16,
    color: '#fff',
    fontSize: 18,
    backgroundColor: "#1DA1F2",
    width: 180,
    textAlign: 'center',
    marginLeft: 20,
    borderRadius: 30,
    fontWeight: 'bold'
  },
  animatedBox: {
    flex: 1,
    backgroundColor: "#192734",
    padding: 10
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
});
