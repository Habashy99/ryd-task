import pg from 'pg'
const { Pool } = pg
const pool = new Pool()

async () => {
    const client = await pool.connect()
    try {
        await client.query('BEGIN')
        const queryPump = "INSERT INTO pumps (name,poiId) VALUES ('$1','$2')"
        await client.query(queryPump, ['1', '2'])


        await client.query('COMMIT')
    } catch (e) {
        await client.query('ROLLBACK')
        throw e
    } finally {
        client.release()
    }
}
