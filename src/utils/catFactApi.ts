import type { CatFactResponse } from "~/types/CatFact";

export async function getCatFact(): Promise<CatFactResponse> {
  const response = await fetch("https://meowfacts.herokuapp.com/");
  return response.json() as Promise<CatFactResponse>;

  
}
