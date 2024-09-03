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
            const dbRes = await db.query(`SELECT name FROM brands`);
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
    updateModule: async function(req, res){
        const moduleToUpdate = req.params.id;
        let newPrice = req.body.newPrice;
        let newEcc = req.body.newEcc;
        let newCas = req.body.newCas;
        let newCapacity = req.body.newCapacity;
        let newSpeed = req.body.newSpeed;
        let newModel = req.body.newModel;
        let newBrand = req.body.newBrand;
        let newConf = req.body.newConf;

        try{
            await db.query(`UPDATE ram_modules
                SET price = $1,
                ecc = $2,
                cas_latency = $3,
                capacity = $4,
                speed = $5,
                model = $6,
                brand_id = (SELECT id FROM brands WHERE name = $7),
                configuration_id = (SELECT id FROM configurations WHERE conf = $8)
                WHERE id = $9;`,
                [newPrice,newEcc,newCas,newCapacity,newSpeed,newModel,newBrand,newConf,moduleToUpdate]);

            res.status(200).json({updated: 'ok'});
        }
        catch (err) {
            console.error('Error fetching configurations', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};
