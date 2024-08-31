const express = require('express');
const router = express.Router();
const db = require('../db/db');

router.get('/', function (req, res){
   res.status(200).json({'ram': 'data'});
});

//get all ram modules
router.get('/all', async function (req, res){
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

      res.status(200).json({'rowsData': dbRes.rows});
   }
   catch (err) {
      console.error('Error fetching data', err);
      res.status(500).json({ error: 'Internal Server Error' });
   }
});

/*
router.post('/', function (req, res){
   res.status(200).json({'ram': 'bland post request'});
});

router.patch('/:id', function (req, res){
   let id = req.params.id;
   res.status(200).json({'ram id': id});
});

//test
router.post('/abc', function (req, res){
   res.status(200).json({'ram': req.body.aaa});
});
*/

module.exports = router;