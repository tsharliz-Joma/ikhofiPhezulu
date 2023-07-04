require("dotenv").config({ path: "./config.env" });
const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const PORT = process.env.PORT || 1969;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Server } = require("socket.io");
const { MongoClient, ServerApiVersion } = require("mongodb");
const mongoose = require("mongoose");
const CoffeeModel = require("./models/Coffee");
const User = require("./models/User");
const Admin = require("./models/Admin");
app.use(express.json());
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_ACC}:${process.env.MONGO_PW}@cluster0.nv1odnc.mongodb.net/coffee_orders?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
  },
);

const mongoUri = `mongodb+srv://${process.env.MONGO_ACC}:${process.env.MONGO_PW}@cluster0.nv1odnc.mongodb.net/coffee_orders?retryWrites=true&w=majority`;
const client = new MongoClient(mongoUri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const clientCollection = client.db("coffee_orders").collection("white_coffees");

// Socket io

io.on("connection", (socket) => {
  console.log(`Socket id: ${socket.id}`);
  console.log(`Socket handshake: ${socket.handshake.headers.origin}`);

  // changeStream.on("change", (next) => {
  //   switch (next.operationType) {
  //     case "insert":
  //       socket.emit("New Order", next.fullDocument);
  //       break;
  //     case "delete":
  //       socket.emit("delete_order", next.fullDocument);
  //     default:
  //       console.log(next.operationType);
  //   }
  // });

  socket.on("user_active", (data) => {
    socket.join(data);
    console.log(data);
  });

  socket.on("new_order", (data) => {
    // console.log(data);
    socket.broadcast.emit("New Order", data);
  });

  socket.on("disconnect", () => {});
});

var collection = client.db("coffee_orders").collection("white_coffees");
var changeStream = collection.watch([], { fullDocument: "updateLookup" });

async function run() {
  try {
    // connect client to the server
    await client.connect();
    // send a ping to confirm success
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You Connected successfully to MongoDb",
    );
  } finally {
    // Ensure the client will close when finished or an error occurs
    // I have to turn this off, it causes and error with the collection.watch
    // client.close();
  }
}
run().catch(console.dir);

// mongodb://<USERNAME>:<PASSWORD>@ap-southeast-2.aws.realm.mongodb.com:27020/?authMechanism=PLAIN&authSource=%24external&ssl=true&appName=application-0-mygbf:<SERVICE_NAME>:local-userpass

// VIEWS ORDERS ROUTE
app.get("/api/view-orders", async (req, res) => {
  const token = req.headers["x-access-token"];
  // Here i want it have a constant connection and to refresh every time a new order rocks up
  try {
    await CoffeeModel.find({}).then((res) => {
      orders = res;
    });
    return res.json({ status: "ok", orders: orders });
  } catch (error) {
    return res.json({ status: "error", error: "No Coffee Orders" });
  }
});

// CREATE COFFEE ORDER ROUTE
app.post("/api/coffee", async (req, res) => {
  const name = req.body.name;
  const coffeeName = req.body.coffeeName;
  const coffeeMilk = req.body.coffeeMilk;
  const coffeeSize = req.body.coffeeSize;
  const extras = req.body.extras;

  const coffee = new CoffeeModel({
    name: name,
    coffeeName: coffeeName,
    coffeeMilk: coffeeMilk,
    coffeeSize: coffeeSize,
    extras: extras,
  });

  try {
    await coffee.save();
    return res.json({ status: "ok" });
  } catch (error) {
    return error;
  }
});

// DELETE COFFEE FROM DATABASE ROUTE
app.post("/api/sendCoffee", async (req, res) => {
  // /* TEST */console.log(req.body);
  try {
    const coffee = {
      name: req.body.name,
      coffeeName: req.body.coffeeName,
      coffeeSize: req.body.coffeeSize,
      // coffeeMilk: req.body.coffeeMilk
    };
    console.log(`Deleting ${coffee.coffeeName}`);

    return await CoffeeModel.deleteOne({
      name: req.body.name,
      coffeeName: req.body.coffeeName,
      coffeeSize: req.body.coffeeSize,
      // coffeeMilk: req.body.coffeeMilk
    });

    // console.log(`DELETED`)
  } catch (error) {
    console.log(error);
  }
});

// REGISTER ROUTE
app.post("/api/register", async (req, res) => {
  // /* TEST */console.log(req.body)
  try {
    const bcryptPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      name: req.body.name,
      email: req.body.email,
      number: req.body.mobileNumber,
      password: bcryptPassword,
    });
    res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: "Duplicate email." });
  }
});

// LOGIN ROUTE
app.post("/api/login", async (req, res) => {
  const userFound = await User.findOne({
    email: req.body.email,
  });

  if (!userFound) {
    return {
      status: "error",
      error: "No Account Found under these credentials",
    };
  }

  const passwordValid = await bcrypt.compare(
    req.body.password,
    userFound.password,
  );

  if (passwordValid) {
    const token = jwt.sign(
      {
        name: userFound.name,
        email: userFound.email,
        number: userFound.number,
      },
      process.env.SUPASECRET,
    );
    return res.json({ status: "ok", user: token });
  } else {
    return res.json({ status: "error", user: false });
  }
});

//========== User phone Number

app.get("/api/user-data", async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const decoded = jwt.verify(token, process.env.SUPASECRET);
    const email = decoded.email;
    const user = await User.findOne({ email: email });

    return res.json({ status: "ok", name: user.name });
  } catch (error) {
    res.json({ status: "error", error: "invalid token'" });
    console.log(error);
  }
});

//===== Update phone number

app.post("/api/user-data", async (req, res) => {
  const token = req.headers["x-access-token"];

  try {
    const decoded = jwt.verify(token, process.env.SUPASECRET);
    const email = decoded.email;
    await User.updateOne({ email: email }, { $set: { name: req.body.name } });

    return res.json({ status: "ok " });
  } catch (error) {
    // console.log(error)
    return res.json({ status: "error", error: "invalid token" });
  }
});

// MONGO ACCOUNT REGISTRATION

app.post("/api/adminRegistration", async (req, res) => {
  console.log(req.body);
  // const newAdmin = new Admin({
  //     user: req.body.name ,
  //     pwd: req.body.password
  // });
  try {
    const bcryptPassword = await bcrypt.hash(req.body.pwd, 10);
    await Admin.create({
      user: req.body.name,
      admin: true,
      pwd: bcryptPassword,
    });
    res.json({ status: "ok " });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "Duplicate email." });
  }
});

app.post("/api/adminLogin", async (req, res) => {
  const adminFound = await Admin.findOne({
    user: req.body.user,
  });

  if (!adminFound) {
    return { status: "error", error: "Incorrect Admin Credentials" };
  }

  const passwordValid = await bcrypt.compare(req.body.pwd, adminFound.pwd);
  if (passwordValid) {
    const token = jwt.sign(
      {
        name: adminFound.user,
      },
      process.env.SUPASECRET,
    );
    return res.json({ status: "ok", user: token });
  } else {
    return res.json({ status: "error", user: false });
  }
});

app.get("/", async (req, res) => {
  //   const coffee = new CoffeeModel({
  //     coffeeName: req.body.coffeeName,
  //     coffeeMilk: "Oat",
  //     coffeeSize: "Large",
  //   });
  try {
    // await coffee.save();
    res.json({
      message: "Hello World",
    });
  } catch (error) {
    console.log(error);
  }
});

server.listen(PORT, () => {
  console.log(`Server Listening on port ${PORT}`);
});
