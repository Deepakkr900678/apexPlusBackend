const UserModel = require("../models/User");
const PokemonModel = require("../models/Pokemon");
require("dotenv").config();

exports.createUser = async (req, res) => {
  try {
    const { name, pokemons } = req.body;

    if (!name || !pokemons) {
      return res.status(400).json({
        success: false,
        message: "Name and pokemons are required",
      });
    }

    // Ensure all provided Pokemon IDs are valid
    const validPokemons = await PokemonModel.find({ _id: { $in: pokemons } });
    if (validPokemons.length !== pokemons.length) {
      return res.status(400).json({
        success: false,
        message: "One or more Pokemon IDs are invalid",
      });
    }

    const user = new UserModel({ name, pokemons });
    await user.save();

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to create user. Please try again.",
    });
  }
};

exports.getAllUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const totalUsers = await UserModel.countDocuments();
    const totalPages = Math.ceil(totalUsers / limit);
    const offset = (page - 1) * limit;

    const users = await UserModel.find().skip(offset).limit(limit).populate('pokemons');

    return res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      users,
      currentPage: page,
      totalPages,
      totalUsers
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve users. Please try again.",
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id).populate('pokemons');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve user. Please try again.",
    });
  }
};

exports.updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, pokemons } = req.body;

    const validPokemons = await PokemonModel.find({ _id: { $in: pokemons } });
    if (validPokemons.length !== pokemons.length) {
      return res.status(400).json({
        success: false,
        message: "One or more Pokemon IDs are invalid",
      });
    }

    const updates = { name, pokemons };
    const user = await UserModel.findByIdAndUpdate(id, updates, { new: true }).populate('pokemons');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update user. Please try again.",
    });
  }
};

exports.deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete user. Please try again.",
    });
  }
};
