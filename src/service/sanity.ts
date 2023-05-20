import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: "2023-05-18",
  useCdn: false,
  token: process.env.SANITY_SECRET_TOKEN,
});
