const db = require("../models");

const Libraries = db.library;

 

// Create and Save a new Product

exports.create = (req, res) => {

  // Validate request

  if (!req.body.name) {

    res.status(400).send({ message: "Content can not be empty!" });

    return;

  }

 

  // Create a Product

  const product = new Libraries({

    name: req.body.name,

    category: req.body.category,
    description: req.body.description,

    

    published: req.body.published ? req.body.published : false,

    author: req.body.author

  });

 

  // Save Product in the database

  Libraries

    .create(product)

    .then(data => {

      res.send(data);

    })

    .catch(err => {

      res.status(500).send({

        message:

          err.message || "Some error occurred while creating the product."

      });

    });

};

 

 

// Retrieve all Products from the database.

exports.findAll = (req, res) => {

   const name = req.query.name;

  var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

 

  Libraries.find(condition)

    .then(data => {

      res.send(data);

    })

    .catch(err => {

      res.status(500).send({

        message:

          err.message || "Some error occurred while retrieving products."

      });

    });

 

};

 

// Find a single Product with an id

exports.findOne = (req, res) => {

  const id = req.params.id;

 

  Libraries.findById(id)

    .then(data => {

      if (!data)

        res.status(404).send({ message: "Not found Product with id " + id });

      else res.send(data);

    })

    .catch(err => {

      res

        .status(500)

        .send({ message: "Error retrieving Product with id=" + id });

    });

 

};

 

// Update a Product by the id in the request

exports.update = (req, res) => {

  if (!req.body) {

    return res.status(400).send({

      message: "Data to update can not be empty!"

    });

  }

 

  const id = req.params.id;

 

  Libraries.findByIdAndUpdate(id, req.body, { useFindAndModify: false })

    .then(data => {

      if (!data) {

        res.status(404).send({

          message: `Cannot update Product with id=${id}. Maybe Product was not found!`

        });

      } else res.send({ message: "Product was updated successfully." });

    })

    .catch(err => {

      res.status(500).send({

        message: "Error updating Product with id=" + id

      });

    });

 

};

 

// Delete a Product with the specified id in the request

exports.delete = (req, res) => {

  const id = req.params.id;

 

  Libraries.findByIdAndRemove(id)

    .then(data => {

      if (!data) {

        res.status(404).send({

          message: `Cannot delete Product with id=${id}. Maybe Product was not found!`

        });

      } else {

        res.send({

          message: "Product was deleted successfully!"

        });

      }

    })

    .catch(err => {

      res.status(500).send({

        message: "Could not delete Product with id=" + id

      });

    });

};

 

// Delete all Products from the database.

exports.deleteAll = (req, res) => {

  Libraries.deleteMany({})

    .then(data => {

      res.send({

        message: `${data.deletedCount} Products were deleted successfully!`

      });

    })

    .catch(err => {

      res.status(500).send({

        message:

          err.message || "Some error occurred while removing all products."

      });

    });

 

};

 

// Find all published Products

exports.findAllPublished = (req, res) => {

  Libraries.find({ published: true })

    .then(data => {

      res.send(data);

    })

    .catch(err => {

      res.status(500).send({

        message:

          err.message || "Some error occurred while retrieving products."

      });

    });

 

};