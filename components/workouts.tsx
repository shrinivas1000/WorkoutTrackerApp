import { View, Text, FlatList, StyleSheet, TextInput, Button, TouchableOpacity, ScrollView } from "react-native";
import { useState } from "react";
import { useWorkoutStore } from "../app/store/workoutStore";
import { Ionicons } from "@expo/vector-icons";

const Workouts = () => {
    const workouts = useWorkoutStore((state) => state.workouts);
    //useWorkoutStore is a custom hook that returns the workouts from the store

    const [workoutName, setWorkoutName] = useState("");
    const addWorkout = useWorkoutStore((state) => state.addWorkout);
    const deleteWorkout = useWorkoutStore((state) => state.deleteWorkout);

    if (workouts.length === 0) {
        return (
          <View>
            <Text style={styles.profileLine}>Profile</Text>

            
            
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter workout name"
                value={workoutName}
                onChangeText={setWorkoutName}
              />
              <Button
                color="#3c60d0"
                title="Add Workout"
                onPress={() => {
                  if (workoutName.trim() !== "") {
                    addWorkout(workoutName.trim());
                    setWorkoutName("");
                  }
                }}
              />
            </View>
            <Text style = {styles.workoutLine}>Your Workouts</Text>
            <Text style={styles.emptyText}>No workouts saved yet.</Text>
          </View>
        );
      }


    return (
        <View>
            <Text style={styles.profileLine}>Profile</Text>
            <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                placeholder="Enter workout name"
                value={workoutName}
                onChangeText={setWorkoutName}
            />
            <Button
                color="#3c60d0"
                title="Add Workout"
                onPress={() => {
                if (workoutName.trim() !== "") {
                    addWorkout(workoutName.trim());
                    setWorkoutName(""); 
                }
                }}
            />
            </View>
            <Text style = {styles.workoutLine}>Your Workouts</Text>
        <ScrollView contentContainerStyle={{ paddingBottom: 270 }}
        showsVerticalScrollIndicator={false}>
        <FlatList
            scrollEnabled={false}
            data={workouts}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer} 
            renderItem={({ item }) => (
                <View style={styles.workoutCard}>
                    <View style={styles.workoutHeader}>
                    <Text style={styles.workoutName}>{item.name}</Text>
                    <TouchableOpacity onPress={() => deleteWorkout(item.id)}>
                        <Ionicons name="close-circle" size={30} color="#e75f5f" />
                    </TouchableOpacity>
                    </View>
                    <Text style={styles.exerciseCount}>
                    Exercises: {item.exercises.length}
                    </Text>
                </View>
            )}
            
        />
        </ScrollView>
        
      </View>
    );
  };


export default Workouts;

const styles = StyleSheet.create({
    profileLine:{
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 50,
    color: "#333232",
    },
    workoutLine:{
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 0,

    marginTop: 80,
    marginBottom: 20,
    color: "#333232",
    },
    input:{
        flex: 1,
        borderWidth: 1,
        borderColor: "#3c60d0",
        borderRadius: 20,
        padding: 10,
        marginRight: 10,

    },
    workoutHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    inputContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 10,
      borderRadius: 10,
      backgroundColor: "#fff",
    },
    emptyContainer: {
      marginTop: 20,
      alignItems: "center",
    },
    emptyText: {
        textAlign: "center",
        marginTop: 50,
      fontSize: 16,
      color: "#666",
    },
    listContainer: {
      paddingBottom: 20,
    },
    workoutCard: {
      padding: 16,
      marginBottom: 12,
      backgroundColor: "#fff",
      borderRadius: 12,
    },
    workoutName: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 4,
    },
    exerciseCount: {
      fontSize: 16,
      color: "#555",
    },
  });
  


