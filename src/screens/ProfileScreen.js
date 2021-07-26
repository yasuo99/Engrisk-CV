import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  StatusBar,
  TouchableOpacity,
  Image,
  Button,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MenuDrawer from 'react-native-side-drawer'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }
  toggleOpen = () => {
    this.setState({
      open: !this.state.open
    })
  };
  drawerContent = () => {
    const {navigation} = this.props;
    return (
      <TouchableOpacity onPress={this.toggleOpen} style={styles.animatedBox}>
        <FontAwesome
            name="bars"
            color="#ffffff"
            size={32}
            // style={{ marginLeft: 10, marginTop: 10, paddingTop: 5 }}
          />
          <TouchableOpacity style={{flexDirection:"row",marginTop:"40%"}} onPress={()=>{navigation.navigate('Home'),this.setState({open:!this.state.open})}}>
          <MaterialIcons
            name="home"
            size={32}
            color="#ffffff"
            style={{marginLeft:16}}></MaterialIcons>
            <Text style={{fontSize:21,color:"#fff",paddingLeft:16}}>Trang chủ</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flexDirection:"row",marginTop:36}} onPress={()=>{navigation.navigate('ListSection'),this.setState({open:!this.state.open})}}>
          <MaterialIcons
            name="ballot"
            size={32}
            color="#ffffff"
            style={{marginLeft:16}}></MaterialIcons>
            <Text style={{fontSize:21,color:"#fff",paddingLeft:16}}>Section</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flexDirection:"row",marginTop:36}} onPress={()=>{navigation.navigate('ListExam'),this.setState({open:!this.state.open})}}>
          <MaterialIcons
            name="rule"
            size={32}
            color="#ffffff"
            style={{marginLeft:16}}></MaterialIcons>
            <Text style={{fontSize:21,color:"#fff",paddingLeft:16}}>Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flexDirection:"row",marginTop:36}} onPress={()=>{navigation.navigate('ListFlashCard'),this.setState({open:!this.state.open})}}>
          <MaterialIcons
            name="book"
            size={32}
            color="#ffffff"
            style={{marginLeft:16}}></MaterialIcons>
            <Text style={{fontSize:21,color:"#fff",paddingLeft:16}}>Flash card</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flexDirection:"row",marginTop:36}} onPress={()=>{navigation.navigate('Message'),this.setState({open:!this.state.open})}}>
          <MaterialIcons
            name="chat"
            size={32}
            color="#ffffff"
            style={{marginLeft:16}}></MaterialIcons>
            <Text style={{fontSize:21,color:"#fff",paddingLeft:16}}>Tin nhắn</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flexDirection:"row",marginTop:36}} onPress={()=>{navigation.navigate('Calender'),this.setState({open:!this.state.open})}}>
          <MaterialIcons
            name="today"
            size={32}
            color="#ffffff"
            style={{marginLeft:16}}></MaterialIcons>
            <Text style={{fontSize:21,color:"#fff",paddingLeft:16}}>Lịch</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flexDirection:"row",marginTop:36}} onPress={()=>{navigation.navigate('Notification'),this.setState({open:!this.state.open})}}>
          <MaterialIcons
            name="notifications"
            size={32}
            color="#ffffff"
            style={{marginLeft:16}}></MaterialIcons>
            <Text style={{fontSize:21,color:"#fff",paddingLeft:16}}>Thông báo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flexDirection:"row",marginTop:"100%"}}>
            <MaterialIcons
            name="logout"
            size={32}
            color="#ffffff"
            style={{marginLeft:16}}></MaterialIcons>
            <Text style={{fontSize:21,color:"#fff",paddingLeft:16}}>Đăng xuất</Text>
          </TouchableOpacity>
      </TouchableOpacity>
    );
  };
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor='#15202B' barStyle="light-content" />
        <View style={{ flexDirection: "row" }}>
          <MenuDrawer
            open={this.state.open}
            drawerContent={this.drawerContent()}
            drawerPercentage={45}
            animationTime={250}
            overlay={true}
            opacity={0.4}
          >

          </MenuDrawer>
          <TouchableOpacity onPress={this.toggleOpen}>
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
        <View style={{ alignItems: 'center' }}>
          <Image source={require('../assets/avatar.png')} style={styles.imgUser}></Image>
          <Text style={styles.nameUser}>THANH LẬP</Text>
          <Text style={styles.job}>UX/UI Designer & Front-End Developer</Text>
          <View style={{ flexDirection: "row" }}>
            <Image source={require('../assets/facebook.png')} style={styles.social}></Image>
            <Image source={require('../assets/instagram.png')} style={styles.social}></Image>
            <Image source={require('../assets/skype.png')} style={styles.social}></Image>
            <Image source={require('../assets/twitter.png')} style={styles.social}></Image>
          </View>
          <View style={{ flexDirection: "row", marginTop: 16 }}>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.text}>100</Text>
              <Text style={styles.text}>Theo dõi</Text>
            </View>
            <View style={styles.kedoc}></View>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.text}>100</Text>
              <Text style={styles.text}>Đang theo dõi</Text>
            </View>
          </View>
        </View>
        <View style={styles.boxContent}>
          <TextInput
            placeholder="thanhlap@gmail.com"
            placeholderTextColor="#fff"
            style={styles.textInput}
            autoCapitalize="none"
          />
          <TextInput
            placeholder="0123456789"
            placeholderTextColor="#fff"
            style={styles.textInput}
            autoCapitalize="none"
          />
          <TextInput
            placeholder="UX/UI Designer & Front-End Developer"
            placeholderTextColor="#fff"
            style={styles.textInput}
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Tây Hòa Phường Phước Long A Tp.Thủ Đức Tp.HCM"
            placeholderTextColor="#fff"
            style={styles.textInput}
            autoCapitalize="none"
          />
          <View style={styles.buttonUpdate}>
            <TouchableOpacity
              style={styles.update}
            // onPress={() => navigation.navigate('Home')}
            >
              <LinearGradient
                colors={['#1DA1F2', '#1DA1F2']}
                style={styles.update}
              >
                <Text style={[styles.textUpdate, {
                  color: '#fff'
                }]}>Cập nhật</Text>
              </LinearGradient>

            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15202B'
  },

  textButton: {
    color: '#fff',
    fontSize: 16,
    paddingTop: 5
  },
  imgUser: {
    marginTop: 50,
    width: 150,
    height: 150,

  },
  job: {
    fontSize: 21,
    color: '#fff',
    marginTop: 10,
    marginBottom: 10
  },
  nameUser: {
    fontSize: 24,
    color: '#1DA1F2',
    fontWeight: 'bold',
    marginTop: 16
  },
  social: {
    width: 28,
    height: 28,
    marginRight: 10,
  },
  kedoc: {
    borderLeftColor: '#f2f2f2',
    borderLeftWidth: 1,
    marginLeft: 30,
    marginRight: 30
  },
  text: {
    color: '#fff',
    fontSize: 18,
  },
  boxContent: {
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 30
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#fff',
    padding: 10,
    marginTop: 20,
    color: '#fff',
    fontSize: 16
  },
  buttonUpdate: {
    marginTop: 20,
  },
  update: {
    alignItems: 'center',
    width: '100%',
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10
  },
  signUpdate: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  textUpdate: {
    fontSize: 18,
    fontWeight: 'bold'
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
