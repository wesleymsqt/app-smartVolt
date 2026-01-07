import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SignIn } from '@/screens/SignIn';
import { Home } from '@/screens/Home';
import { ManageGroups } from '@/screens/Groups/ManageGroups';
import { ManageDevices } from '@/screens/ManageDevices';
import { Personalizations } from '@/screens/Personalizations';

// --- NOVOS IMPORTS ---
import { GroupDetails } from '@/screens/Groups/GroupDetails';
import { CreateGroup } from '@/screens/Groups/CreateGroup';

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

        {/* --- NOVAS ROTAS ADICIONADAS --- */}
        <Stack.Screen name="GroupDetails" component={GroupDetails} />
        <Stack.Screen name="CreateGroup" component={CreateGroup} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}