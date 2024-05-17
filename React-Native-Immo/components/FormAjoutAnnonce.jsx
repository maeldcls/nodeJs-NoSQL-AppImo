import React, { useState } from "react";
import { Alert, Button, TextInput, View } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

// Importe les fonctions choisirPhoto et obtenirPosition créées précédemment

const FormAjoutAnnonce = () => {
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null);
  const [position, setPosition] = useState(null);

  // Fonctions pour gérer les évènements du formulaire ici
  const choisirPhoto = async () => {
    let resultat = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    setPhoto(resultat.assets[0].uri)
 
  };

  const obtenirVille = async (latitude, longitude) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`);
      const data = await response.json();
      const ville = data.address.city || data.address.town || data.address.village;
      console.log("Ville la plus proche:", ville);
      console.log(latitude, longitude);
      // Ici, vous pouvez mettre à jour l'état avec le nom de la ville ou effectuer d'autres actions nécessaires avec cette information
    } catch (error) {
      console.error("Erreur lors de la récupération de la ville:", error);
    }
  };
  
  // Exemple de fonction pour obtenir la géolocalisation
  const obtenirPosition = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.error("Permission de localisation refusée");
      return;
    }
    
    let location = await Location.getCurrentPositionAsync({});
    obtenirVille(location.coords.latitude, location.coords.longitude);
    
    setPosition(location);
  };

  const soumettreAnnonce = async () => {
    // Assure-toi que les données nécessaires sont disponibles
    if (!titre || !description || !photo || !position) {
      Alert.alert("Erreur", "Tous les champs sont requis");
      return;
    }
  
    // Prépare les données pour l'envoi
    const formData = new FormData();
    formData.append("titre", titre);
    formData.append("description", description);
    if (photo) {
      formData.append("photo", photo);
    } else {
      formData.append("photo", "https://vincent-portfolio.projets.garage404.com/assets/img/Vince.JPG");
    }
    const latitude = position.coords.latitude.toString();
    const longitude = position.coords.longitude.toString();

    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
  
    try {
      console.log(formData);
      // Remplace 'http://exemple.com/annonces' par l'URL de ton API
      const response = await fetch("http://10.0.2.2:3000/annonces", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      const json = await response.json();
  
      if (response.ok) {
        Alert.alert("Succès", "Annonce ajoutée avec succès");
        // Réinitialisation des états ou navigation vers un autre écran ici
      } else {
        Alert.alert("Erreur", json.message || "Quelque chose s'est mal passé");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erreur", "Impossible de soumettre l'annonce");
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Titre de l'annonce"
        value={titre}
        onChangeText={setTitre}
      />
      <TextInput
        placeholder='Description'
        value={description}
        onChangeText={setDescription}
      />
      <Button
        title='Choisir une photo'
        onPress={() => {
          /* Appelle choisirPhoto ici */
          choisirPhoto()
        }}
      />
      <Button
        title='Utiliser ma position'
        onPress={() => {
          /* Appelle obtenirPosition ici */
          obtenirPosition()
        }}
      />
      <Button
        title='submit'
        onPress={() => {
            // Ici, vous pouvez ajouter la logique pour soumettre le formulaire
            // Par exemple, envoi des données à une API ou à une base de données
            console.log('Titre:', titre);
            console.log('Description:', description);
            console.log('Photo:', photo);
            console.log('Position:', position);
            // Assurez-vous d'implémenter la logique d'envoi réelle ici
            soumettreAnnonce();
        }}
        />
    </View>
    
  );
};

export default FormAjoutAnnonce;