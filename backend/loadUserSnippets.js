import { createPool } from "@vercel/postgres";

console.log(import.meta.env.VITE_SNIPPET_URL);
const pool = createPool({
  connectionString: import.meta.env.VITE_SNIPPET_URL,
});

export const loadUserSnippets = async (userID) => {
  try {
    // Fetch snippets with authorID matching userID
    const snippets = await pool.sql`
        SELECT *
        FROM Snippets
        WHERE authorID = ${userID};
      `;

    return snippets;
  } catch (error) {
    console.error("Error fetching snippets by authorID:", error);
    throw error; // Re-throw the error for handling in the calling code
  }
};
