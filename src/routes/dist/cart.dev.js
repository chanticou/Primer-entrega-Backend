"use strict";

var express = require('express');

var router = express.Router();

var cartManager = require('../Manager/cart');

var uploader = require('../services/upload');

var momentjs = require('moment');

var moment = momentjs();
var cartPorduct = new cartManager(); //Created product

router.post('/:id', function (req, res) {
  var body = {
    products: [],
    timestamp: moment.format('DD/MM/YYYY hh:mm:ss a')
  };
  var id = req.params.id;
  cartPorduct.createCart(body, id).then(function (result) {
    return res.send(result);
  });
});
router.post('/:idCart/productos/:idProduct', function (req, res) {
  var idCart = req.params['idCart'];
  var idProduct = req.params['idProduct'];
  cartPorduct.pushProduct(idCart, idProduct).then(function (result) {
    return res.send(result);
  });
});
router["delete"]('/:idCart/productos/:idProduct', function (req, res) {
  var idCart = req.params['idCart'];
  var idProduct = req.params['idProduct'];
  cartPorduct.deleteProduct(idCart, idProduct).then(function (result) {
    return res.send(result);
  });
});
router.get('/', function (req, res) {
  cartPorduct.deleteCart().then(function (result) {
    return console.log;
  });
});
module.exports = router;