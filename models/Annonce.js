const mongoose = require("mongoose");

const annonceSchema = new mongoose.Schema({
  // TODO: Définissez les champs du schéma ici, par exemple titre, prix, caractéristiques, etc.
  titre: { type: String, required: false },
  description: { type: String, required: false },
  photo: { type: String, required: false },
  latitude: { type: String, required: false },
  longitude: { type: String, required: false },
});

const annonce = mongoose.model("Annonce",annonceSchema);

module.exports = annonce;