import { createPool } from "@vercel/postgres";

console.log(import.meta.env.VITE_SNIPPET_URL);
const pool = createPool({
  connectionString: import.meta.env.VITE_SNIPPET_URL,
});

export const updateSnippet = async (snippetIDToUpdate, newParams) => {
  const updateRow = async () => {
    await pool.sql`
            UPDATE Snippets
            SET 
                Name = ${newParams.name},
                Code = ${newParams.code},
                Tags = ${newParams.tags},
                Author = ${newParams.author},
                AuthorID = ${Math.floor(newParams.id)}
            WHERE SnippetID = ${snippetIDToUpdate};
        `;

    console.log(
      `Snippet with SnippetID ${snippetIDToUpdate} updated`,
    );
  };

  await updateRow();
};
