import React, {useRef, useEffect} from "react";
import { StyleSheet, View, Text, Animated, ViewStyle } from "react-native";
import { StackScreenProps } from '@react-navigation/stack';
import { RoutersParamList } from "../routesProps";

type Props = StackScreenProps<RoutersParamList, 'SplashScreen'>

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontFamily: "Roboto-Black",
        fontSize: 26,
        color: "#5F5F5F"
    }
})

export default function SlashScreen ({navigation}: Props) {
    const textOpacity = useRef(new Animated.Value(0)).current
    useEffect(() => {
        Animated.timing(
            textOpacity,
            {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true
            }
        ).start()

        setTimeout(()=> navigation.replace("HomeScreen"), 3000)

    }, [textOpacity])
    return (
        <View style={styles.container}>
            <Animated.Text style={[
                styles.title,
                {
                    opacity: textOpacity
                }
            ]}>TODOLIST</Animated.Text>
        </View>
    )
}