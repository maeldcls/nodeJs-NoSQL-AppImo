import { Pressable, Text } from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";


const Annonces = () => {
  const [annonces, setAnnonces] = useState([]);

  useEffect(() => {
    // Envoie une requête GET à l'API
    fetch("http://10.0.2.2:3000/annonces")
      .then((response) => response.json())
      .then((data) => setAnnonces(data));
  }, []);

  return (
    <View>
        {annonces.map((annonce) => (
          <Pressable onPress={() => console.log(annonce._id)}
          p="$5"
          borderColor="$fuchsia400"
          style={styles.pressable}>
          <Text key={annonce._id} style={styles.text}>{annonce.titre}</Text>
          </Pressable>
        ))}
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