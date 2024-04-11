const mongoose = require("mongoose");

const connectDatabase = async () => {
  // TODO: Connexion à la base de données MongoDB
  // Utilisez les variables d'environnement pour la configuration
  // et referez-vous à la documentation de Mongoose
  // Utilisez un try/catch pour gérer les erreurs et n'oublier pas d'ajouter un log pour le serveur
    
    try{
        await mongoose.connect(`mongodb+srv://${process.env.USER_ID}:${process.env.USER_PASSWORD}@cluster0.qdtin5w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
    }catch(error){
        console.log(error)
    }
 
};

module.exports = connectDatabase;