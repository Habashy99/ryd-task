import pg from 'pg'
const { Pool } = pg
const pool = new Pool()

async () => {
    const client = await pool.connect()
    try {
        await client.query('BEGIN')
        const queryOpeningHours = "INSERT INTO fuelProducts (startDay,endDay,openTime,closeTime,poiId) VALUES ('$1','$2','$3','$4',' $5')"
         await client.query(queryOpeningHours, ['1', '4', '8:00', '20:00', '1'])


        await client.query('COMMIT')
    } catch (e) {
        await client.query('ROLLBACK')
        throw e
    } finally {
        client.release()
    }
}
