const mongoose = require("mongoose")
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        pokemons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pokemon' }]
    },
)

module.exports = mongoose.model("User", userSchema);
