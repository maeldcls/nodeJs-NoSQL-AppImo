const mongoose = require("mongoose");

const annonceSchema = new mongoose.Schema({
  // TODO: Définissez les champs du schéma ici, par exemple titre, prix, caractéristiques, etc.
  titre:{
    type:String,
    required:[true,"Le titre est obligatoire"]
  },
  prix:{
    type:Number,
    required:[true,"Le prix est obligatoire"],
    default:0
  },
  surface:{
    type:Number,
    required:[true,"La surface est obligatoire"],
  },
  localisation: {
    ville:{
      type:String,
      required:[true,"La ville est obligatoire"],
    },
    codePostal:{
      type:String,
      required:[true,"Le code postal est obligatoire"],
    }
  },
  caracteristiques:{
    chambre:{
      type:Number,
      required:[true,"Le nombre de chambre est obligatoire"],
    },
    salleDeBain:{
      type:Number,
      required:[true,"Le nombre de salle de bain est obligatoire"],
    },
    balcon:{
      type:Boolean,
      required:true
    },
    jardin:{
      type:Boolean,
      required:true
    },
    parking:{
      type:Boolean,
      required:true
    }
  }
});

const annonce = mongoose.model("Annonce",annonceSchema);

module.exports = annonce;