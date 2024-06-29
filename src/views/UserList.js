import React from "react"
import { FlatList, Text, View } from 'react-native'
import users from '../data/users'
import { ListItem } from '@rneui/themed'
import { Avatar } from "react-native-elements"
import { ListItemContent } from "@rneui/base/dist/ListItem/ListItem.Content"

export default props => {
    console.warn(props)

    function getUserItem({item: user}) {
        return (
            <ListItem bottomDivider
            onPress={() => props.navigation.navigate('UserForm')}
            >
                <Avatar
                    rounded
                    source={{uri: user.avatarUrl}}
                />
                <ListItemContent>
                    <ListItem.Title>{user.name}</ListItem.Title>
                    <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
                </ListItemContent>
            </ListItem>
        )
    }
    return (
        <View>
            <FlatList 
                keyExtractor={user => user.id.toString()}
                data={users}
                renderItem={getUserItem}
            />
        </View>
    )
}