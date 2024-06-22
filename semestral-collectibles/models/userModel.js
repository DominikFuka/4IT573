import knex from "knex";
import knexConfig from "../knexfile.js";

const db = knex(knexConfig.development);

// Create a new user
export const createUser = async (username, password, isAdmin = false) => {
  return await db("users").insert({ username, password, admin: isAdmin });
};

// Find a user by username
export const findUserByUsername = async (username) => {
  return await db("users").where({ username }).first();
};

// Find a user by id
export const findUserById = async (id) => {
  return await db("users").where({ id }).first();
};
