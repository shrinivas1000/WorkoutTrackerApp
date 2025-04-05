
import { fetchExercises } from "./exercises";

async function testApi() {
  const data = await fetchExercises("chest");
  console.log("API Response:", data);
}

testApi();
