import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

export default function Homescreen() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('https://reqres.in/api/users?page=1')
            .then((response) => response.json())
            .then((json) => {
                setUsers(json.data); // Extract the actual user array
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const renderItem = ({ item }) => (
        <View style={{ padding: 10 ,flexDirection:'row'}}>
            <Image source={{uri:item?.avatar}} style={{height:50,width:50}}></Image>
            <Text style={styles.item}>
                {item.first_name} {item.last_name}
            </Text>
        </View>

    );

    return (
        <View style={styles.container}>
            <FlatList
                data={users}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        paddingHorizontal: 16,
    },
    item: {
        padding:10,
        fontSize: 18,
        paddingVertical: 10,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
})