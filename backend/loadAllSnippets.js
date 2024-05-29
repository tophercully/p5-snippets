import { createPool } from "@vercel/postgres";

const pool = createPool({
  connectionString: import.meta.env.VITE_SNIPPET_URL,
});

export const loadAllSnippets = async () => {
  const { rows } = await pool.sql`
    WITH FavoriteCounts AS (
        SELECT snippetid, COUNT(*) AS favoriteCount
        FROM favorites
        GROUP BY snippetid
    )
    SELECT 
        Snippets.snippetid, 
        Snippets.name, 
        Snippets.code, 
        Snippets.tags, 
        Snippets.author, 
        Snippets.authorid,
        COALESCE(FavoriteCounts.favoriteCount, 0) AS favoriteCount
    FROM Snippets
    LEFT JOIN FavoriteCounts
    ON Snippets.snippetid = FavoriteCounts.snippetid;
`;

  const existingFavorites =
    localStorage.getItem("favorites") ?
      JSON.parse(localStorage.getItem("favorites"))
    : [];
  console.log(existingFavorites + existingFavorites.typeof);
  const snippetsArray = rows.map((row) => ({
    snippetID: row.snippetid,
    name: row.name,
    code: row.code,
    tags: row.tags,
    author: row.author,
    authorID: Math.floor(row.authorid),
    favoriteCount: row.favoritecount,
    isFavorite: (existingFavorites.typeof =
      "array" ?
        existingFavorites.some((e) => e.snippetID === row.snippetID)
      : false),
  }));

  return snippetsArray;
};
