import { createPool } from "@vercel/postgres";

const pool = createPool({
    connectionString: import.meta.env.VITE_SNIPPET_URL ,
})

export const loadAllSnippets = async () => {
    const { rows } = await pool.sql`
        SELECT * FROM Snippets;
    `;

    const snippetsArray = rows.map((row) => ({
        snippetID: row.snippetid,
        name: row.name,
        code: row.code,
        tags: row.tags,
        author: row.author,
        authorID: Math.floor(row.authorid)
    }));

    return snippetsArray;
};