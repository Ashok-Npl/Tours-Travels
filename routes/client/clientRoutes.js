const express = require('express');
const controller = require('../../controllers/client/clientController');

const router = express.Router();
router.get('/', controller.home);
router.get('/about', controller.about);
router.get('/destinations', controller.destinations);
router.get('/destination-details', controller.destinationDetails);
router.get('/packages', controller.packages);
router.get('/package-details', controller.packageDetails);
router.get('/book', controller.book);
router.get('/contact', controller.contact);

module.exports = router;
