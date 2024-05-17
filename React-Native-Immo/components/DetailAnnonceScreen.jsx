import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, StyleSheet, Alert, Button } from "react-native";

const DetailAnnonceScreen = ({ route }) => {
  const { annonceId } = route.params; // Récupère l'ID de l'annonce à partir des paramètres de navigation
  const [annonce, setAnnonce] = useState(null);

  const supprimerAnnonce = async () => {
    try {
      const response = await fetch(`http://10.0.2.2:3000/annonces/${annonceId}`, {
        method: 'DELETE',
      });

      const json = await response.json();

      if (response.ok) {
        Alert.alert("Succès", "Annonce supprimée avec succès");
        navigation.goBack(); // Retour à l'écran précédent ou actualiser la liste des annonces
      } else {
        Alert.alert("Erreur", json.message || "Quelque chose s'est mal passé lors de la suppression");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erreur", "Impossible de supprimer l'annonce");
    }
  };

  useEffect(() => {
    // Récupère les détails de l'annonce depuis l'API
    const fetchAnnonceDetails = async () => {
      try {
        // Remplace 'http://exemple.com/annonces' par l'URL de ton API
        const response = await fetch(
          `http://10.0.2.2:3000/annonces/${annonceId}`
        );
        const data = await response.json();
        if (response.ok) {
          setAnnonce(data);
        } else {
          // Gère le cas où la requête n'a pas réussi
          console.log(
            "Erreur lors de la récupération des détails de l'annonce"
          );
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchAnnonceDetails();
  }, [annonceId]);

  if (!annonce) {
    // Affiche un message de chargement tant que les données ne sont pas prêtes
    return <Text>Chargement...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      {/* {annonce.photo && (
        <Image source={{ uri: annonce.photo }} style={styles.image} />
      )} */}
      <Text style={styles.titre}>Titre : {annonce.titre}</Text>
      <Text style={styles.description}>Description : {annonce.description}</Text>
      <Text style={styles.description}>Latitude : {annonce.latitude}</Text>
      <Text style={styles.description}>Longitude : {annonce.longitude}</Text>
      {/* Tu peux ajouter d'autres détails ici, comme la localisation, en formatant les données comme souhaité */}
      <Image
        source={{ uri: annonce.photo }}
        style={{ width: 200, height: 200 }}
      />
      <Button
        title="Supprimer l'annonce"
        onPress={() => {
          Alert.alert(
            "Suppression",
            "Êtes-vous sûr de vouloir supprimer cette annonce ?",
            [
              {
                text: "Annuler",
                style: "cancel"
              },
              { text: "Oui", onPress: () => supprimerAnnonce() }
            ]
          );
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

export default DetailAnnonceScreen;