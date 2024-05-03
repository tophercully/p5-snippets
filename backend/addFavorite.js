import { createPool } from "@vercel/postgres";

const pool = createPool({
    connectionString: import.meta.env.VITE_SNIPPET_URL ,
})

export const addFavorite = async (userID, snippetIDToAdd) => {
    try {
      // Check if the user has a record in Favorites
        const existingFavorites = await pool.sql`
        SELECT COUNT(*)
        FROM favorites
        WHERE userID = ${userID};
        `
        const userHasFavorites = existingFavorites > 0 ? false : true;

        console.log(existingFavorites)
  
      // If the user doesn't have a record, create one
      if (!userHasFavorites) {
        await pool.sql`
          INSERT INTO Favorites (userID, snippetID)
          VALUES (${userID}, ${Math.floor(snippetIDToAdd)});
        `;
        console.log('created favorites list for user')
      } else {
        // Update Favorites and return the updated array
        const result = await pool.sql`
          INSERT INTO favorites (userID, snippetID)
          VALUES (${userID}, ${Math.floor(snippetIDToAdd)});
        `

        const updatedFavorites = result.allfavorites;
        console.log(updatedFavorites)
        console.log(`SnippetID ${Math.floor(snippetIDToAdd)} added to favorites for userID ${userID}`);
        return updatedFavorites;
      }
    } catch (error) {
      console.error('Error adding snippet to favorites:', error);
      throw error; // Re-throw the error for handling in the calling code
    }
  };
  
  

