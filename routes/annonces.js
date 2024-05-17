 const express = require("express");
 const multer = require('multer');
const Annonce = require('../models/Annonce.js')
const router = express.Router();
const Mongoose = require('mongoose');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const upload = multer();

router.get('/', async(req,res)=>{
    try{
        const annonce = await Annonce.find({});
        res.status(200).json(annonce);
    }catch(error){
        res.status(500).json({message: error.message});
    }
})


//add annonce
router.post('/',upload.none(), async(req,res)=>{
    try {
        const { titre, description, photo, latitude , longitude } = req.body;
        const annonce = new Annonce({
          titre,
          description,
          photo,
           latitude, 
            longitude 
        });
        await annonce.save();
        res.status(201).send({ message: 'Annonce ajoutée avec succès', annonce });
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Erreur lors de l\'ajout de l\'annonce' });
      }
})


router.get('/:id', async(req,res)=>{

    try{
        const { id } = req.params;
        
        if(!Mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(400).json({message:"Invalid Id"});
        } 

        const annonce = await Annonce.findById(id);

        if(!annonce){
            return res.status(404).json({message:"Annonce not found"});
        }else{
            return res.status(200).json(annonce);
        }

    }catch(error){
        res.status(500).json({message: error.message});
    }
})

router.put('/edit/:id', async(req,res)=>{
    try{
        const { id } = req.params;

        if(!Mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(400).json({message:"Invalid Id"});
        }

        
        const annonce = await Annonce.findOneAndUpdate({_id: id},req.body,{
            new: true,
            runValidators: true,
          }).then((annonce) => {

            if(!annonce){
                return res.status(404).json({message:"Annonce not found"});
            }else{
                return res.status(200).json({message:"Annonce edited successfully",annonce:annonce});
            }
        }).catch((error) => {
            return res
              .status(500)
              .json({
                message: "Failed to update annonce",
                error: error.toString(),
              }); // 500
          });


    }catch(error){
        res.status(500).json({message: error.message});
    }
})



router.delete('/delete/:id', async(req,res)=>{
    try{
        const { id } = req.params;
       

        if(!Mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(400).json({message:"Invalid Id"});
        } 
        const annonce = await Annonce.findByIdAndDelete(id);
        
        if(!annonce){
            return res.status(404).json({message:"Annonce not found"});
        }else{
            res.status(204).json();
        }
  
    }catch(error){
        res.status(500).json({message: "Failed to delete annonce", error: error.toString()});
    }
})

module.exports = router;