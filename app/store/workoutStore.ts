
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";


//persist ensures that the state isnt lost when the app is restarted 
//createJSONStorage is used to create a JSON storage for the state

type Exercise = {
    name: string;
    muscle: string;
    sets: number;
    reps: number;
  };
  
  type Workout = {
    id: string;
    name: string;
    exercises: Exercise[];
  };

type WorkoutStore ={
    workouts: Workout[];
    addWorkout: (name: string) => void;
    deleteWorkout: (workoutId: string) => void;
    addExerciseToWorkout: (workoutId: string, exercise: Exercise) => void;
}


export const useWorkoutStore = create<WorkoutStore>()(
    persist(
      (set, get) => ({
        workouts: [],

        addWorkout: (name: string) => {
            const newWorkout = {
              id: Date.now().toString(), //this is my id
              name,
              exercises: [],
            };
            set((state) => ({
              workouts: [...state.workouts, newWorkout],
            }));
          },

        deleteWorkout: (workoutId: string) => {
            set((state) => ({
              workouts: state.workouts.filter((w) => w.id !== workoutId),
            }));
          }  ,
          

        addExerciseToWorkout: (workoutId, exercise) => {
          set((state) => ({
            workouts: state.workouts.map((w) => //im using map to loop thru all workouts and find the one with the matching id
              w.id === workoutId ? { ...w, exercises: [...w.exercises, exercise] } : w
            ),
            //if correct workout is found, add the exercise to the exercises array of that workout
            //else return the workout as it is
          }));
        },
      }),


      {
        name: "workout-storage",
        storage: createJSONStorage(() => AsyncStorage),
      }
    )
  );