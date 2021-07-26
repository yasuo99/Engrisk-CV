import React from 'react';
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar,
    Image
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
const logo = require('../../assets/world.png');

const ChangePasswordScreen = ({ navigation }) => {
    const [data, setData] = React.useState({
        username: '',
        password: '',
        confirm_password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
    });

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

    const handleConfirmPasswordChange = (val) => {
        if (val.trim().length >= 8) {
            setData({
                ...data,
                password: val,
                isValidConfirmPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidConfirmPassword: false
            });
        }
    };

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry,
        });
    };

    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry,
        });
    };

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
                <Text style={styles.text_title}>Đăng ký</Text>
                <Text style={styles.text_user}>Email hoặc số điện thoại <Text style={{ color: '#FF0000', fontSize: 18 }}>*</Text>
                </Text>
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
                <Text style={styles.text_password}>Mật khẩu <Text style={{ color: '#FF0000', fontSize: 18 }}>*</Text>
                </Text>
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
                }
                <Text style={styles.text_password}>Xác nhận mật khẩu <Text style={{ color: '#FF0000', fontSize: 18 }}>*</Text>
                </Text>
                <View style={styles.action}>
                    <Feather
                        name="lock"
                        color="#f2f2f2"
                        size={20}
                    />
                    <TextInput
                        placeholder="Xác nhận mật khẩu"
                        placeholderTextColor="#1DA1F2"
                        secureTextEntry={data.confirm_secureTextEntry ? true : false}
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => handleConfirmPasswordChange(val)}
                    />
                    <TouchableOpacity
                        onPress={updateConfirmSecureTextEntry}
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
                {data.isValidConfirmPassword ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Mật khẩu phải có độ dài 8 kí tự</Text>
                    </Animatable.View>
                }
                <View style={styles.button}>
                    <TouchableOpacity
                        style={styles.signUp}
                        // onPress={() => { loginHandle(data.username, data.password) }}
                    >
                        <LinearGradient
                            colors={['#1DA1F2', '#1DA1F2']}
                            style={styles.signUp}
                        >
                            <Text style={[styles.textSign, {
                                color: '#fff'
                            }]}>Đăng ký</Text>
                        </LinearGradient>

                    </TouchableOpacity>
                    <TouchableOpacity animation="fadeInRight" onPress={() => navigation.navigate('SignIn')}>
                        <Text style={{ color: '#1DA1F2', marginTop: 15, fontSize: 16, marginBottom:20 }}>Bạn đã có tài khoản?Đăng nhập</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </ScrollView>
    );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
    logo: {
        marginTop: '8%',
        marginLeft: '32%',
    },
    container: {
        flex: 1,
        backgroundColor: '#15202B'
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
        marginTop: '-30%',
        paddingLeft: 40,
        paddingRight: 40,
        paddingTop: 10,
        marginBottom:20
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
        paddingBottom: 20,
    },
    text_content: {
        color: '#05375a',
        fontSize: 18
    },
    text_user: {
        color: '#f2f2f2',
        fontSize: 16,
    },
    text_password: {
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
        marginTop: 10
    },
    signUp: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});
