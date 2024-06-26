import { View, KeyboardAvoidingView, TextInput, Button, StyleSheet, Alert, Modal } from "react-native"
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState, useSyncExternalStore } from "react";
import { storeTask, getTask } from '../AsyncStorage.js';
import * as Haptics from 'expo-haptics';

const AddNewItem = ({ listContent, setListContent, listData, setListData, isModalVisible, setIsModalVisible }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(new Date());
    const onDateChange = (event, date) => {
        setSelectedDate(date);
        console.log("date: ", date);
    };
    const onTimeChange = (event, time) => {
        setSelectedTime(time);
        console.log("time: ", time);
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
            setListData((prevListData) => [...prevListData, content]);
            setListContent('');
            await storeTask(content);
        }
    };
    return <Modal visible={isModalVisible} onRequestClose={() => setIsModalVisible(false)} animationType="slide" presentationStyle="pageSheet">
        <View style={styles.mainContent}>
            <View style={styles.newItemContainer}>
                <TextInput
                    style={styles.inputBox}
                    value={listContent}
                    onChangeText={setListContent}
                    placeholder="new item"
                />
                <View
                    style={styles.buttonContainer}>
                    <Button
                        title="+"
                        color="white"
                        onPress={() => addNewItem(listContent.trim())}
                    />
                </View>
            </View>
            <View style={styles.DateTimeSelector}>
                <DateTimePicker
                    testID="datePicker"
                    value={selectedDate}
                    mode={'date'}
                    is24Hour={false}
                    onChange={onDateChange}
                />
                <DateTimePicker
                    testID="TimePicker"
                    value={selectedTime}
                    mode={'time'}
                    is24Hour={false}
                    onChange={onTimeChange}
                />
            </View>
        </View>
    </Modal>
}

{/* <KeyboardAvoidingView behavior="position"></KeyboardAvoidingView> */ }

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
        gap: 8,
    },
    DateTimeSelector: {
        alignSelf: 'center',
        paddingHorizontal: 10,
        flexDirection: 'row'
    },
    buttonContainer: {
        backgroundColor: 'black',
        borderRadius: 8,
        width: 40
    }
});


export default AddNewItem;

