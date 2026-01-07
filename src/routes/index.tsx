import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SignIn } from '@/screens/SignIn';
import { Home } from '@/screens/Home';
import { ManageGroups } from '@/screens/Groups/ManageGroups';
import { ManageDevices } from '@/screens/Devices/ManageDevices';
import { Personalizations } from '@/screens/Personalizations/ManagePersonalizations';

import { GroupDetails } from '@/screens/Groups/GroupDetails';
import { CreateGroup } from '@/screens/Groups/CreateGroup';

import { AddDevice } from '@/screens/Devices/AddDevice';
import { EditDevice } from '@/screens/Devices/EditDevice';

import { CreateGoal } from '@/screens/Personalizations/CreateGoal';

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

        <Stack.Screen name="GroupDetails" component={GroupDetails} />
        <Stack.Screen name="CreateGroup" component={CreateGroup} />

        <Stack.Screen name="AddDevice" component={AddDevice} />
        <Stack.Screen name="EditDevice" component={EditDevice} />

        <Stack.Screen name="CreateGoal" component={CreateGoal} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
