import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeTask = async (newTask) => {
    try {
        const storedTasks = await AsyncStorage.getItem('tasks');
        if (storedTasks) {
            const storedTasksArr = JSON.parse(storedTasks);
            storedTasksArr.push(newTask);
            await AsyncStorage.setItem('tasks', JSON.stringify(storedTasksArr));
        } else {
            const storedTasksArr = [newTask];
            await AsyncStorage.setItem('tasks', JSON.stringify(storedTasksArr));
        }
        console.log(`Added task: `, newTask);
    } catch (e) {
        console.log(e);
    }
};

export const getTask = async () => {
    try {
        const storedTasks = await AsyncStorage.getItem('tasks');
        return storedTasks != null ? JSON.parse(storedTasks) : null;
    } catch (e) {
        console.log(e);
    }
};

export const removeTask = async (taskToRemove) => {
    try {
        const storedTasks = await AsyncStorage.getItem('tasks');
        const storedTasksArr = JSON.parse(storedTasks);
        const newArray = storedTasksArr.filter((task) => task.content !== taskToRemove);
        await AsyncStorage.setItem('tasks', JSON.stringify(newArray));
        console.log(`Removed task: `, taskToRemove);
    } catch (e) {
        console.log(e);
    }
}

export const removeAll = async () => {
    try {
      await AsyncStorage.removeItem('tasks')
      console.log("Removed all tasks");
    } catch(e) {
      console.log(e);
    }
  }