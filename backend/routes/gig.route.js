import express from "express";
import { createGig, getGigs, getGigById, getUserGigs } from "../controllers/gig.controller.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/user", protect, getUserGigs);
router.post("/",protect, createGig);
router.get("/",getGigs);
router.get("/:id", getGigById);


export default router;
