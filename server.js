require("dotenv").config();
const express = require("express");
const userController = require("./controller/user.controller.js");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const verifyToken = require("./middleware/auth.middleware");
const router = require("./routes/index.js");


const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = await userController.findUserByEmail({ email });

    if (!users || users.length === 0) {
      return res.status(404).send({ message: "User not found" });
    }

    const user = users[0];
    let validPassword;
    if (user.password.startsWith("$2b$") || user.password.startsWith("$2a$")) {
      validPassword = await bcrypt.compare(password, user.password);
    } else {
      validPassword = password === user.password;
      if (validPassword) {
        const hashedPassword = await bcrypt.hash(password, 10);
        await userController.updateUser({
          id: user.id,
          password: hashedPassword,
        });
      }
    }

    if (!validPassword) {
      return res.status(401).send({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: 30, // 24 hours
    });

    const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, {
      expiresIn: 604800, // 7 days
    });

    res.status(200).send({
      message: "Login successful",
      token,
      refreshToken,
      tokenType: "Bearer",
      expiresIn: 86400,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res
      .status(500)
      .send({ message: "Internal server error: " + error.message });
  }
});

app.post("/api/refresh-token", (req, res) => {
  // Extract the refresh token from the Authorization header
  const authHeader = req.headers["authorization"];
  const refreshToken = authHeader && authHeader.split(' ')[1]; // Split 'Bearer <token>' and get the token part

  if (!refreshToken) {
    return res.status(403).send({ message: "No refresh token provided" });
  }

  // Verify the refresh token
  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).send({ message: "Invalid refresh token" });
    }

    // Create a new access token
    const token = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, {
      expiresIn: 30, // Access token expires in 30 seconds for demonstration purposes
    });

    // Create a new refresh token
    const newRefreshToken = jwt.sign({ id: decoded.id }, process.env.JWT_REFRESH_SECRET, {
      expiresIn: 86400, // Refresh token expires in 24 hours
    });

    // Send the new tokens to the client
    res.status(200).send({
      token: token,
      refreshToken: newRefreshToken,
      tokenType: "Bearer",
      expiresIn: 86400,
    });
  });
});

app.post("/api/user/create", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await userController.findUserByEmail({ email });
    if (existingUser && existingUser.length > 0) {
      return res.status(400).send({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { name, email, password: hashedPassword };

    await userController.createUser(newUser);
    res.status(200).send({ message: "User created successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal server error: " + error });
  }
});

// Public route
app.get("/api/user", verifyToken, async (req, res) => {
  try {
    const resp = await userController.findAllUser();
    res.status(200).send(resp);
  } catch (error) {
    res.status(500).send({ message: "Internal server error: " + error });
  }
});

app.get("/api/user/find/all", verifyToken, async (req, res) => {
  try {
    const users = {
      email: req.query.email,
      name: req.query.name,
    };
    const user = await userController.findUserByEmail(users);
    if (!user || user.length === 0) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send({ message: "User found successfully", user });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

app.delete("/api/user/delete/:id", verifyToken, async (req, res) => {
  try {
    await userController.deleteUser(req.params.id);
    res.status(200).send({ message: "user deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "internal server error" + error });
  }
});

app.patch("/api/user/update", verifyToken, async (req, res) => {
  try {
    const users = {
      id: req.body.id,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };
    await userController.updateUser(users);
    res.status(200).send({ message: "user updated successfully" });
  } catch (error) {
    res.status(500).send({ message: "internal server error" + error });
  }
});

app.use(router);

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});
