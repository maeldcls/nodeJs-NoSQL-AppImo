import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Annonces from '../Annonces';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Annonces" component={Annonces} />
    </Tab.Navigator>
  );
}