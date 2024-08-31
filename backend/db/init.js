const db = require('./db');

const types = ['DDR5','DDR4','DDR3','DDR2','DDR']
const brands = ['Corsair', 'G.Skill', 'Kingston', 'TeamGroup', 'Patriot', 'Crucial']
const configurations = ['1x1','2x1', '2x2', '1x2', '1x4', '2x4', '4x4', '1x8', '2x8', '4x8', '1x16', '2x16', '4x16', '2x32', '4x32', '2x64', '4x64', '1x32', '8x64'];

const typeIds = new Map();
const brandIds  = new Map();
const configIds = new Map();

async function initDatabase() {
    try {
        //drop everything before :)
        await db.query('DELETE FROM ram_modules;');
        await db.query('DELETE FROM types;');
        await db.query('DELETE FROM brands;');
        await db.query('DELETE FROM configurations;');

        // Insert types
        const typePromises = types.map(async (ramType) => {
            const result = await db.query('INSERT INTO types (type) VALUES ($1) RETURNING id', [ramType]);
            typeIds.set(ramType, result.rows[0].id);
        });

        // Insert brands
        const brandPromises = brands.map(async (ramBrand) => {
            const result = await db.query('INSERT INTO brands (name) VALUES ($1) RETURNING id', [ramBrand]);
            brandIds.set(ramBrand, result.rows[0].id);
        });

        // Insert configurations
        const configPromises = configurations.map(async (ramConf) => {
            const result = await db.query('INSERT INTO configurations (conf) VALUES ($1) RETURNING id', [ramConf]);
            configIds.set(ramConf, result.rows[0].id);
        });

        // Wait for all types, brands, and configurations to be inserted
        await Promise.all([...typePromises, ...brandPromises, ...configPromises]);

        //insert ram modules
        const ramModules = [
            {
                "brand_id": brandIds.get("Corsair"),
                "model":"Vengeance DDR5",
                "speed_in_MHz":5200,
                "capacity":32,
                "configuration_id": configIds.get("2x16"),
                "CAS_latency":38,
                "ECC":false,
                "price":299.99,
                "type_id": typeIds.get("DDR5")
            },
            {
                "brand_id": brandIds.get("G.Skill"),
                "model":"Trident Z5 RGB",
                "speed_in_MHz":6000,
                "capacity":64,
                "configuration_id": configIds.get("2x32"),
                "CAS_latency":36,
                "ECC":false,
                "price":449.99,
                "type_id": typeIds.get("DDR5")
            },
            {
                "brand_id": brandIds.get("Kingston"),
                "model":"FURY Beast DDR5",
                "speed_in_MHz":4800,
                "capacity":16,
                "configuration_id": configIds.get("1x16"),
                "CAS_latency":40,
                "ECC":false,
                "price":149.99,
                "type_id": typeIds.get("DDR5")
            },
            {
                "brand_id": brandIds.get("TeamGroup"),
                "model":"T-Force Delta RGB DDR5",
                "speed_in_MHz":6400,
                "capacity":32,
                "configuration_id": configIds.get("2x16"),
                "CAS_latency":40,
                "ECC":false,
                "price":359.99,
                "type_id": typeIds.get("DDR5")
            },
            {
                "brand_id": brandIds.get("Patriot"),
                "model":"Viper Venom DDR5",
                "speed_in_MHz":6200,
                "capacity":32,
                "configuration_id": configIds.get("2x16"),
                "CAS_latency":34,
                "ECC":false,
                "price":329.99,
                "type_id": typeIds.get("DDR5")
            },
            {
                "brand_id": brandIds.get("Corsair"),
                "model":"Vengeance LPX",
                "speed_in_MHz":3200,
                "capacity":16,
                "configuration_id": configIds.get("2x8"),
                "CAS_latency":16,
                "ECC":false,
                "price":79.99,
                "type_id": typeIds.get("DDR5")
            },
            {
                "brand_id": brandIds.get("G.Skill"),
                "model":"Ripjaws V",
                "speed_in_MHz":3600,
                "capacity":32,
                "configuration_id": configIds.get("2x16"),
                "CAS_latency":18,
                "ECC":false,
                "price":159.99,
                "type_id": typeIds.get("DDR4")
            },
            {
                "brand_id": brandIds.get("Crucial"),
                "model":"Ballistix",
                "speed_in_MHz":3000,
                "capacity":8,
                "configuration_id": configIds.get("1x8"),
                "CAS_latency":15,
                "ECC":false,
                "price":39.99,
                "type_id": typeIds.get("DDR4")
            },
            {
                "brand_id": brandIds.get("Kingston"),
                "model":"HyperX Fury",
                "speed_in_MHz":2666,
                "capacity":16,
                "configuration_id": configIds.get("2x8"),
                "CAS_latency":16,
                "ECC":false,
                "price":69.99,
                "type_id": typeIds.get("DDR4")
            },
            {
                "brand_id": brandIds.get("Patriot"),
                "model":"Viper Steel",
                "speed_in_MHz":4400,
                "capacity":16,
                "configuration_id": configIds.get("2x8"),
                "CAS_latency":19,
                "ECC":false,
                "price":149.99,
                "type_id": typeIds.get("DDR4")
            },
            {
                "brand_id": brandIds.get("Kingston"),
                "model":"Server Premier DDR4 ECC",
                "speed_in_MHz":2400,
                "capacity":16,
                "configuration_id": configIds.get("1x16"),
                "CAS_latency":17,
                "ECC":true,
                "price":129.99,
                "type_id": typeIds.get("DDR4")
            },
            {
                "brand_id": brandIds.get("Corsair"),
                "model":"Vengeance DDR3",
                "speed_in_MHz":1600,
                "capacity":8,
                "configuration_id": configIds.get("2x4"),
                "CAS_latency":9,
                "ECC":false,
                "price":49.99,
                "type_id": typeIds.get("DDR4")
            },
            {
                "brand_id": brandIds.get("G.Skill"),
                "model":"Ares Series",
                "speed_in_MHz":1866,
                "capacity":16,
                "configuration_id": configIds.get("2x8"),
                "CAS_latency":10,
                "ECC":false,
                "price":89.99,
                "type_id": typeIds.get("DDR3")
            },
            {
                "brand_id": brandIds.get("Kingston"),
                "model":"HyperX Fury DDR3",
                "speed_in_MHz":1600,
                "capacity":4,
                "configuration_id": configIds.get("1x4"),
                "CAS_latency":11,
                "ECC":false,
                "price":29.99,
                "type_id": typeIds.get("DDR3")
            },
            {
                "brand_id": brandIds.get("Patriot"),
                "model":"Signature DDR3",
                "speed_in_MHz":1333,
                "capacity":8,
                "configuration_id": configIds.get("1x8"),
                "CAS_latency":9,
                "ECC":false,
                "price":39.99,
                "type_id": typeIds.get("DDR3")
            },
            {
                "brand_id": brandIds.get("Crucial"),
                "model":"Ballistix Sport",
                "speed_in_MHz":1866,
                "capacity":16,
                "configuration_id": configIds.get("2x8"),
                "CAS_latency":10,
                "ECC":false,
                "price":79.99,
                "type_id": typeIds.get("DDR3")
            },
            {
                "brand_id": brandIds.get("Crucial"),
                "model":"DDR3L ECC",
                "speed_in_MHz":1600,
                "capacity":8,
                "configuration_id": configIds.get("1x8"),
                "CAS_latency":11,
                "ECC":true,
                "price":89.99,
                "type_id": typeIds.get("DDR3")
            },
            {
                "brand_id": brandIds.get("Kingston"),
                "model":"ValueRAM DDR2",
                "speed_in_MHz":800,
                "capacity":4,
                "configuration_id": configIds.get("2x2"),
                "CAS_latency":6,
                "ECC":false,
                "price":24.99,
                "type_id": typeIds.get("DDR3")
            },
            {
                "brand_id": brandIds.get("Corsair"),
                "model":"XMS2",
                "speed_in_MHz":667,
                "capacity":2,
                "configuration_id": configIds.get("1x2"),
                "CAS_latency":5,
                "ECC":false,
                "price":19.99,
                "type_id": typeIds.get("DDR2")
            },
            {
                "brand_id": brandIds.get("Crucial"),
                "model":"DDR2 800 MHz",
                "speed_in_MHz":800,
                "capacity":2,
                "configuration_id": configIds.get("1x2"),
                "CAS_latency":6,
                "ECC":false,
                "price":14.99,
                "type_id": typeIds.get("DDR2")
            },
            {
                "brand_id": brandIds.get("G.Skill"),
                "model":"DDR2-800",
                "speed_in_MHz":800,
                "capacity":4,
                "configuration_id": configIds.get("2x2"),
                "CAS_latency":6,
                "ECC":false,
                "price":29.99,
                "type_id": typeIds.get("DDR2")
            },
            {
                "brand_id": brandIds.get("Patriot"),
                "model":"Signature Line DDR2",
                "speed_in_MHz":667,
                "capacity":2,
                "configuration_id": configIds.get("1x2"),
                "CAS_latency":5,
                "ECC":false,
                "price":12.99,
                "type_id": typeIds.get("DDR2")
            },
            {
                "brand_id": brandIds.get("Kingston"),
                "model":"ValueRAM DDR",
                "speed_in_MHz":400,
                "capacity":1,
                "configuration_id": configIds.get("1x1"),
                "CAS_latency":3,
                "ECC":false,
                "price":9.99,
                "type_id": typeIds.get("DDR2")
            },
            {
                "brand_id": brandIds.get("Corsair"),
                "model":"CMX512",
                "speed_in_MHz":333,
                "capacity":1,
                "configuration_id": configIds.get("1x1"),
                "CAS_latency":3,
                "ECC":false,
                "price":14.99,
                "type_id": typeIds.get("DDR")
            },
            {
                "brand_id": brandIds.get("Crucial"),
                "model":"DDR PC3200",
                "speed_in_MHz":400,
                "capacity":2,
                "configuration_id": configIds.get("2x1"),
                "CAS_latency":3,
                "ECC":false,
                "price":19.99,
                "type_id": typeIds.get("DDR")
            },
            {
                "brand_id": brandIds.get("G.Skill"),
                "model":"DDR-400",
                "speed_in_MHz":400,
                "capacity":1,
                "configuration_id": configIds.get("1x1"),
                "CAS_latency":3,
                "ECC":false,
                "price":12.99,
                "type_id": typeIds.get("DDR")
            },
            {
                "brand_id": brandIds.get("Patriot"),
                "model":"Signature DDR",
                "speed_in_MHz":333,
                "capacity":1,
                "configuration_id": configIds.get("1x1"),
                "CAS_latency":2,
                "ECC":false,
                "price":11.99,
                "type_id": typeIds.get("DDR")
            }
        ]
        const ramModulePromises = ramModules.map(async (module) => {
            await db.query(
                `INSERT INTO ram_modules (price, ecc, cas_latency, capacity, model, speed, type_id, brand_id, configuration_id)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
                [
                    module.price,
                    module.ECC,
                    module.CAS_latency,
                    module.capacity,
                    module.model,
                    module.speed_in_MHz,
                    module.type_id,
                    module.brand_id,
                    module.configuration_id
                ]
            );
        });

        // Wait for all ram modules to be inserted
        await Promise.all([...ramModulePromises]);
    }
    catch (err) {
        console.error('Error initializing database', err);
    }
}

module.exports = initDatabase;
