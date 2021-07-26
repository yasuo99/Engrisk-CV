import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, StatusBar, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import { Input } from 'react-native-elements/dist/input/Input';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MenuDrawer from 'react-native-side-drawer'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import BoxChatActions from '../redux/actions/boxchats';
import { useDispatch, useSelector } from 'react-redux';
import { connection } from '../constants/hubConnection';
const ChatScreen = ({ route, navigation }) => {
  const [open, setOpen] = useState(false)
  //Tạm thời set cứng ở đây để sử dụng
  const { account } = useSelector(state => state.auth);
  const [message, setMessage ] = useState('')
  const scrollViewRef = useRef();
  const [boxchat, setBoxchat] = useState({
    messages: []
  })
  const dispatch = useDispatch();
  const { boxchatId } = route.params
  const {current} = useSelector(state => state.boxchat);
  const toggleOpen = () => {
    setOpen(!open);
  };
  useEffect(async () => {
    try {
      const data = await BoxChatActions.getDetail(account.id, boxchatId);
      dispatch(data);
    } catch (error) {
      console.log(error);
    }
  }, [boxchatId])
  function sendMessage() {
    const newMessage = {
      boxchatId: boxchatId,
      fromId: account.id,
      fromUsername: account.username,
      content: message
    }
    setMessage('')
    connection.send('SendMessage',newMessage);
  }
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
            onPress={() => navigation.navigate('Message')}
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
      <View style={styles.chat}>
        <View style={styles.boxTitle}>
          <View>
            <Image source={require('../assets/avatar.png')} style={{ width: 70, height: 70 }}></Image>
          </View>
          <View style={styles.itemText}>
            <Text style={styles.itemName}>{boxchat.title}</Text>
            <Text style={styles.itemStatus}>Đang hoạt động</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('CreateMember')}>
            <MaterialIcons
              name="group-add"
              size={32}
              color="#ffffff"
              style={{ marginLeft: 16, marginTop: 16 }}></MaterialIcons>
          </TouchableOpacity>
        </View>
        <View style={styles.kengang}></View>
        <View style={styles.boxContent}>
          <ScrollView style={{ paddingRight: 16 }} ref={scrollViewRef} onContentSizeChange={() => scrollViewRef.current.scrollToEnd({animated: true})}>
            {current.messages.map((message, index) =>
              <View style={message.sender.name == account.username ? styles.contentRight : styles.contentLeft} key={index}>
                <View>
                  {message.sender.name !== account.username && <Image source={message.sender.avatar ? { uri: `${message.sender.avatar}` } : require('../assets/avatar.png')} style={{ width: 50, height: 50 }}></Image>}
                </View>
                <View style={message.sender.name == account.username ? styles.textRight : styles.textLeft} key={index}>
                  <Text style={{ color: "#fff", fontSize: 16, marginTop: 16, marginLeft: 16 }}>{message.text}</Text>
                </View>
              </View>
            )}
          </ScrollView>
        </View>
        <View style={styles.boxAnswer}>
          <View style={{ width: 400 }}>
            <Input placeholder="Aa" style={styles.inputAnswer} value={message} onChangeText={(val) => setMessage(val)}>

            </Input>
          </View>
          <View>
            <TouchableOpacity onPress={() => sendMessage()}>
              <Image source={require('../assets/send.png')} style={{ width: 32, height: 32, marginTop: 5 }}></Image>
            </TouchableOpacity>

          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#15202B'
  },
  kengang: {
    width: '100%',
    borderBottomColor: '#ededed',
    borderBottomWidth: 1,
    marginTop: 20
  },
  chat: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  boxTitle: {
    flexDirection: 'row',
  },
  boxContent: {
    height: '75%',
    marginTop: 16,
    marginBottom: 16
  },
  inputAnswer: {
    borderColor: "#f2f2f2",
    borderWidth: 1,
    borderRadius: 10,
    height: 30,
    fontSize: 16,
    padding: 10,
    backgroundColor: '#fff',
  },
  contentLeft: {
    flexDirection: 'row',
    width: "80%",
    marginTop: 5,
    marginBottom: 5
  },
  contentRight: {
    marginLeft: 60,
    marginTop: 5,
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  textRight: {
    backgroundColor: "#1DA1F2",
    paddingTop: 0,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
    borderRadius: 10,
    marginRight: 8
  },
  textLeft: {
    backgroundColor: "#192734",
    paddingTop: 0,
    // paddingLeft:10,
    paddingRight: 10,
    paddingBottom: 5,
    borderRadius: 10,
    marginLeft: 8
  },
  itemText: {
    marginRight: 40,
    marginLeft: 8,
    marginTop: 5,
    width: 260
  },
  boxAnswer: {
    flexDirection: 'row',
  },
  itemName: {
    color: '#fff',
    fontWeight: '400',
    fontSize: 21
  },
  itemStatus: {
    color: '#ccc',
    fontSize: 14,
    marginTop: 8,
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
  animatedBox: {
    flex: 1,
    backgroundColor: "#192734",
    padding: 10
  },
});

export default ChatScreen;