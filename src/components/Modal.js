import React from 'react';
import { View, StyleSheet, TouchableOpacity, Modal, Image, Dimensions, ActivityIndicator, Text } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('screen');

const CustomModal = ({ value, key, loading, visible, handleVisible, uri, error, children }) => (
    <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        key={key}
        onRequestClose={() => { }}
    >
        <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
                <View style={styles.closeBtnContainer}>
                    <TouchableOpacity style={styles.close} onPress={handleVisible}>
                        <FontAwesome name="close" size={20} color="#2e2e2e" />
                    </TouchableOpacity>
                </View>
                {children}
            </View>
        </View>
    </Modal>
);

export default CustomModal;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#00000040',
    },
    modalContent: {
        backgroundColor: '#e3e3e3',
        borderRadius: 10,
        padding: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeBtnContainer: {
        width: width - 60,
        alignItems: 'flex-end',
    },
    close: {
        padding: 5,
    },

});
