import { View, Text, StyleSheet, Pressable } from 'react-native';
import { removeAll } from '../AsyncStorage.js';

const Header = () => {
    return (
        <View style={styles.roundBg}>
            <Text style={styles.subHead}>Todo</Text>
            <Pressable onPress={removeAll}>
                <View style={styles.buttonBorder}>
                    <Text style={styles.closeButton}>i</Text>
                </View>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    subHead: {
        fontSize: 22,
        fontWeight: 800,
        padding: 15,
        marginLeft: 10,
    },
    closeButton: {
        fontSize: 22,
        fontWeight: 800,
        margin: "auto"
    },
    buttonBorder: {
        borderWidth: 3,
        borderColor: '#a0c7fa',
        padding: 6,
        marginRight: 20,
        marginVertical: 10,
        borderRadius: 150,
        width: 40,
    },
    roundBg: {
        backgroundColor: 'white',
        borderRadius: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

export default Header;
