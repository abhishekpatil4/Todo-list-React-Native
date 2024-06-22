import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  KeyboardAvoidingView,
  Button,
  ScrollView,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import ListItem from './components/ListItem';

const items = [
  'Go for a run',
];

export default function App() {
  const [listData, setListData] = useState([]);
  const [listContent, setListContent] = useState('');
  useState(() => {
    setListData(items);
  }, []);
  const addNewItem = (content) => {
    // Haptics.selectionAsync();
    // Haptics.notificationAsync(
    //   Haptics.NotificationFeedbackType.Warning
    // );
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setListData((prevListData) => [...prevListData, content]);
    setListContent('');
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContent}>
        <Header />
        <ScrollView style={styles.itemContainer}>
          {listData.length > 0 &&
            listData.map((i, idx) => (
              <ListItem key={idx} content={i} setListData={setListData} />
            ))}
        </ScrollView>
      </View>
      <KeyboardAvoidingView behavior="position">
        <View style={styles.newItemContainer}>
          <TextInput
            style={styles.inputBox}
            value={listContent}
            onChangeText={setListContent}
            placeholder="new item"
          />
          <View
            style={{ backgroundColor: 'black', borderRadius: 8, width: 40 }}>
            <Button
              title="+"
              color="white"
              onPress={() => addNewItem(listContent)}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a0c7fa',
    padding: 8,
  },
  mainContent: {
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  itemContainer: {
    marginTop: 40,
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
    paddingBottom:30,
    paddingHorizontal: 20,
    gap: 8,
    backgroundColor: '#a0c7fa',
  },
});
