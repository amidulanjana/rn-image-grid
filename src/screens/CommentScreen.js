import React, { Component } from 'react'
import { Text, View, FlatList, StyleSheet } from 'react-native'

import CommentInput from '../components/CommentInput'
import UserComment from '../components/UserComment'

const comments = [{
    id: 1,
    userImage: 'https://www.w3schools.com/howto/img_avatar.png',
    createdBy: 'John Doe',
    commentValue: "Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry's standard dummy text ever since the 1500",
    createdDate: '23 minutes ago',
    replys: [{
        id: 13,
        userImage: 'https://i.ya-webdesign.com/images/png-avatar-4.png',
        createdBy: 'Ferdi Tech',
        commentValue: "Lorem Ipsum is simply dummy text of the printing and",
        createdDate: '23 minutes ago'
    }]
}, {
    id: 2,
    userImage: 'https://www.w3schools.com/howto/img_avatar.png',
    createdBy: 'John Doe',
    commentValue: 'Comment',
    createdDate: '03 minutes ago'
}]

export default class CommentScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Comments'
    })
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 10 }}>
                <View style={styles.container}>
                    <FlatList
                        ref={ref => this.flatList = ref}
                        showsVerticalScrollIndicator={true}
                        //ItemSeparatorComponent={() => <View style={{ padding: 1 }} />}
                        data={comments}
                        keyExtractor={(comment) => comment.id.toString()}
                        renderItem={({ item }) => <UserComment comment={item} />}

                    />
                </View>
                <CommentInput />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 70,
    },
});

