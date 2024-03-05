const { MongoClient } = require(`mongodb`);
require("dotenv").config();

const connection = async () => {
  const client = new MongoClient(
    "mongodb+srv://" +
      process.env.USER +
      process.env.PASSWORD +
      "@cluster0.puoyvh5.mongodb.net/"
  );
  try {
    await client.connect();
    console.log("Connected to database");
    return client;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const create = async (users) => {
  const client = await connection();
  try {
    const db = client.db(`TestDB`);
    const col = db.collection(`Users`);

    const u = await col.insertMany(users);
    u
      ? console.log("Users created successfully.")
      : console.log("Failed to create users.");
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
};

const read = async (filters) => {
  const client = await connection();
  try {
    const db = client.db(`TestDB`);
    const col = db.collection(`Users`);

    const filter = { "name.last": `${filters}` };
    const document = await col.findOne(filter);
    console.log("Document found:\n" + JSON.stringify(document));
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
};

const update = async (filters, doc) => {
  const client = await connection();
  try {
    const db = client.db(`TestDB`);
    const col = db.collection(`Users`);

    const filter = { "name.last": `${filters}` };
    const document = await col.updateOne(filter, {
      $set: { "name.first": doc },
    });
    document
      ? console.log("Updated to user")
      : console.log("Failed to update users.");
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
};

const deleteUser = async (filters) => {
  const client = await connection();

  try {
    const db = client.db(`TestDB`);
    const col = db.collection(`Users`);

    const filter = { "name.last": `${filters}` };
    const document = await col.deleteOne(filter);
    document
      ? console.log("Delete to user")
      : console.log("Failed to delete user.");
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
};

const userDocuments = [
  {
    name: { first: "Alan", last: "Turing" },
    birth: new Date(1912, 5, 23),
    death: new Date(1954, 5, 7),
    contribs: ["Turing machine", "Turing test", "Turingery"],
    views: 1250000,
  },
  {
    name: { first: "Grace", last: "Hopper" },
    birth: new Date(1906, 12, 9),
    death: new Date(1992, 1, 1),
    contribs: ["Mark I", "UNIVAC", "COBOL"],
    views: 3860000,
  },
];
create(userDocuments);
read("Turing");
update("Turing", "Atahan");
deleteUser("Turing");
