import { View, StyleSheet, Text, Pressable, Alert } from 'react-native';
import { removeTask } from '../AsyncStorage.js';

const ListItem = ({ content, setListData, dateTime }) => {
    const formattedDateTime = () => {
        let [date, time] = dateTime.toLocaleString().split(",");
        let today = new Date();
        today = today.toLocaleString().split(",")[0];

        //time
        let timeArray = time.split(":");
        let hour = timeArray[0].trim();
        if (hour.length === 1) {
            hour = "0" + hour;
        }
        let mins = timeArray[1];
        let second_ampm = timeArray[2];
        let ampm = second_ampm.slice(-2);
        const formattedTime = hour + ":" + mins + " " + ampm;

        if (date == today) {
            return ['', formattedTime];
        }

        //date
        const months = { 0: "Jan", 1: "Feb", 2: "Mar", 3: "Apr", 4: "May", 5: "Jun", 6: "Jul", 7: "Aug", 8: "Sep", 9: "Oct", 10: "Nov", 11: "Dec" };
        let dateArray = date.split("/");
        let day = dateArray[0];
        let month = dateArray[1];
        const formattedDate = day + " " + months[month];

        return [formattedDate, formattedTime];
    }

    const updateList = async (itemToRemove) => {
        setListData((prevListData) => prevListData.filter((item) => item.content !== itemToRemove));
        removeTask(itemToRemove);
    };
    return (
        <Pressable
            onPress={() =>
                Alert.alert('Todo item', `${content}`, [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                    },
                    { text: 'Done', onPress: () => updateList(content) },
                ])
            }>
            <View style={styles.roundBg}>
                <Text style={[styles.subHead, { flex: 1 }]}>{content}</Text>
                <Text style={[styles.subHead, { textAlign: "right" }]}>{formattedDateTime()[0]} {formattedDateTime()[1]}</Text>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    subHead: {
        fontSize: 18,
        fontWeight: 400,
        padding: 15,
        marginHorizontal: 10,
        lineHeight:22
    },
    roundBg: {
        backgroundColor: 'white',
        borderRadius: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 8,
    },
});

export default ListItem;
