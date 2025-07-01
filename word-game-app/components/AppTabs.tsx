import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NeverWordGame from '../index';
import OtherScreen from '../other';

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="NeverWord" component={NeverWordGame} />
      <Tab.Screen name="Other" component={OtherScreen} />
    </Tab.Navigator>
  );
}
