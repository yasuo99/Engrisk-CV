import React, { useState } from 'react';
import { StyleSheet, View, StatusBar, FlatList, Text, Image, TouchableOpacity, ImageBackground, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import Section from '../components/SectionPage/Section';
import MenuDrawer from 'react-native-side-drawer'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Accordion from 'react-native-collapsible/Accordion';
import { useSelector } from 'react-redux';
import ProgressBar from 'react-native-progress/Bar';
const ListSectionScreen = ({ navigation }) => {
    const [open, setOpen] = useState(false)
    const { lastRoute } = useSelector(state => state.route);
    const [activeSections, setActiveSections] = useState([])
    const toggleOpen = () => {
        setOpen(!open);
    };
    const SECTIONS = lastRoute.sections.map((section, index) =>
    ({
        key: index,
        id: section.id,
        routeId: section.routeId,
        lesson: `Bài ${index + 1}`,
        title: `${section.sectionName}`,
        imageLesson: require('../assets/avatar2.png'),
        expand: `${section.description}`,
        imageExpand: require('../assets/english.jpg'),
        time: '1 phút',
        scripts: section.scripts,
        done: section.donePercent
    }));

    //   const _renderSectionTitle = (section) => {
    //     return (
    //       <View style={styles.content}>
    //         <Text>{section.content}</Text>
    //       </View>
    //     );
    //   };

const _renderHeader = (section) => {
        return (
            <View style={{ flexDirection: "row", width: "90%", marginLeft: 20, marginTop: 30, paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: "#ccc" }}>
                <View style={{ flexDirection: "column" }}>
                    <Image source={section.imageLesson} style={{ width: 70, height: 70, borderRadius: 50 }}></Image>
                </View>
                <View style={{ flexDirection: "column", marginTop: 5, marginLeft: 16, width: "50%" }}>
                    <View style={{flexDirection:"row"}}>
                        <Text style={{ color: "#ccc", fontSize: 21,width:"110%" }}>{section.lesson}</Text>
                        <View style={{marginTop:5}}>
                        <ProgressBar progress={section.done/100} width={100} height={15} color={'#1DA1F2'} borderRadius={20} />
                        </View>
                        
                    </View>
                    
                    <Text style={{ color: "#fff", fontSize: 24, fontWeight: "bold" }}>{section.title}</Text>
                </View>
                <View>
                </View>
              
            </View>
        );
    };

    const _renderContent = (section) => {
        console.log('script', section);
        return (
            <LinearGradient
                colors={['rgba(2,33,64,0.4)', 'rgba(30,66,88,0.4)', 'rgba(30,66,88,0.4)']}
                style={styles.linearGradient}>
                <Image source={section.imageExpand} style={styles.image} ></Image>
                <View style={{ zIndex: 9999, marginTop: -140 }}>
                    <TouchableOpacity onPress={() => { navigation.navigate('Lesson',{scripts: JSON.stringify(section.scripts), title: section.title, expand: section.expand, sectionId: section.id, routeId: section.routeId})}}><Text style={{ marginLeft: 16, fontSize: 21, color: "#fff", fontWeight: "bold" }}>{section.expand}</Text></TouchableOpacity>
                    <Text style={{ marginLeft: 16, fontSize: 21, color: "#fff" }}>{section.time}</Text>
                    <View style={{ flexDirection: "row", marginLeft: 10, marginTop: 8 }}>
                        {section?.scripts.map((script, idx) =>
                    
                        <>
                            <MaterialIcons
                                key={idx}
                                name={'check-circle'}
                                size={32}
                                color= {script.isDone ? '#28a745' : '#1DA1F2'}
                                style={{marginRight:10}}>
                            </MaterialIcons>
                            {/* Màu icon khác */}
                             {/* <MaterialIcons
                                key={idx}
                                name="check-circle"
                                size={32}
                                color="#1DA1F2"
                                style={{marginRight:10}}>
                            </MaterialIcons> */}
                            </>
                        )}
                    </View>
                    
                </View>
            </LinearGradient>

        );
    };

    const _updateSections = (activeSections) => {
        setActiveSections(activeSections)
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
            <ScrollView>
                <Accordion
                    sections={SECTIONS}
                    activeSections={activeSections}
                    // renderSectionTitle={_renderSectionTitle}
                    renderHeader={_renderHeader}
                    renderContent={_renderContent}
                    onChange={_updateSections}
                    underlayColor={""}
                />
            </ScrollView>
            
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
    image: {
        width: "100%",
        height: 150,
        zIndex: -1
    },
    linearGradient: {
        zIndex: 99,
        width: "90%",
        marginLeft: 20,
        height: 140,
    },

});

export default ListSectionScreen;