import React, { useEffect, useState } from 'react';
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
  Button,
  useWindowDimensions,
  ToastAndroid
} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import MenuDrawer from 'react-native-side-drawer'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AxiosService from '../utils/AxiosService';
import Spinner from 'react-native-loading-spinner-overlay';
import HomeActions from '../redux/actions/home';
import { BaseApiUrl } from '../constants/api';
import RouteActions from '../redux/actions/routes';
import { useDispatch, useSelector } from 'react-redux';
import AuthorizationActions from '../redux/actions/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from "@react-native-community/netinfo";
import { connection } from '../constants/hubConnection';
import { HubConnectionState } from '@microsoft/signalr';
import NotificationActions from '../redux/actions/notifications';
import BoxChatActions from '../redux/actions/boxchats';
const HomeScreen = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalTwoVisible, setModalTwoVisible] = useState(false);
  const [active, setActive] = useState(false)
  const [open, setOpen] = useState(false)
  const [homeData, setHomeData] = useState({
    quizzes: [],
    users: [],
    words: [],
    routes: {
      engrisk: [],
      private: []
    }
  })
  const [isBusy, setIsBusy] = useState(true);
  const [selectUser, setSelectUser] = useState({})
  const { lastRoute } = useSelector(state => state.route);
  const { account, token, loggedIn } = useSelector(state => state.auth);
  const dispatch = useDispatch()
  const toggleModalTwo = () => {
    setModalTwoVisible(!isModalTwoVisible);
  };
  const toggleModal = (user) => {
    setModalVisible(!isModalVisible);
    setSelectUser(user)
  };
  const checkConnection = async (state) => {
    if (state.isConnected) {
      async function fetchData() {
        try {
          const data = await HomeActions.getData(account.id);
          const routes = await RouteActions.getAll(account.id);
          dispatch(RouteActions.saveAll(routes.routes))
          setHomeData({
            ...homeData,
            quizzes: data.data.quizzes,
            users: data.data.users,
            words: data.data.words,
            routes: routes.routes
          });
          setIsBusy(false);
        } catch (error) {
          console.log(error);
        }
      }
      if (Object.keys(account).length > 0) {
        fetchData();
      }
    }
    else {
      async function fetchData() {
        AsyncStorage.getItem('home')
          .then(home => {
            let data = JSON.parse(home)
            setHomeData({
              ...homeData,
              quizzes: data.quizzes,
              users: data.users,
              words: data.words,
              routes: routes.routes
            });
          })
        AsyncStorage.getItem('routes')
          .then(route => {
            let routes = JSON.parse(route)
            dispatch(RouteActions.saveAll(routes.routes))
          })
        setIsBusy(false);
      }
      AsyncStorage.getItem('account')
        .then(account => {
          if (Object.keys(account).length > 0) {
            fetchData();
          }
        })
    }
  }
  // React.useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     Alert.alert('Refreshed');
  //   });
  //   return unsubscribe;
  // }, [navigation]);
  useEffect(() => {
    NetInfoSub = NetInfo.addEventListener(
      checkConnection,
    )
    console.log('token', token);
    console.log('state', connection.state);
      if(connection.state == HubConnectionState.Disconnected){
        connection.start().then(() => 
        console.log('Kết nối thành công'));
        connection.on('NewNotification', (data) => {
          console.log('Nhận đc rồi nè');
          var notification = JSON.parse(data);
          dispatch(NotificationActions.newNotify(notification));
        });
        connection.on('NewMessage', (data) => {
          console.log('Nhận đc rồi nè');
          const dataParsed = JSON.parse(data);
          console.log(dataParsed);
          dispatch(BoxChatActions.newMessage(dataParsed));
      });
      }
    // async function fetchData() {
    //   try {
    //     const data = await HomeActions.getData(account.id);
    //     const routes = await RouteActions.getAll(account.id);
    //     console.log(routes);
    //     dispatch(RouteActions.saveAll(routes.routes))
    //     setHomeData({
    //       ...homeData,
    //       quizzes: data.data.quizzes,
    //       users: data.data.users,
    //       words: data.data.words,
    //       routes: routes.routes
    //     });
    //     setIsBusy(false);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    // if (Object.keys(account).length > 0) {
    //   fetchData();
    // }
  }, [account])
  async function LogOut() {
    try {
      const result = await AuthorizationActions.onLogout();
      dispatch(result)
    } catch (error) {
      console.log(error);
    }

  }
  const toggleOpen = () => {
    setOpen(!open);
  };
  const selectRoute = (route) => {
    dispatch(RouteActions.select(route))
  }
  const renderTabBar = props => (
    <TabBar
      renderLabel={({ route }) => (
        <Text style={{ color: '#fff', fontSize: 21, fontWeight: 'bold' }}>
          {route.title}
        </Text>
      )}
      {...props}
      style={{ backgroundColor: "#1DA1F2", borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
      scrollEnabled={false} />
  )
  const FirstRoute = () => (
    <ScrollView>
      <Text style={{ fontSize: 28, color: '#1DA1F2', fontWeight: 'bold', margin: 10 }}>Bạn đang học</Text>
      {homeData.routes?.engrisk?.map((route, index) =>
        <View style={styles.boxRouteWord} key={index} onStartShouldSetResponder={() => selectRoute(route)}>
          <TouchableOpacity onPress={()=>navigation.navigate('ListSection')}><Text style={styles.title}>{route.title}</Text></TouchableOpacity>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flexDirection: "column", width: 220 }}>
              <Text style={styles.content}>{route.description}</Text>
            </View>
            <View style={{ flexDirection: "column", width: 180 }}>
              <Image source={route.routeImage ? { uri: `${route.routeImage}` } : { require: ('../assets/abideby.jpeg') }} style={{ width: 200, height: 80 }}></Image>
            </View>
          </View>
          <Text style={styles.result}>Hoàn thành {route.done}/{route.sections.length}</Text>
        </View>
      )}
    </ScrollView>
  );

  const SecondRoute = () => (
    <ScrollView>
      <Text style={{ fontSize: 28, color: '#1DA1F2', fontWeight: 'bold', margin: 10 }}>Bạn đang học</Text>
      {homeData.routes?.private?.map((route, index) =>
        <View style={styles.boxRouteWord} key={index} onStartShouldSetResponder={() => selectRoute(route)}>
           <TouchableOpacity onPress={()=>navigation.navigate('ListSection')}><Text style={styles.title}>{route.title}</Text></TouchableOpacity>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flexDirection: "column", width: 220 }}>
              <Text style={styles.content}>{route.description}</Text>
            </View>
            <View style={{ flexDirection: "column", width: 180 }}>
              <Image source={route.routeImage ? { uri: `${route.routeImage}` } : { require: ('../assets/abideby.jpeg') }} style={{ width: 200, height: 80 }}></Image>
            </View>
          </View>
          <Text style={styles.result}>Hoàn thành {route.done}/{route.sections.length}</Text>
        </View>
      )}
    </ScrollView>
  );
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Engrisk' },
    { key: 'second', title: 'Của bạn' },
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });
  const inform = () => {
    ToastAndroid.showWithGravity(
      "Bài luyện tập này hiện chưa có câu hỏi",
      ToastAndroid.LONG,
      ToastAndroid.TOP,
    );
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
        <TouchableOpacity style={{ flexDirection: "row", marginTop: "100%" }} onPress={() => { LogOut(), setOpen(!open) }}>
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
          <Text style={{ fontWeight: 'bold', fontSize: 42, color: '#ffffff', marginLeft: '35%' }}>ENGRISH</Text>
        </View>
        <TouchableOpacity onPress={() => { toggleModalTwo(), setOpen(false) }}>
          <Image source={require('../assets/icon.png')} style={{ marginTop: 20, marginLeft: 60 }}></Image>
        </TouchableOpacity>

      </View>
      {isBusy && <Spinner
        visible={isBusy}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />}
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={styles.boxQuiz}>
          <View style={{ flexDirection: "row", marginBottom: 20, width: "100%" }} >
            <View style={{ width: "85%" }}>
              <Text style={{ fontSize: 32, color: '#fff', fontWeight: 'bold' }}>Gợi ý luyện tập</Text>
            </View>
            <TouchableOpacity onPress={() => { navigation.navigate("ListExam") }}>
              <Text style={{ fontSize: 16, color: '#fff', paddingTop: 20 }}>Tất cả</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal={true}
            pagingEnabled
            showsHorizontalScrollIndicator={false}>
            {!isBusy && homeData.quizzes.map((quiz, index) =>
              <View style={styles.box} key={index}>
                <TouchableOpacity animation="fadeInLeft" onPress={quiz.questions.length == 0 ? () => { inform() } : () => navigation.navigate('Quiz', { quizId: quiz.id })}>
                  <ScrollView style={{ height: 100 }}><Text style={styles.titleQuiz}>{quiz.quizName}</Text></ScrollView>
                </TouchableOpacity>
                <Text style={styles.question}>Số câu hỏi: {quiz.questions.length}</Text>
                <Text style={styles.level}>Độ khó: {quiz.difficultLevel}</Text>
              </View>)
            }
          </ScrollView>
          <View style={styles.kengang}></View>
        </View>
      </View>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={styles.boxWord}>
          <View style={{ flexDirection: "row", marginBottom: 20, width: "100%" }} >
            <View style={{ width: "85%" }}>
              <Text style={{ fontSize: 32, color: '#fff', fontWeight: 'bold' }}>Từ vựng hôm nay</Text>
            </View>
            <TouchableOpacity onPress={() => { navigation.navigate('ListFlashCard') }}>
              <Text style={{ fontSize: 16, color: '#fff', paddingTop: 20 }}>Tất cả</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal={true}
            pagingEnabled
            showsHorizontalScrollIndicator={false}>
            {!isBusy && homeData.words.map((word, index) =>
              <View style={styles.box} key={index}>
                {/* <TouchableOpacity animation="fadeInLeft" onPress={() => navigation.navigate('ListFlashCard')}> */}
                <ScrollView style={{ height: 36 }}>
                  <Text style={styles.word} >{word.eng}</Text>
                </ScrollView>
                {/* </TouchableOpacity> */}
                <Text style={styles.spelling}>{word.spelling}</Text>
                <Image source={word.wordImg ? { uri : `${ word.wordImg.replace('http://localhost:5000/api/v2/streaming/image?image=','http://10.0.3.2:5000/')}`} : require('../assets/abideby.jpeg')} style={{ width: 170, height: 100, justifyContent: "flex-end" }}></Image>
              </View>
            )}
          </ScrollView>
          <View style={styles.kengang}></View>
        </View>
      </View>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={styles.boxUser}>
          <View style={{ flexDirection: "row", marginBottom: 5, width: "100%" }} >
            <View style={{ width: "85%" }}>
              <Text style={{ fontSize: 32, color: '#fff', fontWeight: 'bold' }}>Top users</Text>
            </View>
            <View >
              <Text style={{ fontSize: 16, color: '#fff', paddingTop: 20 }}>Tất cả</Text>
            </View>
          </View>
          <ScrollView
            horizontal={true}
            pagingEnabled
            showsHorizontalScrollIndicator={false}>
            {!isBusy && homeData.users.map((user, index) =>
              <TouchableOpacity style={styles.user} key={index} onPress={() => toggleModal(user)}>
                <Image source={user.photoUrl ? { uri: `${user.photoUrl}` } : require('../assets/avatar.png')} style={styles.image}></Image>
                <Text style={styles.name}>{user.username}</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
          <Modal onBackdropPress={() => setModalVisible(false)} isVisible={isModalVisible} backdropOpacity={0} deviceWidth={100} swipeDirection={'down'}
            style={styles.view}>
            <View style={styles.modal}>
              <Image source={selectUser.photoUrl ? { uri: `${selectUser.photoUrl}` } : require('../assets/avatar.png')} style={styles.image}></Image>

              <TouchableOpacity onPress={() => { setActive(!active) }}>
                {active === false ?
                  <Text style={styles.buttonModal}>Theo dõi</Text> :
                  <Text style={styles.buttonModalActive}>Đang theo dõi</Text>
                }
              </TouchableOpacity>
              <Text style={{ color: "#fff", fontSize: 21, fontWeight: "400", marginTop: 5 }}>{selectUser.username}</Text>
              <Text style={{ color: "#fff", fontSize: 21, fontWeight: "400", marginTop: 5 }}>Kinh nghiệm: 100k</Text>
              <Text style={{ color: "#fff", fontSize: 21, fontWeight: "400", marginTop: 5 }}>Trình độ: Medium</Text>
              <Text style={{ color: "#fff", fontSize: 21, fontWeight: "400", marginTop: 5 }}>Tham gia từ: 2018</Text>
              <Text style={{ color: "#fff", fontSize: 21, fontWeight: "400", marginTop: 5 }}>Số bài exam đã làm: 10</Text>
              <Text style={{ color: "#fff", fontSize: 21, fontWeight: "400", marginTop: 5 }}>Số từ vựng đã học: 200</Text>

            </View>
          </Modal>

          <Modal onBackdropPress={() => setModalTwoVisible(false)} isVisible={isModalTwoVisible} backdropOpacity={0} deviceWidth={100} swipeDirection={'down'}
            style={styles.view}>
            <View style={styles.modalTwo}>
              <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                renderTabBar={renderTabBar}
              />
              <View style={{flexDirection:"row",marginBottom:10,marginTop:20, justifyContent:"center",alignContent:"center"}}>
                <TouchableOpacity onPress={()=> setModalTwoVisible(false)} style={styles.button}><Text style={styles.textButton}>Quay lại</Text></TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=> {navigation.navigate('ListSection'),setModalTwoVisible(false)}}><Text style={styles.textButton}>Học ngay</Text></TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </View>

    </View>

  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15202B'
  },
  boxQuiz: {
    marginTop: 20,
    marginLeft: 10,
    height: 330,
    width: "100%",
    paddingBottom: 20,
    justifyContent: "center",
    paddingHorizontal: 10,
    alignItems: 'center'
  },
  boxWord: {
    marginTop: 70,
    marginLeft: 10,
    paddingBottom: 20,
    height: 330,
    width: "100%",
    justifyContent: "center",
    paddingHorizontal: 10,
    alignItems: 'center'
  },
  button: {
    width: 150,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginRight: 20,
    marginLeft: 20,
    backgroundColor:"#1DA1F2"
  },
  textButton: {
    fontSize: 18,
    fontWeight: 'bold',
    color:"#fff"
  },
  boxUser: {
    marginTop: 110,
    marginLeft: 10,
    paddingBottom: 20,
    height: 200,
    width: "100%",
    justifyContent: "center",
    paddingHorizontal: 10,
    alignItems: 'center'
  },
  box: {
    flex: 1,
    backgroundColor: '#192734',
    marginRight: 20,
    padding: 20,
    borderRadius: 20,
    width: 210,
    marginBottom: 20,
  },
  user: {
    marginTop: -30,
    textAlign: 'center',
    flex: 1,
    width: 115,
    backgroundColor: 'transparent',
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    marginTop: 5,
    width: 70,
    height: 70,
    marginBottom: 5,
    borderRadius: 50
  },
  titleQuiz: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '400',
    paddingBottom: 20,
    textAlign: 'center'
  },
  name: {
    color: '#fff',
    fontSize: 16,
  },
  question: {
    color: '#8899A6',
    fontSize: 16,
    paddingBottom: 16
  },
  level: {
    color: '#8899A6',
    fontSize: 16,
    paddingBottom: 16
  },
  time: {
    color: '#8899A6',
    fontSize: 16,
    paddingBottom: 16
  },
  word: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 24,
    paddingBottom: 16,
    fontWeight: 'bold',
    // height:40
  },
  spelling: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    paddingBottom: 16
  },
  kengang: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#f4f4f4',
  },
  modalTwo: {
    // height: 400,
    flex:1,
    marginBottom: 65,
    color: "#fff",
    backgroundColor: "#192734",
    borderRadius: 20,
    opacity: 0.95,
    padding:20,
    shadowColor: "#1DA1F2",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.5,
  },
  modal: {
    marginBottom: 65,
    alignItems: "center",
    color: "#fff",
    backgroundColor: "#192734",
    borderRadius: 20,
    opacity: 0.95,
    padding: 20,
    shadowColor: "#1DA1F2",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.5,
  },
  buttonModal: {
    borderColor: "#1DA1F2",
    borderWidth: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    color: "#1DA1F2",
    borderRadius: 10,
    marginTop: 20,
    fontSize: 21
  },
  buttonModalActive: {
    // borderColor:"#1DA1F2",
    // borderWidth:1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    color: "#fff",
    borderRadius: 10,
    marginTop: 20,
    fontSize: 21,
    backgroundColor: "#1DA1F2"
  },
  animatedBox: {
    flex: 1,
    backgroundColor: "#192734",
    padding: 10
  },
  view: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
  boxRouteQuiz: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16
  },
  boxRouteWord: {
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16
  },
  title: {
    color: '#1DA1F2',
    fontSize: 21,
    fontWeight: 'bold'
  },
  content: {
    color: '#15202B',
    fontSize: 18,
    paddingTop: 8,
    paddingBottom: 8
  },
  result: {
    color: '#1DA1F2',
    fontSize: 21,
    fontWeight: 'bold'
  }
});
