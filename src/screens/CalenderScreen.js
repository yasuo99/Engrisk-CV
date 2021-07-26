import React, { useState, useEffect, useCallback } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity, StatusBar, Image, ScrollView, TextInput } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import MenuDrawer from 'react-native-side-drawer'
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-date-picker'
import { useFocusEffect } from '@react-navigation/native';
import { notification } from '../components/NotificationPage/Notification'
import Modal from 'react-native-modal';
import Moment from 'moment';
const CalenderScreen = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalEditVisible, setModalEditVisible] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState([])
  const [open, setOpen] = useState(false)
  const [reminder, setReminder] = useState([])
  const [dateSelect, setDateSelect] = useState([])
  const [count, setCount] = useState(0)
  const [checkDM, setCheckDM] = useState(false)
  async function loadData() {
    await AsyncStorage.getItem('reminder4')
      .then(reminder => {
        let data = JSON.parse(reminder)
        setReminder(data);
        console.log(data)
        setCount(count + 1)
        console.log('reload', count);
      });
  }
  useEffect(() => {
    loadData();
  }, [checkDM])
  const [data, setData] = useState(
    {
      title: '',
      content: '',
      time: new Date(),
    });
  const [check, setCheck] = useState(
    {
      checkTitle: false,
      checkContent: false,
      checkTime: false,
    });
  const handleTitle = (val) => {
    setData({
      ...data,
      title: val,

    });
    setCheck({
      checkTitle: true
    })
  }
  const handleContent = (val) => {
    setData({
      ...data,
      content: val,

    });
    setCheck({
      checkContent: true
    })
  }
  const handleTime = (val) => {
    console.log(val)
    // let date = val.toLocaleString('vi', { timeZone: 'America/New_York' })
    setData({
      ...data,
      time: val
    });
    setCheck({
      checkTime: true
    })
  }
  const clearData = () => {
    setData({
      title: '',
      content: '',
      time: data.time,
    })
    setCheck({
      checkTitle: false,
      checkContent: false,
      checkTime: false,
    })
    let date = new Date(data.time);
    console.log("hello", data.time)
    onDateChange(date);
  };
  const showModal = () => {
    setModalVisible(!isModalVisible);
  }
  const showModalEdit = () => {
    setModalEditVisible(!isModalEditVisible);
  }
  const onDateChange = (date) => {
    setDateSelect(date)
    setData({
      time: new Date(date)
    })
    let test = [];
    // console.log(reminder)
    if (reminder) {
      reminder.map((item, index) => {
        if (item.time.toString().slice(0, 10) == JSON.stringify(date).slice(1, 11)) {
          test.push({
            key: index,
            title: item.title,
            content: item.content,
            time: item.time,

          })
        }
      })
      setSelectedStartDate(test)
    }

    // console.log(JSON.stringify(test.time).slice(1, 11))
  }
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
  let customDatesStyles = [];
  const dateTime = new Date().toString().slice(8, 10);
  if (reminder) {
    reminder.map((item, index) => {
      if (item.time.toString().slice(8, 10) > dateTime) {
        customDatesStyles.push({
          key: index,
          date: item.time,
          style: { backgroundColor: '#E7453C' },
          textStyle: { color: 'black' },
          containerStyle: [],
          allowDisabled: true,
        });
      }
      else {
        customDatesStyles.push({
          key: index,
          date: item.time,
          style: { backgroundColor: '#D4953D' },
          textStyle: { color: 'black' },
          containerStyle: [],
          allowDisabled: true,
        });
      }
    })
  }
  else {
    customDatesStyles.push({
      date: new Date(),
      style: { backgroundColor: '#1DA1F2' },
      textStyle: { color: 'black' },
      containerStyle: [],
      allowDisabled: true,
    });
  }
  const getData = (data) => {
    AsyncStorage.getItem('editReminder')
      .then(editReminder => {
        const test = [];
        test.push(data)
        AsyncStorage.setItem('editReminder', JSON.stringify(test))
        console.log(test);
        setData({
          title: data.title,
          content: data.content,
          time: new Date(data.time)

        })
      })
  }
  const createReminder = () => {
    notification.configure();
    notification.buatChannel(1);
    notification.kirimNotifikasiJadwal(1, "Thông báo nhắc nhở", data.time, data.content);

    AsyncStorage.getItem('reminder4')
      .then(reminder => {
        if (reminder !== null) {
          const test = JSON.parse(reminder)
          test.push(data)
          AsyncStorage.setItem('reminder4', JSON.stringify(test))
          setCheckDM(!checkDM)
        }
        else {
          const test = [];
          test.push(data)
          AsyncStorage.setItem('reminder4', JSON.stringify(test))
          console.log(reminder);
          setCheckDM(!checkDM)
        }
      })
    setData({
      title: '',
      content: '',
      time: data.time,

    })
    setCheck({
      checkTitle: false,
      checkContent: false,
      checkTime: false,
    })
  }
  const editReminder = () => {
    notification.configure();
    notification.buatChannel(1);
    notification.kirimNotifikasiJadwal(1, "Thông báo nhắc nhở", data.time, data.content);
    AsyncStorage.getItem('editReminder')
      .then(editReminder => {
        let dataReminder = JSON.parse(editReminder)
        console.log(dataReminder)
        dataReminder.map((item, index) => {
          console.log(item.key);
          AsyncStorage.getItem('reminder4')
            .then(reminder4 => {
              let data2 = JSON.parse(reminder4)
              data2[item.key].title = data.title
              data2[item.key].content = data.content
              data2[item.key].time = data.time
              AsyncStorage.setItem('reminder4', JSON.stringify(data2))
              setCheckDM(!checkDM)
            })
        })
      })
    setData({
      title: '',
      content: '',
      time: data.time,

    })
    setCheck({
      checkTitle: false,
      checkContent: false,
      checkTime: false,
    })
    navigation.navigate('Calender')
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
      <View style={{ marginTop: 60,flex:1 }}>
        <CalendarPicker
          onDateChange={onDateChange}
          customDatesStyles={customDatesStyles}
          textStyle={{
            color: '#fff',
          }}
          selectedDayStyle={{
            backgroundColor: '#1DA1F2',
            color: '#fff'
          }}
          monthTitleStyle={{
            fontSize: 42
          }}
          yearTitleStyle={{
            fontSize: 42
          }}
          selectedDayTextColor='#fff'
          todayBackgroundColor="#1DA1F2"
          dayLabelsWrapper={{
            borderBottomColor: '#fff',
            borderTopColor: '#fff'
          }}

        />

        <View>
          {
            selectedStartDate.length === 1 ? (
              JSON.stringify(dateSelect).slice(9, 11) < dateTime ?
                <View style={{ borderTopColor: "#ccc", borderTopWidth: 1, marginLeft: 20, marginRight: 20, marginTop: 20, paddingTop: 10 }}>
                  <Text style={{ color: "#1DA1F2", fontWeight: "400", fontSize: 21 }}>Sự kiện của bạn</Text>
                  <View style={{ flexDirection: "row", marginTop: 8 }}>
                    <Text style={{ color: "#fff", fontSize: 18 }}>
                      {
                        selectedStartDate.map((item, index) => {
                          var d = new Date(item.time);
                          if (d.getUTCMinutes() < 10) {
                            var minutes = `0${d.getUTCMinutes()}`
                            return `${d.getUTCHours()}:${minutes} : `
                          }
                          else {
                            return `${d.getUTCHours()}:${d.getUTCMinutes()} : `
                          }

                        })
                      }
                    </Text>
                    <Text style={{ color: "#fff", fontSize: 18 }}>
                      {
                        selectedStartDate.map((item, index) => item.content)
                      }
                    </Text>
                  </View>
                </View> :
                <View style={{ borderTopColor: "#ccc", borderTopWidth: 1, marginLeft: 20, marginRight: 20, marginTop: 20, paddingTop: 10 }}>
                  <Text style={{ color: "#1DA1F2", fontWeight: "400", fontSize: 21 }}>Sự kiện của bạn</Text>
                  {
                    selectedStartDate.map((item, index) =>
                      <View style={{ flexDirection: "row", marginTop: 8 }} key={index}>
                        <Text style={{ color: "#fff", fontSize: 18 }}>
                          {
                            (new Date(item.time)).getUTCMinutes() < 10 ? `${(new Date(item.time)).getUTCHours()}:0${(new Date(item.time)).getUTCMinutes()} : ` : `${(new Date(item.time)).getUTCHours()}:${(new Date(item.time)).getUTCMinutes()} : `
                          }
                        </Text>
                        <Text style={{ color: "#fff", fontSize: 18, width: "80%" }}>{item.content}</Text>
                        <TouchableOpacity onPress={() => { getData(item), showModalEdit(true) }} style={{ width: 50 }}>
                          <FontAwesome
                            name="edit"
                            color="#ffffff"
                            size={24}
                          />
                        </TouchableOpacity>
                      </View>
                    )}
                </View>
            ) : (selectedStartDate.length > 1 ?
              (JSON.stringify(dateSelect).slice(9, 11) < dateTime ?
                <ScrollView ScrollView style={{ height: 250 }}>
                  {
                    selectedStartDate.map((item, index) =>
                      <View style={{ borderTopColor: "#ccc", borderTopWidth: 1, marginLeft: 20, marginRight: 20, marginTop: 20, paddingTop: 10 }} key={index}>
                        <Text style={{ color: "#1DA1F2", fontWeight: "400", fontSize: 21 }}>Sự kiện của bạn</Text>

                        <View style={{ flexDirection: "row", marginTop: 8 }}>
                          <Text style={{ color: "#fff", fontSize: 18, width: "13%" }}>
                            {
                              (new Date(item.time)).getUTCMinutes() < 10 ? `${(new Date(item.time)).getUTCHours()}:0${(new Date(item.time)).getUTCMinutes()} : ` : `${(new Date(item.time)).getUTCHours()}:${(new Date(item.time)).getUTCMinutes()} : `
                            }
                          </Text>
                          <Text style={{ color: "#fff", fontSize: 18, width: "80%" }}>{item.content}</Text>

                        </View>
                      </View>
                    )
                  }

                </ScrollView> :
                <ScrollView ScrollView style={{ height: 250 }}>
                  {
                    selectedStartDate.map((item, index) =>
                      <View style={{ borderTopColor: "#ccc", borderTopWidth: 1, marginLeft: 20, marginRight: 20, marginTop: 20, paddingTop: 10 }} key={index}>
                        <Text style={{ color: "#1DA1F2", fontWeight: "400", fontSize: 21 }}>Sự kiện của bạn</Text>

                        <View style={{ flexDirection: "row", marginTop: 8 }}>
                          <Text style={{ color: "#fff", fontSize: 18, width: "13%" }}>
                            {
                              (new Date(item.time)).getUTCMinutes() < 10 ? `${(new Date(item.time)).getUTCHours()}:0${(new Date(item.time)).getUTCMinutes()} : ` : `${(new Date(item.time)).getUTCHours()}:${(new Date(item.time)).getUTCMinutes()} : `
                            }
                          </Text>
                          <Text style={{ color: "#fff", fontSize: 18, width: "80%" }}>{item.content}</Text>
                          <TouchableOpacity onPress={() => { getData(item), showModalEdit(true) }} style={{ width: 50 }}>
                            <FontAwesome
                              name="edit"
                              color="#ffffff"
                              size={24}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                </ScrollView>
              ) : <></>
            )
          }

        </View>
        <View style={{flexDirection:"row", justifyContent:"flex-end",flex:1, marginBottom:30,alignItems:"flex-end"}}>
          <TouchableOpacity
            onPress={() => { showModal(true) }}
            style={styles.btn_container}>
            <Icon name="add" size={24} color="#fff"></Icon>
          </TouchableOpacity>
        </View>
        <Modal onBackdropPress={() => setModalVisible(false)} isVisible={isModalVisible} backdropOpacity={0} deviceWidth={100} swipeDirection={'down'}
          style={styles.view}>
          <View style={styles.modal}>
            <View
              style={styles.content}
            >
              <Text style={styles.text_titleScreen}>Thêm nhắc nhở</Text>
              <Text style={styles.text_title}>Tiêu đề <Text style={{ color: '#FF0000', fontSize: 18 }}>*</Text>
              </Text>
              <View style={styles.action}>
                <TextInput
                  placeholder="Tiêu đề"
                  placeholderTextColor="#1DA1F2"
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={(val) => handleTitle(val)}
                  value={data.title}
                />
              </View>
              <Text style={styles.text_content}>Nội dung <Text style={{ color: '#FF0000', fontSize: 18 }}>*</Text>
              </Text>
              <View style={styles.action}>
                <TextInput
                  placeholder="Nội dung"
                  placeholderTextColor="#1DA1F2"
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={(val) => handleContent(val)}
                  value={data.content}
                />
              </View>
              <Text style={styles.text_time}>Thời gian <Text style={{ color: '#FF0000', fontSize: 18 }}>*</Text>
              </Text>

              <View style={styles.boxDate}>
                <DatePicker
                  date={data.time}
                  onDateChange={(val) => handleTime(val)}
                  mode="time"
                  style={{ width: 400, marginTop: 10, height: 120, backgroundColor: "#fff" }}
                  androidVariant="nativeAndroid"
                />
              </View>
              <View style={{ flexDirection: "row", justifyContent: 'flex-end', alignItems: "flex-end", flex: 1, bottom: 30 }}>
                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", flex: 1 }} >
                  <View style={styles.button}>
                    <TouchableOpacity
                      style={styles.create}
                      onPress={() => { clearData(), showModal(true) }}
                    >
                      <LinearGradient
                        colors={['#1DA1F2', '#1DA1F2']}
                        style={styles.create}
                      >
                        <Text style={[styles.textCreate, {
                          color: '#fff'
                        }]}>Quay lại</Text>
                      </LinearGradient>

                    </TouchableOpacity>
                  </View>
                  <View style={styles.button}>
                    <TouchableOpacity
                      style={styles.create}
                      onPress={() => createReminder()}
                    >
                      <LinearGradient
                        colors={['#1DA1F2', '#1DA1F2']}
                        style={styles.create}
                      >
                        <Text style={[styles.textCreate, {
                          color: '#fff'
                        }]}>Thêm</Text>
                      </LinearGradient>

                    </TouchableOpacity>
                  </View>
                </View>
              </View>

            </View>

          </View>
        </Modal>

        <Modal onBackdropPress={() => setModalEditVisible(false)} isVisible={isModalEditVisible} backdropOpacity={0} deviceWidth={100} swipeDirection={'down'}
          style={styles.view}>
          <View style={styles.modal}>
            <View
              style={styles.content}
            >
              <Text style={styles.text_titleScreen}>Sửa nhắc nhở</Text>
              <Text style={styles.text_title}>Tiêu đề <Text style={{ color: '#FF0000', fontSize: 18 }}>*</Text>
              </Text>
              <View style={styles.action}>
                <TextInput
                  placeholder="Tiêu đề"
                  placeholderTextColor="#1DA1F2"
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={(val) => handleTitle(val)}
                  value={data.title}
                />
              </View>
              <Text style={styles.text_content}>Nội dung <Text style={{ color: '#FF0000', fontSize: 18 }}>*</Text>
              </Text>
              <View style={styles.action}>
                <TextInput
                  placeholder="Nội dung"
                  placeholderTextColor="#1DA1F2"
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={(val) => handleContent(val)}
                  value={data.content}
                />
              </View>
              <Text style={styles.text_time}>Thời gian <Text style={{ color: '#FF0000', fontSize: 18 }}>*</Text>
              </Text>

              <View style={styles.boxDate}>
                <DatePicker
                  date={data.time}
                  onDateChange={(val) => handleTime(val)}
                  mode="time"
                  style={{ width: 400, marginTop: 10, height: 120, backgroundColor: "#fff" }}
                  androidVariant="nativeAndroid"
                />
              </View>
              <View style={{ flexDirection: "row", justifyContent: 'flex-end', alignItems: "flex-end", flex: 1, bottom: 30 }}>
                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", flex: 1 }} >
                  <View style={styles.button}>
                    <TouchableOpacity
                      style={styles.create}
                      onPress={() => { clearData(), showModalEdit(true) }}
                    >
                      <LinearGradient
                        colors={['#1DA1F2', '#1DA1F2']}
                        style={styles.create}
                      >
                        <Text style={[styles.textCreate, {
                          color: '#fff'
                        }]}>Quay lại</Text>
                      </LinearGradient>

                    </TouchableOpacity>
                  </View>
                  <View style={styles.button}>
                    <TouchableOpacity
                      style={styles.create}
                      onPress={() => editReminder()}
                    >
                      <LinearGradient
                        colors={['#1DA1F2', '#1DA1F2']}
                        style={styles.create}
                      >
                        <Text style={[styles.textCreate, {
                          color: '#fff'
                        }]}>Lưu lại</Text>
                      </LinearGradient>

                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>

          </View>
        </Modal>
      </View>

    </View>
  );
}
export default CalenderScreen;
const styles = StyleSheet.create({

  modal: {
    flex: 1,
    marginBottom: 65,
    alignItems: "center",
    color: "#fff",
    backgroundColor: "#192734",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#1DA1F2",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.5,
  },
  container: {
    flex: 1,
    backgroundColor: '#15202B',
    color: '#fff'
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
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 48,
    marginLeft: '28%',
    marginTop: 10,
  },
  text_titleScreen: {
    color: '#1DA1F2',
    fontSize: 38,
    fontWeight: 'bold',
    paddingBottom: 20,
    marginTop: 30
  },
  text_content: {
    color: '#f2f2f2',
    fontSize: 16,
  },
  text_title: {
    color: '#f2f2f2',
    fontSize: 16,
    marginTop: 40
  },
  text_time: {
    color: '#f2f2f2',
    fontSize: 16,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#f2f2f2',
    paddingTop: 12,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
    borderRadius: 5,
    fontSize: 14

  },
  actionError: {
    flexDirection: 'row',
    marginTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#f2f2f2',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
    paddingBottom: 5,
  },
  button: {
    alignItems: 'center',
    marginTop: 20
  },
  create: {
    width: 150,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginRight: 20,
    marginLeft: 20
  },
  textCreate: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  btn_container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    width: 50,
    height: 50,
    backgroundColor: '#1DA1F2',
    position: 'absolute',
    right: 15,
  },
  view: {
    justifyContent: "flex-end",
    margin: 0
  }
});