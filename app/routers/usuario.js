let express = require('express');
let router = express.Router(); 
 
const usuario = require('../controllers/usuarios.js');

router.post('/api/usuario/create', usuario.create);
router.get('/api/usuario/all', usuario.GETALL);
router.get('/api/usuario/GETBYID/:id', usuario.GETBYID);
router.put('/api/usuario/updatePut/:id', usuario.updatePut); 
router.delete('/api/usuario/delete/:id', usuario.delete);


module.exports = router;
