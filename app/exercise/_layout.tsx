import { Stack } from "expo-router";

export default function ExerciseLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="[name]" options={{ title: "Exercise Details" }} />
    </Stack>
  );
}
