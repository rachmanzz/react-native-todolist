import { View, StyleSheet, Dimensions, TextInput, Text, TouchableOpacity, LayoutAnimation, Platform, UIManager} from "react-native";
import React, {useState, useEffect, useRef} from "react";
import Icon from 'react-native-vector-icons/MaterialIcons'
const dimen = () => Dimensions.get("screen")
const styles = StyleSheet.create({
    container: {
        zIndex: 99,
        position: 'absolute',
        backgroundColor: "#FFF",
        height: dimen().height,
        width: dimen().width,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonContainer: {
        backgroundColor: "#149BFD", paddingLeft: 20, paddingRight: 20, paddingTop: 7, paddingBottom: 7, borderRadius: 3
        
    },
    inputStyle: {
        fontFamily: "Roboto-Medium",
        minWidth: 200,
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 10, paddingRight: 10,
        fontSize: 16,
        color: "#717171",
        bottom: 0,
        right: 0
    },
    buttonClose: {
        position: "absolute",
        zIndex: 99, 
        right: 50, top: 50
    }
})
type props = {
    onClose?: () => void
    onCreate: (text: string) => void,
    isOpen: boolean
}
if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}
export default function ({isOpen, onCreate, onClose}: props) {
    const [text, setText] = useState<string>("")
    const [onOpen, setOnOpen] = useState<boolean>(false)
    const handleClose = () => {
        setText("")
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        setOnOpen(false)
    }
    
    const handleOpen = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        setOnOpen(true)
    }
    useEffect(() => {
        if (isOpen !== onOpen) {
            if (isOpen) handleOpen()
            else handleClose()
        }
    }, [isOpen])
    return (
        <React.Fragment>
            {
                onOpen && (
                    <React.Fragment>
                        <View style={styles.container}>
                                <View style={{marginBottom: 50}}>
                                    <TextInput value={text} onChangeText={setText} placeholder="Type new Task here..." placeholderTextColor="#E7E7E7" style={styles.inputStyle} multiline={true}/>
                                </View>
                                <TouchableOpacity onPress={() => onCreate(text)}>
                                    <View style={styles.buttonContainer}>
                                        <Text style={{fontFamily: "Roboto-Black", color:"#FFF"}}>Create Task</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={styles.buttonClose} onPress={onClose}>
                                <Icon name="close" color="#BABABA" size={24} />
                            </TouchableOpacity>
                    </React.Fragment>
                )
            }
        </React.Fragment>
    )
}