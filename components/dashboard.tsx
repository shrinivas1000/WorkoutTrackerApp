import { useState, useEffect } from "react";
import { TouchableOpacity, StyleSheet, View, Text, FlatList, SafeAreaView, Alert } from "react-native";
import { fetchExercises } from "../api/exercises";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AddToWorkoutModal from "./addToWishlistModal";
import StartWorkoutModal from "./startWorkoutModal";
import { formatLabel } from "../utils/format";

type Exercise = {
  name: string;
  type: string;
  muscle: string;
  equipment: string;
  difficulty: string;
  instructions: string;
};

const Dashboard = () => {
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [startWorkoutModalVisible, setStartWorkoutModalVisible] = useState(false);
  const [selectedExerciseName, setSelectedExerciseName] = useState("");
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const router = useRouter(); 

  useEffect(() => {
    const fetchExercisesData = async () => {
      try {
        const data = await fetchExercises(""); 
        setExercises(data || []); 
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };

    fetchExercisesData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style= {{ flexDirection: "row", justifyContent: "space-between" }}>
      <Text style={styles.title}>Dashboard</Text>

      <TouchableOpacity
        onPress={() => setStartWorkoutModalVisible(true)}
        style={{ marginBottom: 20, backgroundColor: "#3c60d0", padding: 12, borderRadius: 8}}
      >
        <Text style={{ color: "#fff", textAlign: "center", fontWeight: "bold" }}>Start Workout</Text>
      </TouchableOpacity>
      </View>

      <FlatList
        data={exercises}
        keyExtractor={(item) => `${item.name}-${item.muscle}`}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push({ pathname: `/exercise/${item.name}`, params: item })}
          >
            <View style={styles.item}>
              <Text style={styles.exerciseName}>{item.name}</Text>
              <View style={styles.miniContainer}>
                <Text style={styles.muscleName}>{formatLabel(item.muscle)}</Text>
                <Text style={styles.diffName}>{formatLabel(item.difficulty)}</Text>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedExerciseName(item.name);
                    setAddModalVisible(true);
                  }}
                >
                  <AntDesign name="pluscircle" size={35} color="#3c60d0" />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
      />

      <AddToWorkoutModal
        visible={addModalVisible}
        onClose={() => setAddModalVisible(false)}
        exerciseName={selectedExerciseName}
      />

      <StartWorkoutModal
        visible={startWorkoutModalVisible}
        onClose={() => setStartWorkoutModalVisible(false)}
        onSelectWorkout={(id) => {
          setStartWorkoutModalVisible(false);
          router.push(`/startWorkout/${id}`);
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    padding: 20,
    width: "100%",
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginRight: "20%",
    marginBottom: 15,
    color: "#333232",
  },
  item: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    marginVertical: 5,
    width: "100%",
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: "500",
  },
  miniContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 15,
  },
  muscleName: {
    fontSize: 16,
    fontWeight: "400",
    color: "#ec5d5d",
    marginLeft: 10,
    borderRadius: 5,
    padding: 4,
  },
  diffName: {
    fontSize: 16,
    fontWeight: "400",
    color: "#6883d6",
    marginLeft: 10,
    borderRadius: 5,
    padding: 4,
  },
});

export default Dashboard;
