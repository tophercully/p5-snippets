import { createPool } from "@vercel/postgres";

const pool = createPool({
  connectionString: import.meta.env.VITE_SNIPPET_URL,
});

export const loadAllSnippets = async () => {
  const { rows } = await pool.sql`
        SELECT 
            Snippets.snippetid, 
            Snippets.name, 
            Snippets.code, 
            Snippets.tags, 
            Snippets.author, 
            Snippets.authorid,
            COALESCE(fav_counts.favoriteCount, 0) AS favoriteCount
        FROM Snippets
        LEFT JOIN (
            SELECT snippetid, COUNT(*) AS favoriteCount
            FROM favorites
            GROUP BY snippetid
        ) AS fav_counts
        ON Snippets.snippetid = fav_counts.snippetid;
    `;

  const snippetsArray = rows.map((row) => ({
    snippetID: row.snippetid,
    name: row.name,
    code: row.code,
    tags: row.tags,
    author: row.author,
    authorID: Math.floor(row.authorid),
    favoriteCount: row.favoritecount,
  }));

  return snippetsArray;
};
