import React, { useContext } from "react"
import { Alert, FlatList, Text, View } from 'react-native'
import { ListItem } from '@rneui/themed'
import { Avatar, Button, Icon } from "react-native-elements"
import { ListItemContent } from "@rneui/base/dist/ListItem/ListItem.Content"
import UsersContext from "../context/UserContext"

export default props => {
    console.warn(props)

    const { state, dispatch } = useContext(UsersContext)

    function confirmUserDeletion(user) {
        Alert.alert('Excluir Usuário', 'Deseja excluir o usuário?', [
            {
                text: 'Sim',
                onPress() {
                   dispatch({
                    type: 'deleteUser',
                    payload: user,
                   })
                }
            },
            {
                text: 'Não'
            }
        ])
    }

    function getActions(user) {
        return (
        <>
            <Button
                onPress={() => props.navigation.navigate('UserForm', user)}
                type="clear"
                icon={<Icon name="edit" size={25} color="orange"/>}
            />
            <Button
                onPress={() => confirmUserDeletion(user)}
                type="clear"
                icon={<Icon name="delete" size={25} color="red"/>}
            />
        </>
        )
    }

    function getUserItem({item: user}) {
        return (
            <ListItem bottomDivider
            onPress={() => props.navigation.navigate('UserForm', user)}
            >
                <Avatar
                    rounded
                    source={{uri: user.avatarUrl}}
                />
                <ListItemContent>
                    <ListItem.Title>{user.name}</ListItem.Title>
                    <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
                </ListItemContent>

                <ListItem.Content right>
                    <ListItem.Title right>
                        {getActions(user)}
                    </ListItem.Title>
                </ListItem.Content>
            </ListItem>
        )
    }
    return (
        <View>
            <FlatList 
                keyExtractor={user => user.id.toString()}
                data={state.users}
                renderItem={getUserItem}
            />
        </View>
    )
}