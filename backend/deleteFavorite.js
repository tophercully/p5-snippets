import { createPool } from "@vercel/postgres";

const pool = createPool({
  connectionString: import.meta.env.VITE_SNIPPET_URL,
});

export const deleteFavorite = async (userID, snippetIDToRemove) => {
  try {
    // Update Favorites and return the updated array
    const result = await pool.sql`
        UPDATE Favorites
        SET userfavorites = array_remove(userfavorites, ${snippetIDToRemove})
        WHERE userID = ${userID}
        RETURNING userfavorites;
    `;

    const updatedFavorites = result.allfavorites;
    console.log(
      `SnippetID ${snippetIDToRemove} removed from favorites for userID ${userID}`,
    );
    return updatedFavorites;
  } catch (error) {
    console.error("Error removing snippet from favorites:", error);
    throw error; // Re-throw the error for handling in the calling code
  }
};
