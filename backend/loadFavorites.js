import { createPool } from "@vercel/postgres";

const pool = createPool({
    connectionString: import.meta.env.VITE_SNIPPET_URL ,
})

export const loadFavorites = async (userID) => {
    const { rows } = await pool.sql`
        SELECT userfavorites
        FROM Favorites
        WHERE userID = ${userID};
    `;
    console.log('returning', rows)
    return rows.length > 0 ? rows[0].userfavorites : [];

};