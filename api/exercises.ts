import { API_KEY } from "../utils/config";
import { BASE_URL } from "../utils/config";

export async function fetchExercises(muscle:string) {
    try{
        const response = await fetch(`${BASE_URL}?muscle=${muscle}`, {
            headers: {
                "X-Api-Key": API_KEY, //api ninjas expects this x-api-key for auth
            },
        });
    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
    } catch (error) {
        console.error("Could not fetch exercises", error);
        return [];
    }

    
}