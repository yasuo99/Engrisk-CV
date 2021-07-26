import React, { useState, useEffect } from 'react';
import { StyleSheet, View, StatusBar, FlatList, Text, Image, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MenuDrawer from 'react-native-side-drawer'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ProgressCircle from 'react-native-progress-circle'
import { useSelector } from 'react-redux';
const FinishSection = ({ navigation, route }) => {

    useEffect(() => {
    }, []);
    const [open, setOpen] = useState(false)
    const { account } = useSelector(state => state.auth);
    const {routeId} = route.params;
    const toggleOpen = () => {
        setOpen(!open);
    };
    return (
        <View style={styles.screenContainer}>
            <StatusBar barStyle="light-content" />
            <TouchableOpacity onPress={() => navigation.navigate('ListSection')}>
                <MaterialIcons
                    name="close"
                    size={36}
                    color="#fff"
                    style={{ marginTop: 8, marginLeft: 8 }}></MaterialIcons>
            </TouchableOpacity>
            <View style={{ justifyContent: "center", alignItems: "center", top: "25%" }}>
                    <View style={{ flexDirection: "row" }}>
                        <MaterialIcons
                            name="star"
                            size={42}
                            color="yellow"></MaterialIcons>
                        <MaterialIcons
                            name="star"
                            size={42}
                            color="yellow"></MaterialIcons>
                        <MaterialIcons
                            name="star"
                            size={42}
                            color="yellow"></MaterialIcons>
                        <MaterialIcons
                            name="star"
                            size={42}
                            color="yellow"></MaterialIcons>
                        <MaterialIcons
                            name="star"
                            size={42}
                            color="yellow"></MaterialIcons>
                    </View>

                    {/* <Text style={{ fontSize: 28, color: "#fff" }}>{'30%'}</Text> */}
            </View>

            <View style={{ flex: 1, justifyContent: "flex-end", marginBottom: 70 }}>
                <Text style={{ color: "#1DA1F2", fontSize: 28, padding: 32, fontWeight: "bold", textAlign: "center", marginBottom: 100 }}>CHÚC MỪNG BẠN ĐÃ HOÀN THÀNH ÔN TẬP</Text>

                <TouchableOpacity onPress={() => {if(routeId){navigation.navigate('ListSection')}else{navigation.navigate('Home')}} } style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", backgroundColor: "#fff", marginLeft: 50, marginRight: 50, borderRadius: 20 }}>
                    <Text style={{ color: "#1DA1F2", fontSize: 21, padding: 16, fontWeight: "bold" }}>Hãy tiếp tục</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: '#15202B',

    },

});

export default FinishSection;