import { Text, SafeAreaView, StyleSheet, View, ScrollView, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import Header from './components/Header.js';
import ListItem from './components/ListItem.js';
import { storeTask, getTask } from './AsyncStorage.js';
import AddNewItem from './components/addNewItem.js';

export default function App() {
  const [listData, setListData] = useState([]);
  const [listContent, setListContent] = useState('');
  useEffect(() => {
    const getStoredTask = async () => {
      const storedTasks = await getTask();
      if (storedTasks) {
        setListData(storedTasks);
      } else {
        setListContent(null);
      }
    }
    getStoredTask();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContent}>
        <Header setListData={setListData} />
        <ScrollView style={styles.itemContainer}>
          {listData.length > 0 ?
            listData.map((i, idx) => (
              <ListItem key={idx} content={i} setListData={setListData} />
            ))
            :
            <Text style={styles.noTaskMessage}>No tasks to display</Text>
          }
        </ScrollView>
      </View>
      <AddNewItem listContent={listContent} setListContent={setListContent} listData={listData} setListData={setListData} />
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
  noTaskMessage: {
    textAlign: 'center',
    fontSize: 20,
    marginVertical: 20,
  },
});
