import pg from 'pg'
const { Pool } = pg
const pool = new Pool()

async () => {
    const client = await pool.connect()
    try {
        await client.query('BEGIN')
        const queryPOI = "INSERT INTO pois (status,country,zipCode,city,street,houseNumber) VALUES ('$1','$2','$3','$4',' $5','$6')"
        await client.query(queryPOI, ['ONLINE', 'Germany', '80939', 'München', ' Ingolstaedter Str', '59'])


        await client.query('COMMIT')
    } catch (e) {
        await client.query('ROLLBACK')
        throw e
    } finally {
        client.release()
    }
}
