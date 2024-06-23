import {
  createTransferRequest,
  findTransferRequestsByUserId,
  updateTransferRequestStatus,
  findTransferRequestById,
} from "../models/transferRequestModel.js";
import { findItemById, updateItemOwner } from "../models/itemModel.js";

/**
 * Create a request to transfer an item to another user.
 * @returns error 403 if user doesn't own item ELSE no return value
 */
export const createRequest = async (req, res) => {
  const { itemId, toUserId } = req.body;
  const fromUserId = req.session.userId;

  // check if the item belongs to the fromUserId
  const item = await findItemById(itemId);
  if (item.owner_id !== fromUserId) {
    return res
      .status(403)
      .send("Error: You can't transfer item you don't own!");
  }

  // if the item is owned by correct user, create the request
  await createTransferRequest(itemId, fromUserId, toUserId);
  res.redirect("/items");
};

/**
 * Render user's transfer requests.
 */
export const showRequests = async (req, res) => {
  const userId = req.session.userId;
  const requests = await findTransferRequestsByUserId(userId);
  res.render("transfer_requests", { requests });
};

/**
 * Users can respond to transfer requests (accept or reject).
 * @returns error 403 if user doesn't own item ELSE no return value
 */
export const respondRequest = async (req, res) => {
  const { requestId, accepted } = req.body;
  const request = await findTransferRequestById(requestId);

  // check if user owns the transfer req
  if (!request || request.to_user_id !== req.session.userId) {
    return res.status(403).send("Invalid request.");
  }

  // update transfer req
  await updateTransferRequestStatus(requestId, accepted);

  // transfer req accepted, update item's owner
  if (accepted) {
    await updateItemOwner(request.item_id, req.session.userId);
  }

  res.redirect("/transfer-requests");
};
