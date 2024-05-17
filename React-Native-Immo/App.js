import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Annonces from './components/Annonces';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { GluestackUIProvider, Text, Box } from "@gluestack-ui/themed"
import { config } from "@gluestack-ui/config"
import DetailAnnonceScreen from './components/DetailAnnonceScreen';
import FormAjoutAnnonce from './components/FormAjoutAnnonce';

const Stack = createStackNavigator();

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Annonces' component={Annonces} /> 
          <Stack.Screen name='DetailAnnonceScreen' component={DetailAnnonceScreen} />
          <Stack.Screen name='FormAjoutAnnonce' component={FormAjoutAnnonce} />
        </Stack.Navigator>
      </NavigationContainer>
    </GluestackUIProvider>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
