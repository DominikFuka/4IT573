import knex from "knex";
import knexConfig from "../knexfile.js";

const db = knex(knexConfig.development);

/**
 * Create a new user.
 * @param {String} username
 * @param {*} password
 * @param {Boolean} isAdmin - default is FALSE
 */
export const createUser = async (username, password, isAdmin = false) => {
  return await db("users").insert({ username, password, admin: isAdmin });
};

/**
 * Find a user by username.
 * @param {String} username
 */
export const findUserByUsername = async (username) => {
  return await db("users").where({ username }).first();
};

/**
 * Find a user by ID.
 * @param {Number} id
 */
export const findUserById = async (id) => {
  return await db("users").where({ id }).first();
};
