import React, { useState } from 'react';
import {
    View, Text, TextInput, KeyboardAvoidingView, Image, TouchableOpacity,
    Dimensions, StyleSheet, Platform, ActivityIndicator, Keyboard,
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';



import { isIphoneX } from '../utils';

const { width } = Dimensions.get('screen');


const KEYBOARD_VERTICAL_OFFSET = isIphoneX() ? 90 : 70;
const MARGIN_BOTTOM = isIphoneX() ? 20 : 5;

const CommentInput = ({ }) => {
    const [commentText, setCommentText] = useState('');
    return (
        <KeyboardAvoidingView style={styles.keyboardViewContainer} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={KEYBOARD_VERTICAL_OFFSET}>
            <View style={styles.inputContainer}>
                <Image
                    source={{ uri: 'https://www.w3schools.com/howto/img_avatar.png' }}
                    style={{ height: 50, width: 50, borderRadius: 50 / 2 }}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Add a comment"
                    keyboardType="default"
                    placeholderTextColor="#919191"
                    onChangeText={(text) => setCommentText(text)}
                    value={commentText}
                />
                <TouchableOpacity style={styles.postBtn} onPress={() => { }}>
                    <View style={styles.postBtnContainer}>
                        <Text style={styles.btnText}><FontAwesomeIcon name="camera" color="#454545" size={18} /></Text>
                        <Text style={styles.btnText}><FontAwesomeIcon name="smile-o" color="#454545" size={18} /></Text>
                        <Text style={styles.btnText}><MaterialCommunityIcons name="send" color="#e3467d" size={18} /></Text>
                    </View>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

export default CommentInput;

const styles = StyleSheet.create({
    keyboardViewContainer: {
        position: 'absolute',
        bottom: MARGIN_BOTTOM,
        justifyContent: 'flex-end',
        flex: 1,
        width: width,
        backgroundColor: '#fff',
    },
    inputContainer: {
        flexDirection: 'row',
        width: width,
        paddingHorizontal: 15,
        paddingTop: 5,
        alignItems: 'center',
        borderTopColor: '#ebebeb',
        borderTopWidth: 1,
        backgroundColor: '#ffff',
        paddingBottom: 5
    },
    input: {
        height: 40,
        //borderRadius: 20,
        padding: 10,
        fontWeight: '500',
        backgroundColor: '#fff',
        //borderColor: '#ebebeb',
        color: '#000',
        //borderWidth: 1,
        marginLeft: 10,
        paddingRight: 65,
        width: width - 100,
    },
    postBtnContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    postBtn: {
        position: 'absolute',
        right: 15,
        bottom: 20,
    },
    btnText: {
        marginRight:5
    },
});

