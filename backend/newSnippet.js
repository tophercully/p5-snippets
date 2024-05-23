import { createPool } from "@vercel/postgres";

const pool = createPool({
  connectionString: import.meta.env.VITE_SNIPPET_URL,
});

export const newSnippet = async (params) => {
  const linePreservedCode = params.code.replace(
    "/\r\n/g",
    String.fromCharCode(13) + String.fromCharCode(10),
  );

  const commit = async () => {
    const { rows } = await pool.sql`
            SELECT SnippetID
            FROM Snippets
            ORDER BY SnippetID DESC
            LIMIT 1;
        `;

    const latestSnippetID = rows.length > 0 ? rows[0].snippetid : 0;

    const snippetID = latestSnippetID + 1;

    await pool.sql`
            INSERT INTO Snippets(SnippetID, Name, Code, Tags, Author, AuthorID)
            VALUES (${snippetID}, ${params.name}, ${linePreservedCode}, ${params.tags}, ${params.author}, ${Math.floor(params.id)});
        `;

    console.log("Snippet created");
  };

  await commit();
};
