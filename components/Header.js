import { View, Text, StyleSheet } from 'react-native';

const Header = () => {
  return (
    <View style={styles.roundBg}>
      <Text style={styles.subHead}>Todo</Text>
      <View style={styles.buttonBorder}>
          <Text style={styles.closeButton}>i</Text>
      </View>
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
    margin:"auto"
  },
  buttonBorder: {
    borderWidth: 3,
    borderColor: '#a0c7fa',
    padding: 6,
    marginRight: 20,
    marginVertical: 10,
    borderRadius: 150,
    width:40,
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
