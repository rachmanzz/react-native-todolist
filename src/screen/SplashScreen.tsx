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
        fontSize: 26
    }
})

export default function SlashScreen ({navigation}: Props) {
    const textOpacity = useRef(new Animated.Value(0)).current
    const color = textOpacity.interpolate({
        inputRange: [0, 1],
        outputRange: ["#5F5F5F", "#0967AB"]
    })
    useEffect(() => {
        Animated.timing(
            textOpacity,
            {
                toValue: 1,
                duration: 4000,
                useNativeDriver: false
            }
        ).start()

        setTimeout(()=> navigation.replace("HomeScreen"), 6000)

    }, [textOpacity])
    return (
        <Animated.View style={[
            styles.container
            ]}>
            <Animated.Text style={[
                styles.title,
                {
                    opacity: textOpacity,
                    color: color
                }
            ]}>TODOLIST</Animated.Text>
        </Animated.View>
    )
}