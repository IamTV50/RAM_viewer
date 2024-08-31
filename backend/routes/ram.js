const express = require('express');
const router = express.Router();

router.get('/', function (req, res){
   res.status(200).json({'ram': 'data'});
});

router.post('/', function (req, res){
   res.status(200).json({'ram': 'bland post request'});
});

router.patch('/:id', function (req, res){
   let id = req.params.id;
   res.status(200).json({'ram id': id});
});

//test
router.patch('/abc', function (req, res){
   res.status(200).json({'ram': req.body.aaa});
});

module.exports = router;