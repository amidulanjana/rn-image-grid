import React, { Component } from 'react'
import { Text, View, TouchableOpacity, PermissionsAndroid, StyleSheet, Dimensions, FlatList, Platform } from 'react-native'
import CameraRoll from "@react-native-community/cameraroll";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-crop-picker';

import ImageCard from '../components/ImageCard'
import CustomModal from '../components/Modal';

const { height, width } = Dimensions.get('window');

export class Gallery extends Component {
    static navigationOptions = ({ navigation }) => ({
        header: null
    })
    state = {
        photos: [],
        selectedPhotos: [],
        lastCursor: null,
        noMorePhotos: false,
        loadingMore: false,
        showModal: false
    }

    tryPhotoLoad = () => {
        if (!this.state.loadingMore) {
            this.setState({ loadingMore: true }, () => { this.loadPhotos(); });
        }
    }

    loadPhotos = async () => {
        const fetchParams = {
            first: 20,
            assetType: 'All',
        };
        let granted;
        if (Platform.OS == 'android') {
            granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                    'title': 'Access Storage',
                    'message': 'Access Storage for the pictures'
                }
            )
        }

        if (Platform.OS == 'ios' || granted === PermissionsAndroid.RESULTS.GRANTED) {
            if (this.state.lastCursor) {
                fetchParams.after = this.state.lastCursor;
            }

            CameraRoll.getPhotos(fetchParams).then((data) => {
                this.appendAssets(data);
            }).catch((e) => {
                console.log(e);
            });
        }
    }

    appendAssets = (data) => {
        const assets = data.edges;
        const nextState = {
            loadingMore: false,
        };
        if (!data.page_info.has_next_page) {
            nextState.noMorePhotos = true;
        }
        if (assets.length > 0) {
            nextState.lastCursor = data.page_info.end_cursor;
            let images = []
            data.edges.forEach(({ node }) => {
                images.push(node.image)
            });
            nextState.photos = this.state.photos.concat(images)
        }
        this.setState(nextState);
    }

    endReached = () => {
        if (!this.state.noMorePhotos) {
            this.tryPhotoLoad();
        }
    }

    launchCamera = (mediaType) => {
        debugger;
        ImagePicker.openCamera({
            mediaType,
            cropping: false,
        }).then(image => {
            console.log(image);
            this.setState(prevState => ({
                photos: [{ uri: image.path }, ...prevState.photos]
            }))
        });

    }

    _handleSelectedPhotos = (index) => {
        let hasIndex = this.state.selectedPhotos.findIndex(i => i == index);
        if (hasIndex >= 0) {
            this.setState({
                selectedPhotos: this.state.selectedPhotos.filter((_, i) => i !== hasIndex)
            });
        } else {
            this.setState(prevState => ({
                selectedPhotos: [...prevState.selectedPhotos, index]
            }))
        }
    }

    _navigateToStatusPage = () => {
        const { navigation } = this.props;
        const { photos, selectedPhotos } = this.state;
        let selectedImages = [];
        selectedPhotos.forEach(index => {
            selectedImages.push(
                photos[index]
            )
        });
        navigation.navigate('status', { selectedImages })
    }

    handleVisible = () => {
        this.setState(prevState => ({
            showModal: !prevState.showModal
        }))
    }

    componentDidMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
            this.tryPhotoLoad();
        });
    }

    componentWillUnmount() {
        // Remove the event listener
        if (this.focusListener) {
            this.focusListener.remove();
        }
    }
    render() {
        const { selectedPhotos, photos, showModal } = this.state
        const { navigation } = this.props
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.header}>
                    <View style={{ width: width / 2 }}>
                    </View>
                    <View style={{ flexDirection: 'row', width: width / 2, justifyContent: 'flex-end' }}>
                        <TouchableOpacity style={{ justifyContent: 'center', width: 35 }} onPress={this.handleVisible}>
                            <FontAwesomeIcon name="camera" color="#454545" size={22} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ justifyContent: 'center', width: 35 }}>
                            <FontAwesomeIcon name="close" color="#454545" size={22} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.imageGrid}>
                    <CustomModal visible={showModal} handleVisible={this.handleVisible}>
                        <View style={{ paddingBottom: 25, alignItems: 'center' }}>
                            <TouchableOpacity
                                style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}
                                onPress={() => this.launchCamera('photo')}
                            >
                                <FontAwesomeIcon name="camera" color="#454545" size={18} />
                                <Text style={{ fontWeight: '700', fontSize: 18 }}> Camera</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                                onPress={() => this.launchCamera('video')}
                            >
                                <FontAwesomeIcon name="video-camera" color="#454545" size={18} />
                                <Text style={{ fontWeight: '700', fontSize: 18 }}> Video</Text>
                            </TouchableOpacity>
                        </View>
                    </CustomModal>
                    <FlatList
                        data={this.state.photos}
                        renderItem={({ item, index }) => <View style={{ flex: 1 / 3, flexDirection: 'column', margin: 1, flexShrink: 1 }}>
                            <ImageCard
                                index={index}
                                imageUri={item.uri}
                                selectedPhotos={selectedPhotos}
                                handleSelectedPhotos={this._handleSelectedPhotos}
                            />
                        </View>
                        }
                        refreshing={false}
                        onEndReached={this.endReached}
                        onEndReachedThreshold={2}
                        keyExtractor={item => item.uri}
                        numColumns={3}
                    />
                </View>
                <TouchableOpacity
                    style={styles.addBtn}
                    onPress={this._navigateToStatusPage}>
                    <Text style={{ color: '#fff', fontWeight: '700' }}>Add</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default Gallery

const styles = StyleSheet.create({
    imageGrid: {
        paddingTop: 20,
        flex: 1,
        padding: 4,
        marginBottom: 40
    },
    header: {
        height: 40,
        backgroundColor: 'rgba(196, 188, 161,0.3)',
        flexDirection: 'row',
        width,
        alignItems: 'center'
    },
    addBtn: {
        position: 'absolute',
        padding: 10,
        bottom: 0,
        width,
        backgroundColor: '#bd9831',
        justifyContent: 'center',
        alignItems: 'center'
    }
})
