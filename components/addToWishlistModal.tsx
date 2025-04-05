import { Modal, View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { useWorkoutStore } from "../app/store/workoutStore";
import { Alert } from "react-native";
import { setParams } from "expo-router/build/global-state/routing";

type Props = {
  visible: boolean;
  onClose: () => void;
  exerciseName: string;
};

const AddToWorkoutModal = ({ visible, onClose, exerciseName }: Props) => {
  const workouts = useWorkoutStore((state) => state.workouts);
  const addExerciseToWorkout = useWorkoutStore((state) => state.addExerciseToWorkout);

  const handleAdd = (workoutId: string) => {
    addExerciseToWorkout(workoutId, {
      name: exerciseName,
      muscle: "", 
      sets: 3,
      reps: 12,
    });
    onClose();
    Alert.alert(
        "Exercise Added",
        `Added to "${workouts.find(w => w.id === workoutId)?.name}"`,
        [{ text: "OK" }],
        { cancelable: true }
      );
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Add to Workout</Text>
  
          {workouts.length === 0 ? (
            <Text style={{ textAlign: "center", color: "#666", marginVertical: 20 }}>
              Please create a workout in the Profile tab
            </Text>
          ) : (
            <FlatList
              data={workouts}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <Text style={styles.name}>{item.name}</Text>
                  <TouchableOpacity style={styles.addButton} onPress={() => handleAdd(item.id)}>
                    <Text style={styles.buttonText}>Add</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          )}
  
          <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );  
};

export default AddToWorkoutModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    maxHeight: "70%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  name: {
    fontSize: 16,
  },
  addButton: {
    backgroundColor: "#64a9dc",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  cancelButton: {
    marginTop: 16,
    alignSelf: "center",
  },
  cancelText: {
    color: "red",
    fontSize: 16,
  },
});
