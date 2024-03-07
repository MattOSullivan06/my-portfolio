import { CatFactResponse } from "~/types/CatFact";

export async function getCatFact(): Promise<CatFactResponse> {
  try {
    const response = await fetch("https://meowfacts.herokuapp.com/");
    if (!response.ok) {
      throw new Error("Failed to fetch cat fact");
    }
    const catFactData = await response.json();

    if (!catFactData || typeof catFactData !== "object" || !("data" in catFactData)) {
      throw new Error("Invalid cat fact response format");
    }

    return { data: catFactData.data };
  } catch (error) {
    console.error("Error fetching cat fact:", error);
    throw error;
  }
}
