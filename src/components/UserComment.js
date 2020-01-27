import React, { useRef } from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ReplyComment = ({ comment }) => {
    return (
        <View style={{ flexDirection: 'row' }}>
            <Image
                source={{ uri: comment.userImage }}
                style={{ height: 35, width: 35, borderRadius: 35 / 2 }} />
            <View style={styles.commentContainer}>
                <Text style={styles.name}>{comment.createdBy}</Text>
                <View style={{ padding: 5, borderRadius: 8, backgroundColor: '#ededed' }}>
                    <Text style={{ fontSize: 12 }}>{comment.commentValue}</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Text style={styles.time}>{comment.createdDate}</Text>
                    <Text style={styles.time}>Like</Text>
                    <Text style={styles.time}>Comment</Text>
                </View>
            </View>
        </View>
    )
}

const UserComment = ({ comment }) => {

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: comment.userImage }}
                style={{ height: 35, width: 35, borderRadius: 35 / 2 }} />
            <View style={styles.commentContainer}>
                <Text style={styles.name}>{comment.createdBy}</Text>
                <View style={{ padding: 5, borderRadius: 8, backgroundColor: '#ededed' }}>
                    <Text style={{ fontSize: 12 }}>{comment.commentValue}</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Text style={styles.time}>{comment.createdDate}</Text>
                    <Text style={styles.time}>Like</Text>
                    <Text style={styles.time}>Comment</Text>
                </View>
                <View style={{ marginTop: 10 }}>
                    <FlatList
                        showsVerticalScrollIndicator={true}
                        data={comment.replys}
                        keyExtractor={(comment) => `r${comment.id.toString()}`}
                        renderItem={({ item }) => <ReplyComment comment={item} />}

                    />
                </View>
            </View>
        </View>
    );
};

export default UserComment;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'row',
        paddingVertical: 5,
        padding: 15,
    },
    commentContainer: {
        flexDirection: 'column',
        paddingLeft: 10,
        flexShrink: 1,
        flex: 1
    },
    name: {
        fontWeight: '700',
        marginBottom: 5
    },
    time: {
        color: '#6e6e6e',
        marginTop: 2,
        fontSize: 12,
        marginRight: 20
    },
});
