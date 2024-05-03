import { createPool } from "@vercel/postgres";

const pool = createPool({
    connectionString: import.meta.env.VITE_SNIPPET_URL ,
})

export const loadFavoriteSnippets = async (userID) => {
    try {
      // Fetch snippets which are included in user favorites list
      const snippets = await pool.sql`
        SELECT snippetID
        FROM favorites
        WHERE userID = ${userID};
      `;
      console.log(snippets.rows)
      return snippets.rows;
    } catch (error) {
      console.error('Error fetching user favorite snippets:', error);
      throw error; // Re-throw the error for handling in the calling code
    }
  };