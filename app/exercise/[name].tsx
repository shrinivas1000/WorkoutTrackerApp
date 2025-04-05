import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, StyleSheet, SafeAreaView, Text, View, TouchableOpacity } from "react-native";
import { useState } from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons"; 
import AddToWorkoutModal from "../../components/addToWishlistModal";
import { formatLabel } from "../../utils/format";

const ExerciseDetails = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const exercise = useLocalSearchParams();
  const router = useRouter();

 
  const exerciseDetails = {
    name: exercise.name as string,
    muscle: exercise.muscle as string,
    equipment: exercise.equipment as string,
    difficulty: exercise.difficulty as string,
    instructions: exercise.instructions as string,
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>

        <Text style={styles.exerciseName}>{exerciseDetails.name}</Text>

        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addButton}>
          <AntDesign name="pluscircle" size={30} color="#3c60d0" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.muscleLine}>Target Muscle: {formatLabel(exerciseDetails.muscle)}</Text>
        <Text style={styles.eqLine}>Equipment Required: {formatLabel(exerciseDetails.equipment)}</Text>
        <Text style={styles.diffLine}>Difficulty: {formatLabel(exerciseDetails.difficulty)}</Text>
        <Text style={styles.instructionstitle}>Instructions</Text>
        <Text style={styles.instructions}>{exerciseDetails.instructions}</Text>
      </ScrollView>

      <AddToWorkoutModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        exerciseName={exerciseDetails.name}
      />
    </SafeAreaView>
  );
};

export default ExerciseDetails;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
  },
  backButton: {
    padding: 5,
  },
  addButton: {
    padding: 5,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  exerciseName: {
    fontSize: 24,
    width: "80%",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
    color: "#333232",
  },
  muscleLine: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 10,
  },
  eqLine: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 10,
  },
  diffLine: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 10,
  },
  instructionstitle: {
    fontSize: 24,
    fontWeight: "700",
    marginTop: 15,
    textAlign: "justify",
    lineHeight: 24,
  },
  instructions: {
    fontSize: 16,
    fontWeight: "400",
    marginTop: 15,
    textAlign: "justify",
    lineHeight: 24,
  },
});
