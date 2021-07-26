import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    StatusBar,
    FlatList,
    Text,
    Image,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { SearchBar } from 'react-native-elements';
import MenuDrawer from 'react-native-side-drawer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CheckBox from 'react-native-check-box';
const CreateGroupScreen = ({ navigation }) => {
    const [open, setOpen] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [active, setActive] = useState(true);
    const toggleOpen = () => {
        setOpen(!open);
    };
    const [search, setSearch] = useState('');
    const updateSearch = search => {
        setSearch({ search });
    };
    const checkActive = () => {
        setActive(!active)
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
            <View style={{ flexDirection: 'row' }}>
                <MenuDrawer
                    open={open}
                    drawerContent={drawerContent()}
                    drawerPercentage={45}
                    animationTime={250}
                    overlay={true}
                    opacity={0.4}>
                </MenuDrawer>
                <TouchableOpacity onPress={toggleOpen}>
                    <FontAwesome
                        name="bars"
                        color="#ffffff"
                        size={32}
                        style={{ marginLeft: 10, marginTop: 10, paddingTop: 5 }}
                    />
                </TouchableOpacity>
                <View>
                    <Text
                        style={{
                            fontWeight: 'bold',
                            fontSize: 42,
                            color: '#ffffff',
                            marginLeft: '35%',
                        }}>
                        ENGRISK
                    </Text>
                </View>
                <View style={styles.buttonExit}>
                    <TouchableOpacity
                        style={styles.exit}
                        onPress={() => navigation.navigate('Home')}>
                        <LinearGradient colors={['#1DA1F2', '#1DA1F2']} style={styles.exit}>
                            <Text
                                style={[
                                    styles.textExit,
                                    {
                                        color: '#fff',
                                    },
                                ]}>
                                Thoát
                            </Text>
                            <FontAwesome
                                name="sign-out"
                                color="#ffffff"
                                size={32}
                                style={{ marginLeft: 5 }}
                            />
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text
                    style={{
                        fontSize: 32,
                        color: '#fff',
                        fontWeight: 'bold',
                        marginTop: 10,
                        marginLeft: 10,
                        width: 380,
                    }}>
                    Thêm thành viên
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('CreateGroupTwo')}>
                    <Text
                        style={{
                            fontSize: 28,
                            color: '#fff',
                            fontWeight: 'bold',
                            marginTop: 16,
                            marginLeft: 10,
                        }}>
                        Tiếp
                    </Text>
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
                />
            </View>
            <View>
                <ScrollView style={{ flexDirection: "row" }} horizontal={true}>
                    {active === true ? (
                        <>
                        <View style={{ margin: 16, alignItems: 'center' }}>
                            <View style={{ flexDirection: "row" }}>
                                <Image
                                    source={require('../assets/avatar.png')}
                                    style={{ width: 70, height: 70, zIndex: -1 }}>
                                </Image>
                                <TouchableOpacity onPress={checkActive}>
                                    <MaterialIcons
                                        name="cancel"
                                        size={32}
                                        color="#ffffff"
                                        style={{ marginLeft: -20, zIndex: 1 }}></MaterialIcons>
                                </TouchableOpacity>
                            </View>
                            <Text style={{ color: '#fff', fontSize: 18, marginTop: 4 }}>
                                Thanh Lap
                            </Text>
                        </View>
                        <View style={{ margin: 16, alignItems: 'center' }}>
                            <View style={{ flexDirection: "row" }}>
                                <Image
                                    source={require('../assets/avatar.png')}
                                    style={{ width: 70, height: 70, zIndex: -1 }}>
                                </Image>
                                <TouchableOpacity onPress={checkActive}>
                                    <MaterialIcons
                                        name="cancel"
                                        size={32}
                                        color="#ffffff"
                                        style={{ marginLeft: -20, zIndex: 1 }}></MaterialIcons>
                                </TouchableOpacity>
                            </View>
                            <Text style={{ color: '#fff', fontSize: 18, marginTop: 4 }}>
                                Ngọc Thanh
                            </Text>
                        </View>
                        </>
                    ) : <View></View>}
                </ScrollView>
            </View>
            <Text style={{ fontSize: 24, fontWeight: "bold", margin: 16, color: "#fff" }}>Gợi ý</Text>
            <ScrollView style={{ marginLeft: 16, marginRight: 16 }}>
                <View style={{ flexDirection: 'row' }}>
                    <CheckBox
                        style={{ flex: 1, paddingBottom: 10, paddingTop: 10 }}
                        onClick={() => {
                            setIsChecked(!isChecked);
                        }}
                        isChecked={isChecked}
                        checkBoxColor={'#fff'}
                        checkedCheckBoxColor={'#1DA1F2'}
                        leftText={
                            <View style={{ flexDirection: 'row' }}>
                                <Image
                                    source={require('../assets/avatar.png')}
                                    style={{ width: 60, height: 60 }}></Image>
                                <Text style={{ color: '#fff', fontSize: 24, marginTop: 12, marginLeft: 10 }}>
                                    Thanh Lap
                                </Text>
                            </View>
                        }
                    />

                </View>
                <View style={{ flexDirection: 'row' }}>
                    <CheckBox
                        style={{ flex: 1, paddingBottom: 10, paddingTop: 10 }}
                        onClick={() => {
                            setIsChecked(!isChecked);
                        }}
                        isChecked={isChecked}
                        checkBoxColor={'#fff'}
                        checkedCheckBoxColor={'#1DA1F2'}
                        leftText={
                            <View style={{ flexDirection: 'row' }}>
                                <Image
                                    source={require('../assets/avatar.png')}
                                    style={{ width: 60, height: 60 }}></Image>
                                <Text style={{ color: '#fff', fontSize: 24, marginTop: 12, marginLeft: 10 }}>
                                    Ngọc Thanh
                                </Text>
                            </View>
                        }
                    />

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
    buttonExit: {
        marginTop: 8,
        marginLeft: 10,
    },
    exit: {
        flexDirection: 'row',
        borderRadius: 10,
        width: 80,
        height: 40,
        paddingTop: 5,
        paddingLeft: 5,
    },
    textExit: {
        paddingTop: 5,
        fontSize: 16,
    },
    boxSearch: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 25,
        backgroundColor: '#fff',
    },
    animatedBox: {
        flex: 1,
        backgroundColor: "#192734",
        padding: 10
    },
});

export default CreateGroupScreen;
