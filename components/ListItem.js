import { View, StyleSheet, Text, Pressable, Alert } from 'react-native';
import { removeTask } from '../AsyncStorage.js';

const ListItem = ({ content, setListData }) => {
    const updateList = async (itemToRemove) => {
        setListData((prevListData) => prevListData.filter((item) => item !== itemToRemove));
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
                <Text style={styles.subHead}>{content}</Text>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    subHead: {
        fontSize: 18,
        fontWeight: 600,
        padding: 15,
        marginLeft: 10,
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
