import {
  createTransferRequest,
  findTransferRequestsByUserId,
  updateTransferRequestStatus,
  findTransferRequestById,
} from "../models/transferRequestModel.js";
import { findItemById, updateItemOwner } from "../models/itemModel.js";

export const createRequest = async (req, res) => {
  const { itemId, toUserId } = req.body;
  const fromUserId = req.session.userId;

  // Check if the item belongs to the fromUserId
  const item = await findItemById(itemId);
  if (item.owner_id !== fromUserId) {
    return res.status(403).send("You do not own this item.");
  }

  await createTransferRequest(itemId, fromUserId, toUserId);
  res.redirect("/items");
};

export const showRequests = async (req, res) => {
  const userId = req.session.userId;
  const requests = await findTransferRequestsByUserId(userId);
  res.render("transfer_requests", { requests });
};

export const respondRequest = async (req, res) => {
  const { requestId, accepted } = req.body;
  const request = await findTransferRequestById(requestId);

  if (!request || request.to_user_id !== req.session.userId) {
    return res.status(403).send("Invalid request.");
  }

  await updateTransferRequestStatus(requestId, accepted);

  if (accepted) {
    // Update the item owner
    await updateItemOwner(request.item_id, req.session.userId);
  }

  res.redirect("/transfer-requests");
};
