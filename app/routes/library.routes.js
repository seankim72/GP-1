module.exports = app => {

  const libraries = require("../controllers/library.controller.js");

 

  var router = require("express").Router();

 

  // Create a new Product

  router.post("/", libraries.create);

 

  // Retrieve all Products

  router.get("/", libraries.findAll);

 

  // Retrieve all published Products

  router.get("/published", libraries.findAllPublished);

 

  // Retrieve a single Product with id

  router.get("/:id", libraries.findOne);

 

  // Update a Product with id

  router.put("/:id", libraries.update);

 

  // Delete a Product with id

  router.delete("/:id", libraries.delete);

 

  // Delete all Products

  router.delete("/", libraries.deleteAll);

 

  app.use('/api/library', router);

};