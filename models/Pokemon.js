const mongoose = require("mongoose")
const pokemonSchema = new mongoose.Schema(
  {
    pokemonOwnerName: {
      type: String,
      required: true,
      trim: true,
    },
    direction: {
      type: String,
      required: true,
      trim: true,
    },
    initialpositionx: {
      type: String,
      required: true,
    },
    pokemonName: {
      type: String,
      required: true,
    },
    pokemonAbility: {
      type: String,
      required: true,
    },
    initialPositiony: {
      type: String,
      required: true,
    },
    speed: {
      type: String,
      required: true,
    },
    lastlyDirection: {
      type: String,
      required: true,
    },
  },
)

module.exports = mongoose.model("Pokemon", pokemonSchema);
