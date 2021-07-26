import React, { useState, useEffect } from 'react';
import { StyleSheet, View, StatusBar, FlatList, Text, Image, TouchableOpacity, ToastAndroid, Platform, Alert  } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import NetInfo from "@react-native-community/netinfo";
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MenuDrawer from 'react-native-side-drawer'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Accordion from 'react-native-collapsible/Accordion';
import WordCategoriesActions from '../redux/actions/wordCategory';
import Toast from 'react-native-simple-toast';
import { BaseApiUrl } from '../constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { set } from 'lodash';
const ListFlashCardScreen = ({ navigation }) => {
    const [open, setOpen] = useState(false)
    const [activeSections, setActiveSections] = useState([])
    const [wordCategories, setWordCategories] = useState([])
    const [test, setTest] = useState([])
    const [total, setTotal] = useState(1);
    const toggleOpen = () => {
        setOpen(!open);
    };
  
  const checkConnection = async (state) =>{   
     if (state.isConnected) {
          try{
            const wordcategories = await WordCategoriesActions.getAll(total);
            setWordCategories(wordcategories.data.items)
          }catch (error) {
            console.log(error);
          }
     } 
     else {
       AsyncStorage.getItem('wordCategories')
       .then(wordCategory => {
         let data = JSON.parse(wordCategory)
         setWordCategories(data)
       })
     }
  }
    useEffect(async () => {
        NetInfoSub = NetInfo.addEventListener(
        checkConnection,
      )
    },[setWordCategories,total])
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
    const inform = () => {
        ToastAndroid.showWithGravity(
            "Chủ đề này hiện chưa có từ vựng",
            ToastAndroid.LONG,
            ToastAndroid.TOP
          );
      };
      const number =async () => {
        const wordcategories =await WordCategoriesActions.getAll(total);
        if(wordcategories.data.totalPages > total){
          setTotal(total+1)
          console.log(total+1)
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
            <FlatList
                data={wordCategories}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={{ width: "90%", marginLeft: 20, marginTop: 30, paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: "#ccc" }}>
                        <View style={{ borderColor: "#ccc", borderWidth: 1, borderRadius: 10 }}>
                            <Image source={item.categoryImage ? { uri : `${ item.categoryImage.replace('http://localhost:5000/api/v2/streaming/image?image=','http://10.0.3.2:5000/')}`} : require('../assets/banner.jpg')} style={{ width: "100%", height: 100, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}></Image>
                            <TouchableOpacity onPress={item.words.length == 0 ?  () => {inform()} : () => { navigation.navigate('FlashCard', { WordCategoryId: item.id }) }}><Text style={{ color: "#fff", fontSize: 24, marginLeft: 16, marginTop: 8, fontWeight: "bold" }}>Chủ đề: {item.categoryName}</Text></TouchableOpacity>
                            <Text style={{ color: "#ccc", fontSize: 21, marginLeft: 16, marginBottom: 10 }}>{item.words.length} từ vựng</Text>
                        </View>
                    </View>)}
                 onEndReached={number}
                 onEndReachedThreshold={0}
            />
           
        </View>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: '#15202B'
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
    view: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    animatedBox: {
        flex: 1,
        backgroundColor: "#192734",
        padding: 10
    },
    test : {
        fontSize:18,
        color:"#111"
    }
});

export default ListFlashCardScreen;