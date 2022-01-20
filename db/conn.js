const { MongoClient } = require("mongodb");
const db = process.env.ATLAS_URI;
const client = new MongoClient(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
 
var dbo;
 
module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      // Verify we got a good "db" object
      if (db)
      {
        dbo = db.db("woc");
        postsCollection=db.db('postsCollection')
        console.log("Successfully connected to MongoDB.");
      }
      return callback(err);
         });
  },
 
  getDb: function () {
    return dbo;
  },
};