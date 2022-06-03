const express = require('express');
const app = express();
const userRoutes = require("./routes/user.routes");

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api", userRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.listen(PORT, () => console.log(`React-users app is running on ${PORT}`));
