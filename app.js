
const {con_string} =require('./conexion.js');

const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

var response = ""

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(`$El servidor se está ejecutando en la dirección http://${hostname}:${port}/ \n ${response}`);
  
});

server.listen(port, hostname, () => {
  console.log(`El servidor se está ejecutando en http://${hostname}:${port}/`);
  
});

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = con_string;
const client = new MongoClient(uri);

client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

async function main() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
  //const client = new MongoClient(uri);
  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Make the appropriate DB calls
    //await  listDatabases(client);
    //await FindOne(client);
    //await FindMultiple(client);
    //await InsertMovie(client);
    //await UpdateMovie(client);
    await DeleteMovie(client);

  } catch (e) {
      console.error(e);
  } finally {
      await client.close();
  }
}

main().catch(console.error);

function logArrayElements(element) {
  response = response + '\n' + element;
}

async function listDatabases(client){
  databasesList = await client.db().admin().listDatabases();

  //console.log("Databases:");
 databasesList.databases.forEach(db => console.log(` - ${db.name}`));
  response = "\nDatabase list (" + databasesList.databases.length + ")\n-------------"
  databasesList.databases.forEach(db => logArrayElements(db.name));
  
};

async function FindOne(client) {

  const database = client.db("sample_mflix");
  const movies = database.collection("movies");
  // Query for a movie that has the title 'The Room'
  const query = { title: "Blacksmith Scene" };
  const options = {
    // sort matched documents in descending order by rating
    sort: { "imdb.rating": -1 },
    // Include only the `title` and `imdb` fields in the returned document
    projection: { _id: 0, title: 1, imdb: 1, year:1 },
  };
  const movie = await movies.findOne(query, options);
  // since this method returns the matched document, not a cursor, print it directly
  console.log(movie);
  response = JSON.stringify(movie);
}

async function FindMultiple(client) {
  try {
    const database = client.db("sample_mflix");
    const movies = database.collection("movies");
    // query for movies that have a runtime less than 15 minutes
    const query = { runtime: { $lte: 5 } };
    const options = {
      // sort returned documents in ascending order by title (A->Z)
      sort: { title: -1 },
      // Include only the `title`, year and `imdb` fields in each returned document
      projection: { _id: 0, title: 1, year: 1, imdb: 1, runtime: 1 },
    };
    const cursor = movies.find(query, options);
    // print a message if no documents were found
    if ((await cursor.count()) === 0) {
      console.log("No movies found!");
      response = "No movies found!";
    }
    // replace console.dir with your callback to access individual elements

    //await cursor.forEach(console.dir);
    
    while ( await cursor.hasNext() ) {  // will return false when there are no more results
      let doc = await cursor.next();    // actually gets the document
      logArrayElements(JSON.stringify(doc)); //convert to JSON
      
    }
    
  
  } finally {
    await client.close();
    
  }
}


async function InsertMovie(client){
  const database = client.db("sample_mflix");
    const haiku = database.collection("movies");
    // create a document to insert
    const doc = {
      
      title: "Curso de Desarrollo de Software",
      year: 2023,
      imdb: { rating: 10, votes: 20000000, id: 216434 },
      actores: ["Miguel Jimenez", "Eduardo David", "Andrés Mauricio"]
    }
    const result = await haiku.insertOne(doc);
    response = `A document was inserted with the _id: ${result.insertedId}`;
}

async function UpdateMovie(client){
  const database = client.db("sample_mflix");
    const movies = database.collection("movies");
    // create a filter for a movie to update
    const filter = { title: "Curso de Desarrollo de Software" };
    // this option instructs the method to create a document if no documents match the filter
    const options = { upsert: true };
    // create a document that sets the plot of the movie
    const updateDoc = {
      $set: {
        plot: `A harvest of random numbers, such as: ${Math.random()}`
      },
    };
    const result = await movies.updateMany(filter, updateDoc, options);
    response = `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`;

}

async function DeleteMovie(client){
  const database = client.db("sample_mflix");
  const movies = database.collection("movies");
  // Query for a movie that has title "Annie Hall"
  const query = { title: "Curso de Desarrollo de Software" };
  //const result = await movies.deleteOne(query);
  const result = await movies.deleteMany(query);
  //if (result.deletedCount === 1) {
  if (result.deletedCount >= 1) {
    response = "Successfully deleted one or more documents.";
  } else {
    response = "No documents matched the query. Deleted 0 documents.";
  }
}
