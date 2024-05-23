import { createPool } from "@vercel/postgres";

console.log(import.meta.env.VITE_SNIPPET_URL);
const pool = createPool({
  connectionString: import.meta.env.VITE_SNIPPET_URL,
});

export const deleteSnippet = async (snippetIDToDelete) => {
  const deleteRow = async () => {
    await pool.sql`
            DELETE FROM Snippets
            WHERE SnippetID = ${snippetIDToDelete};
        `;

    console.log(`Snippet with SnippetID ${snippetIDToDelete} deleted`);
  };

  await deleteRow();
};
