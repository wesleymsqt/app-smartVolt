import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SignIn } from '@/screens/SignIn';
import { Home } from '@/screens/Home';
import { ManageGroups } from '@/screens/ManageGroups';
import { ManageDevices } from '@/screens/ManageDevices';
import { Personalizations } from '@/screens/Personalizations';

const Stack = createNativeStackNavigator();

export function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="SignIn">
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ManageGroups" component={ManageGroups} />
        <Stack.Screen name="ManageDevices" component={ManageDevices} />
        <Stack.Screen name="Personalizations" component={Personalizations} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
