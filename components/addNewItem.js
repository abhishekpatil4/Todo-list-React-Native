import { View, KeyboardAvoidingView, TextInput, Button, StyleSheet, Alert, Modal, TouchableWithoutFeedback, Keyboard } from "react-native"
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState, useSyncExternalStore } from "react";
import { storeTask, getTask } from '../AsyncStorage.js';
import * as Haptics from 'expo-haptics';

const AddNewItem = ({ listContent, setListContent, listData, setListData, isModalVisible, setIsModalVisible }) => {
    const [selectedDateTime, setSelectedDateTime] = useState(new Date());
    const onDateChange = (event, date) => {
        setSelectedDateTime(date);
    };
    const addNewItem = async (content) => {
        if (content == "") {
            Alert.alert('Warning', "Task cannot be empty!", [
                {
                    text: 'OK',
                    onPress: () => console.log('Cancel Pressed'),
                },
            ])
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Warning
            )
        } else {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
            setIsModalVisible(false);
            const newTask = {
                content: content,
                dateTime: selectedDateTime.toLocaleString()
            }
            setListData((prevListData) => [...prevListData, newTask]);
            setListContent('');
            await storeTask(newTask);
        }
    };
    return <Modal visible={isModalVisible} onRequestClose={() => setIsModalVisible(false)} animationType="slide" presentationStyle="pageSheet">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.mainContent}>
                <View style={styles.newItemContainer}>
                    <TextInput
                        style={styles.inputBox}
                        value={listContent}
                        onChangeText={setListContent}
                        placeholder="new item"
                    />
                </View>
                <View style={styles.DateTimeSelector}>
                    <DateTimePicker
                        testID="datePicker"
                        value={selectedDateTime}
                        mode={'datetime'}
                        is24Hour={false}
                        onChange={onDateChange}
                        placeholderText="Today"
                        minimumDate={new Date()}
                        display="spinner"
                    />
                </View>
                <View
                    style={styles.buttonContainer}>
                    <Button
                        title="Add"
                        color="white"
                        onPress={() => addNewItem(listContent.trim())}
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>
    </Modal>
}

const styles = StyleSheet.create({
    mainContent: {
        flex: 1,
        backgroundColor: '#bed8fa',
        paddingTop: 15,
    },
    inputBox: {
        flex: 10,
        borderWidth: 2,
        borderColor: '#b3b3b3',
        backgroundColor: 'white',
        height: 40,
        borderRadius: 8,
        margin: 'auto',
        paddingHorizontal: 10,
    },
    newItemContainer: {
        flexDirection: 'row',
        paddingTop: 8,
        paddingBottom: 30,
        paddingHorizontal: 20,
    },
    DateTimeSelector: {
        alignSelf: 'center',
        paddingHorizontal: 10,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 8,
    },
    buttonContainer: {
        backgroundColor: 'black',
        borderRadius: 8,
        maxWidth: 200,
        paddingHorizontal: 10,
        alignSelf: 'center',
        position: 'absolute',
        bottom: 400,
    }
});

{/* <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}></KeyboardAvoidingView> */ }

export default AddNewItem;

