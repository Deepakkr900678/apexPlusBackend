const express = require("express")
const router = express.Router()

const {
  createPokemon,
  getAllPokemons,
  getPokemonById,
  updatePokemonById,
  deletePokemonById,
} = require("../controllers/Pokemon")

router.post("/createPokemon", createPokemon)
router.get("/getAllPokemons", getAllPokemons)
router.get("/getPokemonById/:id", getPokemonById)
router.patch("/updatePokemonById/:id", updatePokemonById)
router.delete("/deletePokemonById/:id", deletePokemonById)

module.exports = router
