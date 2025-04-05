import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from "react-native";
import { useWorkoutStore } from "../store/workoutStore";
import { Ionicons } from "@expo/vector-icons";

const StartWorkout = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const workout = useWorkoutStore((state) => state.workouts.find((w) => w.id === id));


  const [elapsedTime, setElapsedTime] = useState(0);
  const [workoutDone, setWorkoutDone] = useState(false);

  const intervalId = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalId.current = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);
  
    return () => {
      if (intervalId.current !== null) {
        clearInterval(intervalId.current);
      }
    };
  }, []);
  

  const handleStop = () => {
    if (intervalId.current !== null) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }

    setWorkoutDone(true);

  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  if (!workout) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Workout not found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
        <View>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
      <Text style={styles.title}>{workout.name}</Text>
      </View>
      <Text style={styles.timer}>{formatTime(elapsedTime)}</Text>

        <TouchableOpacity
            style={[
                styles.stopButton,
                workoutDone && { backgroundColor: "#aaa" } 
                ]}
            onPress={handleStop}
            disabled={workoutDone}
            >
            <Text style={styles.stopButtonText}>
                {workoutDone ? "Workout Done" : "Stop Workout"}
            </Text>
        </TouchableOpacity>
        <Text style={styles.title}>Exercises</Text>
        <ScrollView style={{ flex: 1, marginVertical: 20}}>
        

      {workout.exercises.length > 0 ? (
        workout.exercises.map((exercise, index) => (
          
          <View key={index} style={styles.exerciseCard}>
            <Text style={styles.exerciseName}>{exercise.name}</Text>
            <Text style={styles.exerciseDetail}>Sets: {exercise.sets}</Text>
            <Text style={styles.exerciseDetail}>Reps: {exercise.reps}</Text>
          </View>
          
        ))
      ) : (
        <Text style ={styles.noworkouts}>No exercises in this workout</Text>
      )}
      </ScrollView>

      
    </SafeAreaView>
  );
};

export default StartWorkout;

const styles = StyleSheet.create({
    

    backButton: {
        position: "absolute",
        top: 10,
        left: 10,
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 5,
    },  
    backButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
      
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    top: 13,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  timer: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 80,
    color: "#3c60d0",
  },

  exerciseCard: {
    padding: 12,
    marginVertical: 5,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  noworkouts:{
    textAlign: "center",
    color: "red",
  },
  exerciseDetail: {
    fontSize: 16,
    marginTop: 4,
  },
  stopButton: {
    width: "50%",
    alignSelf: "center",
 
    marginBottom: 30,
    backgroundColor: "#e75f5f",
    paddingVertical: 12,    
    borderRadius: 10,
    alignItems: "center",
  },
  stopButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
