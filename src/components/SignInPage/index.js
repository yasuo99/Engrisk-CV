import React, { useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,
    Alert,
    Image
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import AuthorizationActions from '../../redux/actions/auth';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';

const logo = require('../../assets/world.png');
GoogleSignin.configure({
    webClientId: '704575261938-i3iiefjaminroc2114rbd02qpjbcgho9.apps.googleusercontent.com',
    offlineAccess: false
})
const SignInScreen = ({ navigation }) => {

    const [data, setData] = React.useState({
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });
    const { loggedIn } = useSelector(state => state.auth);
    useEffect(() => {
        if (loggedIn) {
            navigation.navigate("Tab")
        }
    }, [loggedIn])
    const dispatch = useDispatch();
    async function signIn() {
        const payload = {
            loginMethod: data.username,
            password: data.password
        }
        try {
            const result = await AuthorizationActions.onLogin(payload);
            dispatch(result)
            navigation.navigate("Tab")
        } catch (error) {
            console.log(error);
        }

    }
    const textInputChange = (val) => {
        if (val.trim().length >= 4) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        if (val.trim().length >= 8) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const handleValidUser = (val) => {
        if (val.trim().length >= 4) {
            setData({
                ...data,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    }

    const loginHandle = (userName, password) => {

        const foundUser = Users.filter(item => {
            return userName == item.username && password == item.password;
        });

        if (data.username.length == 0 || data.password.length == 0) {
            Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
                { text: 'Okay' }
            ]);
            return;
        }

        if (foundUser.length == 0) {
            Alert.alert('Invalid User!', 'Username or password is incorrect.', [
                { text: 'Okay' }
            ]);
            return;
        }
        signIn(foundUser);
    }
    const googleSignIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log(userInfo);
        }
        catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
                console.log(error);
            }
        }
    }
    return (
        <ScrollView style={styles.container}>
            <StatusBar backgroundColor='#15202B' barStyle="light-content" />
            <Image
                style={styles.logo}
                source={logo}
            />
            <View style={styles.header}>

                <Text style={styles.text_header}>ENGRISK</Text>
            </View>
            <View
                style={styles.content}
            >
                <Text style={styles.text_title}>Đăng nhập</Text>
                <View style={styles.boxContent}>
                    <View style={styles.action}>
                        <FontAwesome
                            name="user-o"
                            color="#f2f2f2"
                            size={20}
                        />
                        <TextInput
                            placeholder="Tài khoản"
                            placeholderTextColor="#1DA1F2"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => textInputChange(val)}
                            onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                        />
                        {data.check_textInputChange ?
                            <Animatable.View
                                animation="bounceIn"
                            >
                                <Feather
                                    name="check-circle"
                                    color="green"
                                    size={20}
                                />
                            </Animatable.View>
                            : null}
                    </View>
                    {data.isValidUser ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Tên tài khoản phải dài 4 kí tự</Text>
                        </Animatable.View>
                    }
                </View>
                <View style={styles.boxContent}>
                    <View style={styles.action}>
                        <Feather
                            name="lock"
                            color="#f2f2f2"
                            size={20}
                        />
                        <TextInput
                            placeholder="Mật khẩu"
                            placeholderTextColor="#1DA1F2"
                            secureTextEntry={data.secureTextEntry ? true : false}
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => handlePasswordChange(val)}
                        />
                        <TouchableOpacity
                            onPress={updateSecureTextEntry}
                        >
                            {data.secureTextEntry ?
                                <Feather
                                    name="eye-off"
                                    color="grey"
                                    size={20}
                                />
                                :
                                <Feather
                                    name="eye"
                                    color="grey"
                                    size={20}
                                />
                            }
                        </TouchableOpacity>
                    </View>
                    {data.isValidPassword ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Mật khẩu phải có độ dài 8 kí tự</Text>
                        </Animatable.View>
                    }</View>
                <View style={styles.button}>
                    <TouchableOpacity
                        style={styles.signIn}
                        disabled={!data.isValidUser || !data.isValidPassword || data.username == '' || data.password == ''}
                        onPress={() => { signIn() }}
                    >
                        <LinearGradient
                            colors={['#1DA1F2', '#1DA1F2']}
                            style={styles.signIn}
                        >
                            <Text style={[styles.textSign, {
                                color: '#fff'
                            }]}>Đăng nhập</Text>
                        </LinearGradient>

                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ width: 200, }}>
                        <TouchableOpacity animation="fadeInLeft" onPress={() => navigation.navigate('ForgotPassword')}>
                            <Text style={{ color: '#1DA1F2', marginTop: 15, fontSize: 16 }}>Quên mật khẩu?</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: 200, alignItems: 'flex-end' }}>
                        <TouchableOpacity animation="fadeInRight" onPress={() => navigation.navigate('SignUp')}>
                            <Text style={{ color: '#1DA1F2', marginTop: 15, fontSize: 16 }}>Đăng ký</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ color: "#fff", fontSize: 18, marginTop: 10, marginBottom: 10 }}>
                        Hoặc
                    </Text>
                    <View><GoogleSigninButton onPress={() => googleSignIn()} size={GoogleSigninButton.Size.Wide} color={GoogleSigninButton.Color.Dark} style={{ width: 400, height: 50 }}></GoogleSigninButton></View>
                </View>
            </View>
        </ScrollView>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    logo: {
        marginTop: '8%',
        marginLeft: '32%',
    },
    container: {
        flex: 1,
        backgroundColor: '#15202B',
    },
    header: {
        // flex: 1,
        paddingHorizontal: 20,
        marginTop: 30,
        height: 100,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        marginBottom: 180,
        marginLeft: 20,
        marginRight: 20,
    },
    content: {
        flex: 1,
        marginTop: '-35%',
        paddingLeft: 40,
        paddingRight: 40,
        paddingTop: 10,
    },
    footer: {
        flex: 2,
        backgroundColor: '#15202B',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 48,
        marginLeft: '28%',
        marginTop: 10,
    },
    text_title: {
        color: '#1DA1F2',
        fontSize: 24,
        fontWeight: 'bold',
        paddingBottom: 10,
    },
    text_content: {
        color: '#05375a',
        fontSize: 18
    },
    boxContent: {
        marginBottom: 15,
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#f2f2f2',
        paddingTop: 12,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 5,
        fontSize: 14

    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
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
        paddingTop: 5,
    },
    button: {
        alignItems: 'center',
        marginTop: 10
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    facebook: {
        color: '#fff',
        backgroundColor: "#1DA1F2",
        width: 400,
        textAlign: "center",
        paddingTop: 12,
        borderRadius: 10,
        fontSize: 18,
        fontWeight: 'bold',
        height: 50
    },
    google: {
        marginTop: 15,
        color: '#fff',
        backgroundColor: "#E7453C",
        width: 400,
        textAlign: "center",
        paddingTop: 12,
        borderRadius: 10,
        fontSize: 18,
        fontWeight: 'bold',
        height: 50,
        marginBottom: 30
    }
});
