const mongoose = require("mongoose");

const annonceSchema = new mongoose.Schema({
  // TODO: Définissez les champs du schéma ici, par exemple titre, prix, caractéristiques, etc.
  titre:{
    type:String,
    required:[true,"Entername"]
  },
  prix:{
    type:Number,
    require:true,
    default:0
  },
  surface:{
    type:Number,
    require:true,
  },
  localisation: {
    ville:{
      type:String,
    },
    codePostal:{
      type:String
    }
  },
  caractéristiques:{
    chambre:{
      type:Number,
    },
    salleDeBain:{
      type:Number,
    },
    balcon:{
      type:Boolean
    },
    jardin:{
      type:Boolean
    },
    parking:{
      type:Boolean
    }
  }
});

const annonce = mongoose.model("Annonce",annonceSchema);

module.exports = annonce;