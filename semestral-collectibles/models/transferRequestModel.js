import knex from "knex";
import knexConfig from "../knexfile.js";

const db = knex(knexConfig.development);

/**
 * Create a new transfer request.
 * @param {Number} itemId - transfered item
 * @param {Number} fromUserId - sending user
 * @param {Number} toUserId - receiving user
 */
export const createTransferRequest = async (itemId, fromUserId, toUserId) => {
  return await db("transfer_requests").insert({
    item_id: itemId,
    from_user_id: fromUserId,
    to_user_id: toUserId,
  });
};

/**
 * Find transfer requests for given user.
 * @param {Number} userId
 */
export const findTransferRequestsByUserId = async (userId) => {
  return await db("transfer_requests").where({
    to_user_id: userId,
    accepted: null,
  });
};

/**
 * Update transfer request status.
 * @param {Number} requestId
 * @param {Boolean} accepted - null = pending, true = accepted, false = rejected
 */
export const updateTransferRequestStatus = async (requestId, accepted) => {
  return await db("transfer_requests")
    .where({ id: requestId })
    .update({ accepted });
};

/**
 * Find transfer request by ID.
 * @param {Number} id
 */
export const findTransferRequestById = async (id) => {
  return await db("transfer_requests").where({ id }).first();
};
