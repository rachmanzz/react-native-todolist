import React, {useState} from "react";
import { Text, StyleSheet, View, TouchableOpacity, TouchableWithoutFeedback, Alert, Platform, UIManager, LayoutAnimation, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons'
import IconFontAws from 'react-native-vector-icons/FontAwesome5'
import AnimatedAddTask from "../components/AnimatedAddTask";

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
        opacity: 0.7,
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 10,
        paddingRight: 5
    },
    defaultInnerText: {
        paddingRight: 7,
        fontFamily: "Roboto-Medium",
        fontSize: 15
    },
    markCircle: {borderRadius: 18, height: 18, width: 18, borderWidth: 1, borderColor: "#B8B8B8"}
});
interface listProps {
    itemText: string,
    mark: boolean
    hideMenu: boolean
}
if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}
export default function HomeScreen () {
    const [inputOpen, setInputOpen] = useState<boolean>(false)
    const [sort, setSort] = useState<"asc"|"desc">("desc")
    const [list, setList] = useState<listProps[]>([])
    const whenTaskOnCreate = (text: string) => {
        if (text !== "" && !/^\s+$/.test(text)) {
            if (sort === 'asc') setList([...list, {itemText: text, mark: false, hideMenu: true}])
            else setList([{itemText: text, mark: false, hideMenu: true}, ...list])
            setInputOpen(false)
        }
    }
    const handleMarking = (keyIndex: number, mark: boolean) => () => {
        const cloneList = [...list]
        cloneList[keyIndex].mark = mark
        setList(cloneList)
    }
    const sorting = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        return [...list].map( (content: listProps, index: number) => ({indexKey: index, content}) ).sort((a, b) => sort === 'asc' ? a.indexKey-b.indexKey : b.indexKey-a.indexKey).map( ({content}: {content: listProps}) => (content) )
    }

    const AddTaskButton = () => (
        <React.Fragment>
            <TouchableWithoutFeedback onPress={() => {
                setInputOpen(true)
            }}>
                <View style={{flexDirection: "row", marginTop: sort === "desc" ? 5 : 0}}>
                    <View style={{width: 22}}>
                        <Icon name="add" size={20} color="#E5E5E5"/>
                    </View>
                    <View style={[
                        {marginLeft: 10, flexGrow: 1}, 
                        sort === "asc" || list.length === 0 ? {paddingBottom: list.length === 0 ? 7 : 3} : {borderBottomWidth: 1, borderBottomColor: "#E5E5E5", paddingBottom: 7}
                        ]}>
                        <Text style={[
                            styles.defaultInnerText,
                            { color: "#E5E5E5", fontSize:16 }
                        ]}>Add new task</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </React.Fragment>
    )
    const handlingSort = () => {
        setList(sorting())
        setSort(sort === "asc" ? "desc" : "asc")
    }
    const deleteItem = (index:number) => () => {
        const nextList = list.filter((_, keyIndex: number) => index !== keyIndex)
        setList(nextList)
    }
    const handlingDeleteItem = (index: number) => () => {
        Alert.alert("Delete Item", "Are you sure ?", [
            {
                text: "Cancel"
            },
            {
                text: "Sure",
                onPress: deleteItem(index)
            }
        ])
    }
    return (
        <React.Fragment>
            <View style={styles.container}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text style={{fontFamily: "Roboto-Black", fontSize: 20, color: "#5F5F5F"}}>TODO LIST</Text>
                    <TouchableOpacity onPress={handlingSort}>
                    {sort === "asc" ? <IconFontAws name="sort-numeric-down" style={{marginLeft: 10}} size={18}/> : <IconFontAws style={{marginLeft: 10}} name="sort-numeric-down-alt" size={18}/>}
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <View style={styles.simpleCard}>
                        {sort === "desc" && <AddTaskButton />}
                        {list.map( ({itemText, mark, hideMenu}: listProps, keyIndex: number) => (
                            <React.Fragment key={keyIndex}>
                                
                                    <View style={{flexDirection: "row", marginBottom: 10, marginTop: keyIndex === 0 ? 10 : 0, alignItems: 'center'}}>
                                        <View style={{width: 24}}>
                                            <TouchableWithoutFeedback onPress={handleMarking(keyIndex, !mark)}>
                                                <View style={[
                                                    styles.markCircle,
                                                    {backgroundColor: mark ? "#149BFD": "#FFFFFF"}
                                                ]}/>

                                            </TouchableWithoutFeedback>
                                        </View>
                                        <View style={{marginLeft: 10, borderBottomWidth: 1, borderBottomColor: "#E5E5E5", paddingBottom: 7, flexGrow: 1, flexDirection: "row", justifyContent: "space-between", alignItems: 'center'}}>
                                            <Text style={[
                                                styles.defaultInnerText,
                                                mark ? { color: "#717171", textDecorationLine: 'line-through', textDecorationStyle: 'solid' } : { color: "#717171" }
                                            ]}>{itemText}</Text>
                                            <TouchableOpacity onPress={handlingDeleteItem(keyIndex)}>
                                                <View style={{paddingLeft: 5, paddingRight: 5}}>
                                                    <Icon name="delete" size={20} color="red" />
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                            </React.Fragment>
                        ) )}
                        {sort === "asc" && <AddTaskButton />}
                    </View>
                </ScrollView>
            </View>
            <AnimatedAddTask isOpen={inputOpen} onCreate={whenTaskOnCreate} onClose={() => {setInputOpen(false)}} />
        </React.Fragment>
    )
}