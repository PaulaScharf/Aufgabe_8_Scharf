

const mongodb = require('mongodb');


function connectMongoDb() {
  // finish this block before the server starts,
  // there are some async tasks inside we need to wait for => declare async so we can use await
  (async () => {

    try {
      // Use connect method to the mongo-client with the mongod-service
      //                      and attach connection and db reference to the app

      // using a local service on the same machine
      //app.locals.dbConnection = await mongodb.MongoClient.connect("mongodb://localhost:27017", {useNewUrlParser: true});

      // using a named service (e.g. a docker container "mongodbservice")
      app.locals.dbConnection = await mongodb.MongoClient.connect("mongodb://mongodbservice:27017", {useNewUrlParser: true});

      app.locals.db = await app.locals.dbConnection.db("itemdb");
      console.log("Using db: " + app.locals.db.databaseName);
    } catch (error) {
      console.dir(error);

      // retry until db-server is up
      setTimeout(connectMongoDb, 3000);
    }

    //mongo.close();

  })();
}

connectMongoDb();

// middleware for making the db connection available via the request object
app.use((req, res, next) => {
  req.db = app.locals.db;
  next();
});
