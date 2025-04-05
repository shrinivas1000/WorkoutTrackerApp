import { Modal, View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { useWorkoutStore } from "../app/store/workoutStore";

type Props = {
  visible: boolean;
  onClose: () => void;
  onSelectWorkout: (id: string) => void;
};

const StartWorkoutModal = ({ visible, onClose, onSelectWorkout }: Props) => {
  const workouts = useWorkoutStore((state) => state.workouts);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Choose Workout</Text>
          {workouts.length === 0 ? (
            <Text style={styles.noWorkouts}>No workouts found. Please create one in the Profile tab.</Text>
          ) : (
            <FlatList
              data={workouts}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <Text style={styles.name}>{item.name}</Text>
                  <TouchableOpacity onPress={() => {
                    onSelectWorkout(item.id);
                    onClose();
                  }} style={styles.selectButton}>
                    <Text style={styles.buttonText}>Select</Text>
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

export default StartWorkoutModal;

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
  selectButton: {
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
  noWorkouts: {
    textAlign: "center",
    fontSize: 16,
    color: "#555",
  },
});
