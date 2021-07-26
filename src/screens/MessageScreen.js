import React, { useEffect, useState } from 'react';
import { StyleSheet, View, StatusBar, FlatList, Text, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import NetInfo from "@react-native-community/netinfo";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { SearchBar } from 'react-native-elements';
import MenuDrawer from 'react-native-side-drawer'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import BoxChatActions from '../redux/actions/boxchats';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
const MessageScreen = ({ navigation }) => {
  const [open, setOpen] = useState(false)
  const [boxchats, setBoxchats] = useState([])
  const {account} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const checkConnection = async (state) =>{   
    if (state.isConnected) {
      try {
        const boxchats = await BoxChatActions.getAll(account.id);
        dispatch(boxchats)
        setBoxchats(boxchats.data);
      } catch (error) {
        console.log(error);
      }
    } 
    else {
      AsyncStorage.getItem('boxchats')
      .then(boxchat => {
        let data = JSON.parse(boxchat)
        setBoxchats(data)
      })
      
    }
 }
  useEffect(async () => {
    NetInfoSub = NetInfo.addEventListener(
      checkConnection,
    )

  }, [setBoxchats])
  const toggleOpen = () => {
    setOpen(!open);
  };
  const [search, setSearch] = useState('')
  const updateSearch = (search) => {
    setSearch({ search });
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
      <View style={{ flexDirection: "row" }}>
        <View style={{ width: 400, marginLeft: 10, marginTop: 10, flexDirection: "row" }}>
          <Image source={require('../assets/avatar.png')} style={{ width: 50, height: 50 }}></Image>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: "#fff", marginLeft: 16, marginTop: 8 }}>Chat</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('CreateGroup')}>
          <MaterialIcons
            name="group-add"
            size={32}
            color="#ffffff"
            style={{ marginLeft: 16, marginTop: 16, textAlign: "right" }}>
          </MaterialIcons>
        </TouchableOpacity>
      </View>

      <View style={styles.boxSearch}>
        <SearchBar
          placeholder="Type Here..."
          onChangeText={updateSearch}
          value={search}
          fontColor="#fff"
          iconColor="#fff"
          shadowColor="#fff"
          cancelIconColor="#c6c6c6"
          searchIcon="#fff"
        /></View>
      <View style={styles.bodyContainer}>
        <View style={styles.listContainer}>
          <FlatList
            data={boxchats}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <View style={styles.itemTopContainer}>
                  <View>
                    <Image source={require('../assets/avatar.png')} style={{ width: 70, height: 70 }}></Image>
                  </View>
                  <View style={styles.itemTopTextContainer}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Chat', { boxchatId: item.id })}
                    >
                      <Text style={styles.itemName}>{item.title}</Text>
                    </TouchableOpacity>
                    {/* <Text style={styles.itemDate}>{item.hostUsername}</Text> */}
                    <Text style={styles.itemDate}>{item.description}</Text>
                  </View>
                </View>
                <View style={styles.kengang}></View>
              </View>)}
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
  kengang: {
    width: '100%',
    borderBottomColor: '#ededed',
    borderBottomWidth: 1,
    marginTop: 20
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
    marginTop: 5
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
  boxSearch: {
    marginTop: 16,
    marginBottom: 16,
    backgroundColor: '#fff'
  },
  animatedBox: {
    flex: 1,
    backgroundColor: "#192734",
    padding: 10
  },
  // search : {
  //   backgroundColor:'#fff'
  // }
});

export default MessageScreen;