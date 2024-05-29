import { createPool } from "@vercel/postgres";

const pool = createPool({
  connectionString: import.meta.env.VITE_SNIPPET_URL,
});

export const deleteFavorite = async (userID, snippetIDToRemove) => {
  try {
    // Check if the exact pair exists
    const { rows } = await pool.sql`
        SELECT COUNT(*) as count
        FROM favorites
        WHERE userID = ${userID}
        AND snippetID = ${snippetIDToRemove};
    `;

    const favoriteExists = rows[0].count > 0;

    // If the pair exists, delete it
    if (favoriteExists) {
      await pool.sql`
            DELETE FROM favorites
            WHERE userID = ${userID}
            AND snippetID = ${snippetIDToRemove};
        `;
      console.log(
        `SnippetID ${snippetIDToRemove} removed from favorites for userID ${userID}`,
      );
    } else {
      console.log(
        `SnippetID ${snippetIDToRemove} does not exist in favorites for userID ${userID}`,
      );
    }
  } catch (error) {
    console.error("Error removing snippet from favorites:", error);
    throw error; // Re-throw the error for handling in the calling code
  }
};
