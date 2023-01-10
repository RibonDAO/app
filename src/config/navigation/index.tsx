/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable } from "react-native";
import CausesIconOn from "./assets/CausesIconOn";
import CausesIconOff from "./assets/CausesIconOff";
import ProfileIconOn from "./assets/ProfileIconOn";
import ProfileIconOff from "./assets/ProfileIconOff";
import Colors from "utils/constants/Colors";
import useColorScheme from "hooks/useColorScheme";
import ModalScreen from "screens/ModalScreen";
import NotFoundScreen from "screens/NotFoundScreen";
import CausesPage from "screens/CausesPage";
import ProfilePage from "screens/ProfilePage";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "types";
import LinkingConfiguration from "./LinkingConfiguration";
import { theme } from "@ribon.io/shared/styles";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />

      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const activeColor = theme.colors.green30;

  return (
    <BottomTab.Navigator
      initialRouteName="CausesPage"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="CausesPage"
        component={CausesPage}
        options={({ navigation }: RootTabScreenProps<"CausesPage">) => ({
          title: "Causes Page",
          tabBarIcon: ({ color }) => color === activeColor ? <CausesIconOn /> : <CausesIconOff />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("Modal")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="ProfilePage"
        component={ProfilePage}
        options={{
          title: "Profile Page",
          tabBarIcon: ({ color }: any) =>
            color === activeColor ? <ProfileIconOn /> : <ProfileIconOff />
        }}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
