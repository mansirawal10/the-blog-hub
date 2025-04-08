const mongoose = require("mongoose"); // ✅ Use quotes around "mongoose"

const CategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            default:[]
        },
    },
    { timestamps: true } // 
);


module.exports = mongoose.model("Category", CategorySchema);
