import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ImageBackground
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { ScriptTypes } from '../../constants/ScriptTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Lesson = ({ route, navigation }) => {
  const [showRealApp, setShowRealApp] = useState(false)
  const [active, setActive] = useState(false)
  const checkActive = () => {
    setActive(!active)
  }
  const { scripts, title, expand, sectionId, routeId } = route.params
  const [parsedScripts, setParsedScripts] = useState([])
  const [renderedTitle, setRenderedTitle] = useState('')
  const [renderedExpand, setRenderedExpand] = useState('')
  useEffect(() => {
    async function preLoad() {
      if (scripts) {
        setParsedScripts(JSON.parse(scripts))
        setRenderedTitle(title);
        setRenderedExpand(expand)
        const saveData = {
          title: title,
          expand: expand,
          scripts: scripts
        }
        await AsyncStorage.setItem('currentScripts', JSON.stringify(saveData))
      } else {
        const currentScripts = JSON.parse(await AsyncStorage.getItem('currentScripts'));
        setParsedScripts(currentScripts.scripts);
        setRenderedExpand(currentScripts.expand);
        setRenderedTitle(currentScripts.title);
      }
    }
    preLoad();
  }, [scripts])
  console.log('sectionId nè', sectionId);
  console.log('routeId nè', routeId);
  function renderContentType(script) {
    switch (script.type) {
      case ScriptTypes.GRAMMAR:
        return ({ content: 'Ngữ pháp', description: 'Nắm bắt ngữ pháp trong tiếng Anh' })
      case ScriptTypes.CONVERSATION:
        return ({ content: 'Hội thoại', description: 'Học cách sử dụng tiếng Anh trong ngữ cảnh' })
      case ScriptTypes.WRITING:
        return ({ content: 'Luyện viết', description: 'Học thông qua các bài tập viết' })
      case ScriptTypes.LISTENING:
        return ({ content: 'Luyện nghe', description: 'Học thông qua các bài tập nghe' })
      case ScriptTypes.READING:
        return ({ content: 'Luyện đọc', description: 'Học thông qua các bài tập đọc' })
      case ScriptTypes.VOCABULARY:
        return ({ content: 'Từ vựng', description: 'Học các từ và cụm từ mới' })
      default:
        return ({ content: 'Mini exam', description: 'Làm bài kiểm tra nho nhỏ' })
    }
  }
  const slides = parsedScripts.map((script, idx) =>
  ({
    key:idx,
    id: idx + 1,
    scriptId: script.id,
    lesson: `Bài ${idx + 1}`,
    title: ` ${renderedTitle}`,
    expand: `${renderedExpand}`,
    image: require('./../../assets/banner1.jpg'),
    content: renderContentType(script).content,
    description: renderContentType(script).description
  })
  );
  const _renderItem = ({ item }) => {
    return (
      <LinearGradient
        colors={['rgba(2,33,64,0.2)', 'rgba(30,66,88,0.2)', 'rgba(30,66,88,0.2)']}
        style={styles.linearGradient}>
        <Image source={item.image} style={styles.slide} ></Image>
        <View style={{ marginTop: "-180%" }}>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={() => { navigation.navigate('ListSection') }}>
              {item.id === 1 && <MaterialIcons
                name="arrow-back"
                size={32}
                color="#333"
                style={{ marginTop: 20, marginLeft: 10, marginRight: 10 }}>
              </MaterialIcons>}
            </TouchableOpacity>
            <Text style={styles.title}> {item.id === 1 ? `${item.lesson} - ${item.title}` : ""} </Text>
          </View>
          <Text style={styles.expand}>{item.id === 1 ? item.expand : ""}</Text>
          <View style={{ marginTop: "50%", alignItems: "center", justifyContent: "center" }}>
            <Text style={styles.content}>{item.content}</Text>
            <Text style={styles.description}>{item.description}</Text>
            {/* <TouchableOpacity onPress={() => { navigation.navigate('Section', { routeId: routeId, sectionId: sectionId, scriptId: item.scriptId }) }} style={styles.buttonActive} ><Text style={{ fontSize: 21, color: "#fff" }}>Bắt đầu</Text></TouchableOpacity> */}
            <TouchableOpacity onPress={() => { navigation.navigate('Section', { routeId: routeId, sectionId: sectionId, scriptId: item.scriptId }) }} style={styles.buttonActive} ><Text style={{ fontSize: 21, color: "#fff" }}>Bắt đầu</Text></TouchableOpacity>
            
          </View>
          {/* <Text style={styles.text}>{item.text}</Text> */}
        </View>
      </LinearGradient>
    );
  }
  const _onDone = () => {
    setShowRealApp(true)
  }
  return (
    <AppIntroSlider renderItem={_renderItem} data={slides} onDone={_onDone}></AppIntroSlider>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#15202B',
  },
  title: {
    fontSize: 24,
    color: "#fff",
    marginTop: 20
  },
  expand: {
    fontSize: 24,
    color: "#fff",
    marginTop: 5,
    marginLeft: 50
  },
  slide: {
    width: "100%",
    height: "100%",
    zIndex: -1
  },
  content: {
    fontSize: 38,
    color: "#1DA1F2",
    fontWeight: "bold"
  },
  description: {
    fontSize: 28,
    color: "#fff",
  },
  button: {
    marginTop: 16,
    borderRadius: 30,
    borderWidth: 1,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 30,
    paddingRight: 30,
    borderColor: "#fff"
  },
  buttonActive: {
    marginTop: 16,
    borderRadius: 30,
    borderWidth: 1,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 30,
    paddingRight: 30,
    borderColor: "#1DA1F2",
    backgroundColor: "#1DA1F2"
  },
  // image: {
  //   flex: 1,
  //   resizeMode: "cover",
  //   justifyContent: "center",
  //   zIndex:-1
  // },
  linearGradient: {
    zIndex: 99,
    width: "100%",
    height: "100%",

  }
});

export default Lesson;
