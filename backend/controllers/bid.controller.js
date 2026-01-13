import Bid from "../models/Bid.js";
import Gig from "../models/Gig.js";
import mongoose from "mongoose";


export const submitBid = async (req,res) =>{
    try{
    const { gigId, message, price} = req.body;

    if(!gigId || !message || !price){
        res.status(400).json({message:"All fields Required"})
    }

    const gig = await Gig.findById(gigId);
    if(!gig || gig.status !== "open"){
        return res.status(400).json({message:"Gig not available"});
    }

    const alreadyBid = await Bid.findOne({
        gigId,
        freelancerId:req.user._id,
    });

    if(alreadyBid){
        return res.status(400).json({message:"You already bid on this gig"});
    }

    const bid = await Bid.create({
        gigId,
        freelancerId: req.user._id,
        message,
        price
    });

    res.status(201).json({
        message:"Bid submitted successfully",
        bid
    });


    }catch(error){
        res.status(500).json({message : "Server error",error});
    }
}





export const getBidsForGig = async (req,res) =>{
    try{
        const {gigId} = req.params;

        const gig = await Gig.findById(gigId);
        if(!gig){
            return res.status(404).json({message : "Gig not found"});
        }

        if(gig.ownerId.toString() != req.user._id.toString()){
            return res.status(403).json({message:"Access denied"});
        }

        const bids = await Bid.find({ gigId })
            .populate("freelancerId", "name email")
            .sort({createdAt : -1});
        
        res.json(bids);

    }catch(error){
        res.status(500).json({message:"Server error"});

    }
};

export const hireBid = async (req,res) =>{
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        const { bidId } = req.params;

        const bid = await Bid.findById(bidId).session(session);
        if(!bid){
            throw new Error("Bid not found");
        }

        const gig = await Gig.findById(bid.gigId).session(session);
        if(!gig){
            throw new Error("Gig not found");
        }

        if(gig.ownerId.toString() !== req.user._id.toString()){
            throw new Error("Not authorized");
        }

        if(gig.status === "assigned"){
            throw new Error("Gig already assigned");
        }

        gig.status = "assigned";
        await gig.save({session});

        bid.status = "hired";
        await bid.save({session});

        await Bid.updateMany(
            { gigId : gig._id,_id:{ $ne: bid._id} },
            { status: "rejected"},
            {session}
        );

        await session.commitTransaction();
        session.endSession();

        res.json({message : "Freelancer hired successfully"});
    }catch(error){
        await session.abortTransaction();
        session.endSession();

        res.status(400).json({message: error.message});
    }
};

export const getUserBids = async (req, res) => {
    try {
        const bids = await Bid.find({ freelancerId: req.user._id })
            .populate("gigId", "title status budget")
            .sort({ createdAt: -1 });
        res.json(bids);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
