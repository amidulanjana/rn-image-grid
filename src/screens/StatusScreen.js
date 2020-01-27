import React, { Component } from 'react'
import { StyleSheet, View, TextInput, Image, Text, Dimensions, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import { isIphoneX } from '../utils';

const { height, width } = Dimensions.get('window');

const KEYBOARD_VERTICAL_OFFSET = isIphoneX() ? 90 : 70;
const MARGIN_BOTTOM = isIphoneX() ? 20 : 5;

export default class StatusScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Add Post'
    })
    state = {
        text: ''
    }
    render() {
        const { navigation } = this.props;
        let selectedImages = navigation.getParam('selectedImages', [])
        return (
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <Image source={{ uri: 'https://www.w3schools.com/howto/img_avatar.png' }} style={styles.avatar}></Image>
                    <View style={{ position: 'absolute', left: 46, flexDirection: 'row', width: 30, flexWrap: 'wrap' }}>
                        {
                            selectedImages && selectedImages.slice(0, 4).map((img, i) => <Image
                                source={{ uri: img.uri }}
                                style={{ height: 14, width: 14, borderWidth: 1, borderColor: '#fff', borderRadius: 3 }}
                            />)
                        }
                    </View>
                    <TextInput
                        autoFocus={true}
                        multiline={true}
                        numberOfLines={4}
                        style={{ flex: 1 }}
                        placeholder="What's on your mind"
                        placeholderTextColor="#000"
                        onChangeText={text => this.setState({ text })}
                        value={this.state.text}
                        textAlignVertical="top"
                    />
                    <Text style={styles.textNo}>0/150</Text>
                </View>
                <View style={styles.selectionBox}>
                    <Text style={{ fontWeight: '700' }}>Select Category</Text>
                    <FontAwesomeIcon name="angle-right" color="#454545" size={22} style={styles.right} />
                </View>
                <KeyboardAvoidingView style={styles.keyboardViewContainer} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={KEYBOARD_VERTICAL_OFFSET}>
                    <TouchableOpacity
                        style={styles.addBtn}
                        onPress={() => navigation.navigate('comment')}>
                        <Text style={{ color: '#fff', fontWeight: '700' }}>Add</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 15,

    },
    inputContainer: {
        flexDirection: "row",
        marginBottom: 20
    },
    avatar: {
        width: 74,
        height: 74,
        borderRadius: 8,
        marginRight: 10
    },
    textNo: {
        position: 'absolute',
        right: 10,
        top: 10,
        fontSize: 11,
        color: '#636363'
    },
    selectionBox: {
        padding: 10,
        borderWidth: 1,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderColor: '#bfbfbf',
        borderBottomColor: '#dbdbdb',
        flexDirection: 'row',
        alignItems: 'center'
    },
    right: {
        position: 'absolute',
        right: 0,
        width: 20,
        //height: 20,
    },
    keyboardViewContainer: {
        position: 'absolute',
        bottom: MARGIN_BOTTOM,
        justifyContent: 'flex-end',
        flex: 1,
        width: width,
        backgroundColor: '#fff',
    },
    addBtn: {
        padding: 10,
        width,
        backgroundColor: '#bd9831',
        justifyContent: 'center',
        alignItems: 'center'
    }
});