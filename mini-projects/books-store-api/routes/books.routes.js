const express = require('express');
const controller = require('../controllers/book.controller');

const router = express.Router();


// Root route
router.get("/", controller.rootRoutes);


// CREATE - Add a new book 
router.post("/", controller.createController);


// READ 
router.get("/", controller.readController);


// READ - Get single book by ID (GET)
router.get("/:id", controller.readByIDController);


// UPDATE 
router.put("/:id", controller.updateController);



// DELETE 
router.delete("/:id", controller.deleteController);



// Routes export
module.exports = router;