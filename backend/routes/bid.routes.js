import { submitBid, getBidsForGig, hireBid, getUserBids } from "../controllers/bid.controller.js";
import express from "express";
import protect from "../middleware/auth.middleware.js";
export const router = express.Router();

router.get("/user", protect, getUserBids);
router.patch("/:bidId/hire", protect, hireBid);

// Get bids for a gig (owner only)
router.get("/:gigId", protect, getBidsForGig);

// Submit bid
router.post("/", protect, submitBid);



export default router;