const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: { type: String},
    subcategories: [
        {
            _id: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() }, 

            name: { type: String}
        }
    ]
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
