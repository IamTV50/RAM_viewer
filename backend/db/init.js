// https://www.geeksforgeeks.org/how-to-create-a-guid-uuid-in-javascript/

const { Pool } = require('pg');
const mockData = require('../mock-data/data.json'); // Adjust the path based on your structure
const pool = new Pool({
    user: 'your_db_user',
    host: 'localhost',
    database: 'your_db_name',
    password: 'your_db_password',
    port: 5432,
});

async function initDatabase() {
    try {
        const client = await pool.connect();

        // Example of inserting mock data into a "ram" table
        for (const type in mockData) {
            for (const item of mockData[type]) {
                await client.query(
                    'INSERT INTO ram (brand, model, speed_in_mhz, capacity, configuration, cas_latency, ecc, price) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
                    [
                        item.brand,
                        item.model,
                        item.speed_in_MHz,
                        item.capacity,
                        item.configuration,
                        item.CAS_latency,
                        item.ECC,
                        item.price
                    ]
                );
            }
        }

        console.log('Database initialized with mock data.');
        client.release();
    } catch (err) {
        console.error('Error initializing database', err);
    }
}

module.exports = initDatabase;
