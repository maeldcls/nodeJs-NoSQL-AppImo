import { Pressable, Text } from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, View , Image } from "react-native";
import { useNavigation } from "@react-navigation/native";


const Annonces = () => {
  const [annonces, setAnnonces] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    // Envoie une requête GET à l'API
    fetch("http://10.0.2.2:3000/annonces")
      .then((response) => response.json())
      .then((data) => setAnnonces(data));
  }, []);


  return (
    <View>
        {annonces.map((annonce) => (
          <Pressable key={annonce._id} onPress={() => {
            navigation.navigate("DetailAnnonceScreen", { annonceId: annonce._id });
          }}
          p="$5"
          borderColor="$fuchsia400"
          style={styles.pressable}>
          <Text key={annonce._id} style={styles.text}>{annonce.titre}</Text>
          </Pressable>
        ))}
        <Button
        title="Ajouter une annonce"
        onPress={() => navigation.navigate('FormAjoutAnnonce')}
      />
      
      </View>
  );
};

const styles = StyleSheet.create({
  pressable: {
    padding: 8,
    borderColor: "#F0F", 
    borderWidth: 1, 
    marginBottom: 5, 
  },
  text: {
    color: "#F0F", 
  },
});

export default Annonces;