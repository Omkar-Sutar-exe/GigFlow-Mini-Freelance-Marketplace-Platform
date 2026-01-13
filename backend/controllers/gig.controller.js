import Gig from "../models/Gig.js";

export const createGig = async(req,res) =>{
    try{
        const { title, description, budget } = req.body

        if(!title || !description || !budget){
            return res.status(400).json({message:"All fields are required"});

        }

        const gig = await Gig.create({
            title,
            description,
            budget,
            ownerId: req.user._id
        });

        res.status(201).json({
            message:"Gig created successfully",
            gig
        })


    }catch(error){
        res.status(500).json({message:"Server error"});

    }
};

export const getGigs =async (req,res) =>{
    try{
        const { search } = req.query;

        let query = { status : "open"};

        if(search){
            query.title = { $regex:search, $options:"i"};
        }

        const gigs = await Gig.find(query).sort({ createdAt:-1}); // last jobs first

        res.json(gigs);

    }catch(error){
        res.status(500).json({message:"Server error",error});

    }
};

export const getGigById = async (req, res) => {
    try {
        const gig = await Gig.findById(req.params.id).populate("ownerId", "name email");
        if (!gig) {
            return res.status(404).json({ message: "Gig not found" });
        }
        res.json(gig);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

export const getUserGigs = async (req, res) => {
    try {
        const gigs = await Gig.find({ ownerId: req.user._id }).sort({ createdAt: -1 });
        res.json(gigs);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

