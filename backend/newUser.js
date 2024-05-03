import { createPool } from "@vercel/postgres";

const pool = createPool({
    connectionString: import.meta.env.VITE_SNIPPET_URL ,
})

export const newUser = async (params) => {
    if(params) {

        const { rows } = await pool.sql`
        SELECT EXISTS (
            SELECT 1 FROM Snippet_Users
            WHERE Email = ${params.email}
            ) AS UserExists;`;
            
            const userExists = rows[0].userexists;
            
            if (!userExists) {
                await pool.sql`
                INSERT INTO Snippet_Users(Name, Email, Googleid)
                VALUES (${params.name}, ${params.email}, ${params.id})`;
                
                console.log('User created');
            } else {
                console.log('User with the specified email already exists');
            }
    }
};