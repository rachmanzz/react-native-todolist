import React from "react";
import { Text, StyleSheet, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 15,
    },
    simpleCard: {
        backgroundColor: "white",
        borderRadius: 4,
        minHeight: 40,
        marginTop: 30,
        opacity: 0.7
    }
});
export default function HomeScreen () {
    return (
        <React.Fragment>
            <View style={styles.container}>
                <Text style={{fontFamily: "Roboto-Black", fontSize: 20, color: "#5F5F5F"}}>Hey Bro,</Text>
                <View style={styles.simpleCard}>
                    <View style={{flexDirection: "row"}}>
                        <View style={{width: 50}}>
                            <Icon name="home"/>
                        </View>
                    </View>
                </View>
            </View>
        </React.Fragment>
    )
}