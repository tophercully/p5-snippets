import { createPool } from "@vercel/postgres";

const pool = createPool({
    connectionString: import.meta.env.VITE_SNIPPET_URL ,
})

export const loadFavorites = async (userID) => {
    try {
        const snippets = await pool.sql`
            SELECT *
            FROM snippets
            WHERE snippetID IN (
                SELECT snippetID
                FROM favorites
                WHERE userID = ${userID}
            );
        `;

        const snippetsArray = snippets.rows.map((row) => ({
            snippetID: row.snippetid,
            name: row.name,
            code: row.code,
            tags: row.tags,
            author: row.author,
            authorID: Math.floor(row.authorid)
        }));

        return snippetsArray;
    } catch (error) {
        console.error('Error retrieving favorite snippets:', error);
        throw error; // Re-throw the error for handling in the calling code
    }
};