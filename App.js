import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, View, FlatList, Button } from "react-native";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddModal, setIsAddModal] = useState(false);

  const addGoalHandler = (goalTitle) => {
    console.log(goalTitle);
    setCourseGoals((currentGoals) => [
      ...courseGoals,
      { id: Math.random().toString(), value: goalTitle },
    ]);
    setIsAddModal(false);

  };

  const removeGoalHandler = (goalId) => {
    setCourseGoals((currentGoals) => {
      return currentGoals.filter((goal) => goal.id !== goalId);
    });
  };

  const cancelGoalAdditionHandler = () =>{
     setIsAddModal(false);
  }

  return (
    <View style={styles.screen}>
      <Button
        title="Add a New Goal"
        onPress={() => {
          setIsAddModal(true);
        }}
      />
      <GoalInput visible={isAddModal} onPress={addGoalHandler} 
      onCancelClicked = {cancelGoalAdditionHandler}
      />
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={courseGoals}
        renderItem={(itemData) => (
          <GoalItem
            id={itemData.item.id}
            onDelete={removeGoalHandler}
            title={itemData.item.value}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50,
  },
});
