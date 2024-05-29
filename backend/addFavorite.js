import { createPool } from "@vercel/postgres";

const pool = createPool({
  connectionString: import.meta.env.VITE_SNIPPET_URL,
});

export const addFavorite = async (userID, snippetIDToAdd) => {
  try {
    // Check if the exact pair exists
    const { rows } = await pool.sql`
        SELECT COUNT(*) as count
        FROM favorites
        WHERE userID = ${userID}
        AND snippetID = ${snippetIDToAdd};
    `;

    const favoriteExists = rows[0].count > 0;

    // If the pair doesn't exist, create it
    if (!favoriteExists) {
      await pool.sql`
            INSERT INTO favorites (userID, snippetID)
            VALUES (${userID}, ${snippetIDToAdd});
        `;
      console.log(
        `SnippetID ${snippetIDToAdd} added to favorites for userID ${userID}`,
      );
    } else {
      console.log(
        `SnippetID ${snippetIDToAdd} already exists in favorites for userID ${userID}`,
      );
    }
  } catch (error) {
    console.error("Error adding snippet to favorites:", error);
    throw error; // Re-throw the error for handling in the calling code
  }
};
