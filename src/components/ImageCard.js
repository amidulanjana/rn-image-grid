import React from 'react'
import { View, TouchableOpacity, Image, Dimensions, StyleSheet, Platform } from 'react-native'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const { height, width } = Dimensions.get('window');

const ImageCard = ({ index, imageUri, selectedPhotos, handleSelectedPhotos }) => {
    let selected = selectedPhotos.findIndex(i => i == index) >= 0
    return (
        <TouchableOpacity style={{ padding: 4, borderRadius: 15 }} onPress={() => handleSelectedPhotos(index)}>
            {
                selected &&
                <View style={styles.overlay}>
                    <FontAwesomeIcon name="check" color="#fff" size={32} />
                </View>
            }
            <Image
                key={index}
                style={{
                    width: width / 3 - 11,
                    height: width / 3 - 11,
                    borderRadius: 15,

                }}
                source={{ uri: imageUri }}
            />
        </TouchableOpacity>
    )
}

export default ImageCard;

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        left: 4,
        right: Platform.OS == 'ios' ? 4 : 2,
        top: 4,
        bottom: 4,
        borderRadius: 15,
        backgroundColor: 'rgba(219, 61, 93, 0.8);',
        elevation: 1,
        zIndex: 10
    },
}) 
