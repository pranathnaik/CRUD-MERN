const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const port = 5000;
const cors = require("cors");
app.use(cors());

const FoodModel = require("./models/Food");

mongoose
  .connect(
    "mongodb+srv://admin:crudmern@cluster0.w8m8y.mongodb.net/food?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.post("/insert", async (req, res) => {
  const foodname = req.body.foodName;
  const days = req.body.days;
  const food = new FoodModel({
    foodname: foodname,
    daysSinceate: days,
  });
  

  await food
    .save()
    .then(() => {
      res.status(200).send("inserted data");
    })
    .catch(() => {
      res.status(400).send("it was not inserted");
    });
});

app.get("/read", async (req, res) => {
  FoodModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

app.put("/update", async (req, res) => {
  const newfoodname = req.body.foodUpdate;
  const id = req.body.id;
  await FoodModel.findById(id, (err, updatedfood) => {
    updatedfood.foodname = newfoodname;
    updatedfood
      .save()
      .then(() => {
        res.send("updated");
      })
      .catch((err) => console.log(err));
  });
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await FoodModel.findByIdAndRemove(id);
  res.send("deleted" + id);
});

app.listen(port, () => {
  console.log("server running on port " + port);
});
