module.exports = mongoose => {

  var schema = mongoose.Schema(

 

    {

      name: String,
      category: String,

      description: String,

      published:Boolean,

      
      
      author: String


    },

     

  );

 

 

  schema.method("toJSON", function() {

    const { __v, _id, ...object } = this.toObject();

    object.id = _id;

    return object;

  });

 

  const  Products = mongoose.model("libraries", schema);

  return Products;

};