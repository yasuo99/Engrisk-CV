import React, { useEffect, useState } from 'react';
import { StyleSheet, View, StatusBar, FlatList, Text, Image, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Badge } from 'react-native-elements'
import NotificationActions from './../../redux/actions/notifications';
import { useSelector } from 'react-redux';
const NotificationBottom = ({color}) => {
    const [notifications, setNotifications] = useState([])
    const {unseen} = useSelector(state => state.notification);
    return (
     <View>
         <MaterialIcons name="notifications" size={32} color={color} />
          <Badge value={unseen.length} status="error" containerStyle={{position:'absolute',left:21}}/> 
          
     </View>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        flex:1
    }
});

export default NotificationBottom;