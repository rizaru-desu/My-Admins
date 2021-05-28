// In App.js in a new project

import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./assets/page/home";
import user_find_mkp from "./assets/page/materi-keperawatan/user-find-mkp";
import scan_mkp from "./assets/page/materi-keperawatan/scan-mkp";
import scan_mgz from "./assets/page/materi-gizi/scan-mgz";
import user_find_mgz from "./assets/page/materi-gizi/user-find-mgz";
import user_find_mfm from "./assets/page/materi-farmasi/user-find-mfm";
import scan_mfm from "./assets/page/materi-farmasi/scan-mfm";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />

        <Stack.Screen
          name="user-find-mkp"
          component={user_find_mkp}
          options={{
            headerShown: true,
            title: null,
            headerBackTitle: "Back",
            gestureEnabled: false,
          }}
        />

        <Stack.Screen
          name="scan-mkp"
          component={scan_mkp}
          options={{
            headerShown: true,
            title: null,
            headerBackTitle: "Back",
            gestureEnabled: false,
          }}
        />

        <Stack.Screen
          name="user-find-mgz"
          component={user_find_mgz}
          options={{
            headerShown: true,
            title: null,
            headerBackTitle: "Back",
            gestureEnabled: false,
          }}
        />

        <Stack.Screen
          name="scan-mgz"
          component={scan_mgz}
          options={{
            headerShown: true,
            title: null,
            headerBackTitle: "Back",
            gestureEnabled: false,
          }}
        />

        <Stack.Screen
          name="user-find-mfm"
          component={user_find_mfm}
          options={{
            headerShown: true,
            title: null,
            headerBackTitle: "Back",
            gestureEnabled: false,
          }}
        />

        <Stack.Screen
          name="scan-mfm"
          component={scan_mfm}
          options={{
            headerShown: true,
            title: null,
            headerBackTitle: "Back",
            gestureEnabled: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
