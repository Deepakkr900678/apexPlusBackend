const PokemonModel = require("../models/Pokemon")
require("dotenv").config()

exports.createPokemon = async (req, res) => {
  try {
    const { pokemonOwnerName,
      direction,
      initialpositionx,
      pokemonName,
      pokemonAbility,
      initialPositiony,
      speed,
      lastlyDirection } = req.body;

    if (!pokemonOwnerName ||
      !direction ||
      !initialpositionx ||
      !pokemonName ||
      !pokemonAbility ||
      !initialPositiony ||
      !speed ||
      !lastlyDirection) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const pokemon = new PokemonModel({
      pokemonOwnerName,
      direction,
      initialpositionx,
      pokemonName,
      pokemonAbility,
      initialPositiony,
      speed,
      lastlyDirection
    });

    await pokemon.save();

    return res.status(201).json({
      success: true,
      message: "Pokemon created successfully",
      pokemon,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to create Pokemon. Please try again.",
    });
  }
}

exports.getAllPokemons = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const totalPokemons = await PokemonModel.countDocuments();
    const totalPages = Math.ceil(totalPokemons / limit);
    const offset = (page - 1) * limit;

    const pokemons = await PokemonModel.find().skip(offset).limit(limit);

    return res.status(200).json({
      success: true,
      message: "Pokemons retrieved successfully",
      pokemons,
      currentPage: page,
      totalPages,
      totalPokemons
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve Pokemons. Please try again.",
    });
  }
};

exports.getPokemonById = async (req, res) => {
  try {
    const { id } = req.params;
    const pokemon = await PokemonModel.findById(id);
    if (!pokemon) {
      return res.status(404).json({
        success: false,
        message: "Pokemon not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Pokemon retrieved successfully",
      pokemon,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve Pokemon. Please try again.",
    });
  }
};

exports.updatePokemonById = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const pokemon = await PokemonModel.findByIdAndUpdate(id, updates, { new: true });
    if (!pokemon) {
      return res.status(404).json({
        success: false,
        message: "Pokemon not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Pokemon updated successfully",
      pokemon,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update Pokemon. Please try again.",
    });
  }
};

exports.deletePokemonById = async (req, res) => {
  try {
    const { id } = req.params;
    const pokemon = await PokemonModel.findByIdAndDelete(id);
    if (!pokemon) {
      return res.status(404).json({
        success: false,
        message: "Pokemon not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Pokemon deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete Pokemon. Please try again.",
    });
  }
};





