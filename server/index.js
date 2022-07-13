const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const FoodeModel = require("./models/Food");

app.use(express.json());
app.use(cors());

mongoose.connect(
    "mongodb+srv://new-user:1234@cluster0.gubgj7l.mongodb.net/?retryWrites=true&w=majority",
    {
    useNewUrlParser: true,
});

app.post("/insert", async (req,res) => {
    const foodName = req.body.foodName;
    const days = req.body.days;

    const food = new FoodeModel({foodName: foodName, daysSinceIAte: days});

    try {
        await food.save();
        res.send("inserted data");
    } catch(err){
        console.log(err);
    }
});

app.get("/read", async (req,res) => {
    FoodeModel.find({}, (err, result) => {
        if (err) {
            res.send(err);
        }

        res.send(result);
    });
}); 
app.put("/update", async (req,res) => {
    const newFoodName = req.body.newFoodName;
    const id = req.body.id;

    try {
        await FoodeModel.findById(id, (err, updateFood) => {
            updateFood.foodName = newFoodName;
            updateFood.save();
            res.send("update");
        });
    } catch(err){
        console.log(err);
    }
});
app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;

    await FoodeModel.findByIdAndRemove(id).exec();
    res.send("deleted");

});
app.listen(3001, () => {
    console.log("Server running on port 3001");
});