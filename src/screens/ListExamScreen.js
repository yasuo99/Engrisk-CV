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
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { SearchBar } from 'react-native-elements';
import NetInfo from "@react-native-community/netinfo";
import ModalDropdown from 'react-native-modal-dropdown';
import MenuDrawer from 'react-native-side-drawer'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ExamsActions from '../redux/actions/exams';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ListExamScreen = ({ navigation }) => {
    const [search, setSearch] = useState('')
    const updateSearch = (search) => {
        setSearch({ search });
    };
    const [open, setOpen] = useState(false)
    const [exams, setExams] = useState([])
    const checkConnection = async (state) =>{   
        if (state.isConnected) {
            try {
                const data = await ExamsActions.getAll();
                setExams(data.data)
            } catch (error) {
                console.log(error);
            }
        } 
        else {
          AsyncStorage.getItem('exams')
          .then(exam => {
            let data = JSON.parse(exam)
            setExams(data)
          })
          
        }
     }
    useEffect(async () => {
        NetInfoSub = NetInfo.addEventListener(
            checkConnection,
          )
    }, [setExams])
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
           <Text style={{ fontSize: 32, color: "#fff", marginLeft: 10, fontWeight: "bold", marginTop: 20 }}>Danh sách bài quiz</Text>
            <View style={{ flexDirection: "row" }}>
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
                    />
                </View>
                <ModalDropdown options={['option 1', 'option 2']}
                    dropdownStyle={{ backgroundColor: '#15202B', height: 80, width: 120, marginTop: 20, marginRight: -10 }}
                    dropdownTextStyle={{ backgroundColor: '#15202B', fontSize: 16, paddingLeft: 10, color: '#fff' }}
                    dropdownTextHighlightStyle={{ color: '#fff' }}
                    style={{ marginLeft: 20, marginTop: 20, backgroundColor: "#192734", width: 120, height: 58, alignItems: "center" }}>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ color: "#fff", fontSize: 18, marginRight: 35, marginTop: 15 }}>Bộ lọc</Text>
                        <FontAwesome
                            name="sort-down"
                            color="#ffffff"
                            size={28}
                            style={{ marginTop: 8 }}
                        />
                    </View>
                </ModalDropdown>

            </View>
            <ScrollView>
                {exams.map((exam, index) =>
                    <View style={styles.card} key={index}>
                        <View style={{ flexDirection: "row" }}>
                            <Image source={require('../assets/avatar2.png')} style={{ width: 48, height: 48, marginRight: 20 }}></Image>
                            <View style={{width:"78%"}}>
                                <Text style={{ fontSize: 24, color: "#fff", fontWeight: "400" }}>{exam.title}</Text>
                                <Text style={{ fontSize: 18, color: "#ccc", marginTop: 5 }}>Số câu hỏi: {exam.questions.length}</Text>
                                <Text style={{ fontSize: 18, color: "#ccc", marginTop: 5 }}>Độ khó: {exam.difficultLevel}</Text>
                            </View>
                            <View>
                                <TouchableOpacity>
                                    <FontAwesome
                                        name="share-alt"
                                        color="#ffffff"
                                        size={28}
                                    />
                                </TouchableOpacity>
                            </View>

                        </View>
                        <Image source={require('../assets/background.png')} style={{ width: "100%", marginTop: 10, height: 120 }}></Image>
                        <Text style={{ fontSize: 18, marginTop: 10, color: "#ccc" }}>{exam.description}</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Quiz', { quizId: exams.id })}>
                            <Text style={{ fontSize: 21, color: "#1DA1F2" }}>Làm ngay</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

export default ListExamScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#15202B'
    },
    boxSearch: {
        marginLeft: 10,
        marginTop: 16,
        marginBottom: 16,
        width: "65%",
    },
    card: {
        padding: 20,
        marginLeft: 10,
        width: "95%",
        backgroundColor: "#192734",
        borderRadius: 10,
        marginBottom: 30
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
