const db = require("../db/db");

module.exports = {
    getModules: async function(req, res){
        try{
            const dbRes = await db.query(`
                SELECT
                    ram_modules.id,
                    ram_modules.price,
                    ram_modules.ecc,
                    ram_modules.cas_latency,
                    ram_modules.capacity,
                    ram_modules.model,
                    ram_modules.speed,
                    types.type AS ram_type,
                    brands.name AS brand_name,
                    configurations.conf AS configuration
                FROM ram_modules
                JOIN types ON ram_modules.type_id = types.id
                JOIN brands ON ram_modules.brand_id = brands.id
                JOIN configurations ON ram_modules.configuration_id = configurations.id
            `);

            //res.status(200).json(JSON.parse(dbRes.rows));
            res.status(200).json(dbRes.rows);
        }
        catch (err) {
            console.error('Error fetching modules', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    getBrands: async function(req, res){
        try{
            const dbRes = await db.query(`SELECT * FROM brands`);
            res.status(200).json(dbRes.rows);
        }
        catch (err) {
            console.error('Error fetching brands', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    getTypes: async function(req, res){
        try{
            const dbRes = await db.query(`SELECT * FROM types`);
            res.status(200).json(dbRes.rows);
        }
        catch (err) {
            console.error('Error fetching types', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    getConfigs: async function(req, res){
        try{
            const dbRes = await db.query(`SELECT * FROM configurations`);
            res.status(200).json(dbRes.rows);
        }
        catch (err) {
            console.error('Error fetching configurations', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};
