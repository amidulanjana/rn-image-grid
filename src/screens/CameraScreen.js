import React, { Component } from 'react'
import { Text, View, StatusBar, TouchableOpacity, StyleSheet } from 'react-native'
import CameraRoll from "@react-native-community/cameraroll";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';


export default class CameraScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        header: null
    })
    saveImage = (data) => {
        //alert(data.uri)
        CameraRoll.saveToCameraRoll(data.uri, 'photo');
    }

    render() {
        const { navigation } = this.props;
        return (
            <View style={{ flex: 1 }}>
                <StatusBar barStyle="light-content" />
                <TouchableOpacity
                    style={{ width: 35, height: 35, position: 'absolute', elevation: 2, right: 0, top: 5 }}
                    onPress={() => navigation.navigate('gallery')}>
                    <FontAwesomeIcon name="close" color="#fff" size={28} />
                </TouchableOpacity>
            </View>
        )
    }
}
