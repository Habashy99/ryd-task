import pg from 'pg'
const { Pool } = pg
const pool = new Pool()

async () => {
    const client = await pool.connect()
    try {
        await client.query('BEGIN')
        const queryFuelProducts = "INSERT INTO fuelProducts (name,euro,usd,pumpId) VALUES ('$1','$2','$3','$4')"
        await client.query(queryFuelProducts, ['SUPER E10', '8', '9', '1'])


        await client.query('COMMIT')
    } catch (e) {
        await client.query('ROLLBACK')
        throw e
    } finally {
        client.release()
    }
}