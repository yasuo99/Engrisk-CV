import React, { useEffect, useState } from 'react';
import { StyleSheet, View, StatusBar, FlatList, Text, Image, TouchableOpacity, Button } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import NetInfo from "@react-native-community/netinfo";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MenuDrawer from 'react-native-side-drawer'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import NotificationActions from '../redux/actions/notifications';
import Moment from 'react-moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { notification } from '../components/NotificationPage/Notification'
import { useDispatch, useSelector } from 'react-redux';
const sendMessage = () => {
  notification.configure();
  notification.buatChannel("1");
  notification.kirimNotifikasiJadwal("1", "Thông báo", "Bạn đã có bài học mới về gia đình");
}
const NotificationItem = ({ item }) => (
  <View style={styles.itemContainer}>
    <View style={styles.itemTopContainer}>
      <View>
        <Image source={require('../assets/avatar.png')} style={{ width: 60, height: 60 }}></Image>
      </View>
      {/* <View><Moment format="YYYY/MM/DD"></Moment></View> */}

      <View style={styles.itemTopTextContainer}>
        <Text style={styles.itemName}>{item.content}</Text>
        <Moment element={Text} format="YYYY/MM/DD" style={{ color: "#fff", marginTop: 5 }}>{item.createdDate}</Moment>
        {/* <Button onPress={sendMessage} title="Nhận thông báo"></Button> */}
        {/* <View style={styles.itemDate}>{item.createdDate}</View> */}
        {/* <Text style={styles.itemDetail}>{item.status}</Text> */}
      </View>
    </View>

    <View style={styles.kengang}></View>
  </View>
);

const NotificationScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false)
  const [data, setData] = useState([])
  const {account} = useSelector(state => state.auth)
  const [isBusy, setIsBusy] = useState(true);
  const {notifications} = useSelector(state => state.notification)
  const checkConnection = async (state) =>{   
    if (state.isConnected) {
      try {
        const result = await NotificationActions.getData(account.id);
        dispatch(result)
      } catch (error) {
        console.log(error);
      }
    } 
    else {
      AsyncStorage.getItem('notification')
      .then(notified => {
        let data = JSON.parse(notified)
        setData(data)
      })
      
    }
 }
  useEffect(async () => {
    NetInfoSub = NetInfo.addEventListener(
      checkConnection,
    )

  }, [setData])
  useEffect(() => {
    if(notifications.length > 0){
      setData(notifications)
    }
  },[notifications.length])
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
      <Text style={{ marginTop: 20, marginBottom: 20, color: '#fff', fontSize: 36, fontWeight: 'bold', marginLeft: 10 }}>THÔNG BÁO</Text>
      <View style={styles.bodyContainer}>
        <View style={styles.listContainer}>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <NotificationItem item={item} />}
          />
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
  bodyContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  listContainer: {
    flex: 1,
  },
  itemContainer: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  itemTopContainer: {
    flexDirection: 'row',
  },
  itemTypeContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemTopTextContainer: {
    marginRight: 40,
    marginLeft: 8,
  },
  itemName: {
    color: '#fff',
    fontWeight: '400',
    fontSize: 18,
  },
  itemDate: {
    color: '#ccc',
    fontSize: 14,
    marginTop: 8,
  },
  itemDetail: {
    color: '#ccc',
    fontSize: 14,
    marginTop: 5,
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

export default NotificationScreen;