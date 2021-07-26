import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from "react-native-vector-icons/FontAwesome";
const QuizSelect = () => {
    const countries = ["Egypt", "Canada", "Australia"]
    useEffect(() => {
    }, []);

    return (
        <View style={styles.screenContainer}>
            <View style={styles.boxQuestion}>
                <Text style={styles.question}>What is your name? What is your name? What is your name? What is your name? </Text>
            </View>
            <View style={styles.kengang}></View>
            <Text style={{padding:30}}>
            <SelectDropdown
                    data={countries}
                    onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index)
                    }}
                    defaultButtonText={"Chọn từ"}
                    buttonStyle={styles.dropdown1BtnStyle}
                    buttonTextStyle={styles.dropdown1BtnTxtStyle}
                    renderDropdownIcon={() => {
                        return (
                          <FontAwesome name="chevron-down" color={"#444"} size={18} />
                        );
                      }}
                /> 
                <Text style={{fontSize:21, color:"#fff"}}> What is your name? What is your name? </Text>
               
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: '#15202B'
    },

    boxQuestion: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        padding:20
    },
    question: {
        fontSize: 28,
        color: "#fff",
        marginLeft:10,
        marginRight:10
    },
    textQuestion: {
        marginLeft: 10,
        fontSize: 24,
        fontWeight: 'bold',
        color: "#15202B",
        padding: 5,
    },
    titleQuestion: {
        fontSize: 38,
        color: "#fff",
        fontWeight: 'bold'
    },
    timeQuestion: {
        fontSize: 18,
        color: "#fff",
        marginTop: 5
    },
    numberQuestion: {
        fontSize: 18,
        color: "#fff",
        marginTop: 5
    },
    kengang: {
        width: '90%',
        borderBottomColor: '#ededed',
        borderBottomWidth: 1,
        marginTop: 40,
        marginLeft: 30,
    },
    dropdown2RowStyle: { backgroundColor: "#444", borderBottomColor: "#C5C5C5",width:130, },
    dropdown1BtnStyle: {
        width:140,
        height: 35,
        backgroundColor: "#FFF",
        borderRadius: 8,
        borderColor: "#444",
      },
      dropdown1BtnTxtStyle: {fontSize:21,textAlign:"left",padding:0 },
});

export default QuizSelect;