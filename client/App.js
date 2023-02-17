import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AccountScreen } from "./src/screens/accountScreen";
import { SigninScreen } from "./src/screens/signinScreen";
import { SignupScreen } from "./src/screens/signupScreen";
import { TrackCreateScreen } from "./src/screens/trackCreateScreen";
import { TrackDetailScreen } from "./src/screens/trackDetailScreen";
import { TrackListScreen } from "./src/screens/trackListScreen";
import { useEffect, useContext, useState } from "react";
import { Provider as AuthProvider } from "./src/context/authContext";
import { Provider as LocationProvider } from "./src/context/locationContext";
import { Provider as TrackProvider } from "./src/context/trackContext";
import { Context as AuthContext } from "./src/context/authContext";
import { SplashScreen } from "./src/screens/splashScreen";
import {
  MaterialCommunityIcons,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";

const AuthStack = createNativeStackNavigator();
const TrackStack = createNativeStackNavigator();
const TrackStackScreen = () => {
  return (
    <TrackStack.Navigator>
      <TrackStack.Screen
        name="TrackList"
        component={TrackListScreen}
        options={{ title: "Your Activities" }}
      />
      <TrackStack.Screen
        name="TrackDetail"
        component={TrackDetailScreen}
        options={{ title: "" }}
      />
    </TrackStack.Navigator>
  );
};
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <AuthProvider>
      <TrackProvider>
        <LocationProvider>
          <AuthCheck />
        </LocationProvider>
      </TrackProvider>
    </AuthProvider>
  );
};

const AuthCheck = () => {
  const { state, checkAuth } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    checkAuth();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [state.token]);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      {!state.token ? (
        <AuthStack.Navigator screenOptions={{ headerShown: false }}>
          <AuthStack.Screen
            name="SignUp"
            component={SignupScreen}
            options={{ title: "Welcome" }}
          />
          <AuthStack.Screen
            name="SignIn"
            component={SigninScreen}
            options={{ title: "Welcome Back" }}
          />
        </AuthStack.Navigator>
      ) : (
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: "#e91e63",
            //tabBarActiveBackgroundColor: "blue",
          }}
        >
          <Tab.Screen
            name="TrackStack"
            component={TrackStackScreen}
            options={{
              tabBarLabel: "Activities",
              //tabBarBadge: 3,
              tabBarIcon: ({ color, size }) => (
                <Ionicons
                  name="ios-list-circle-sharp"
                  size={size}
                  color={color}
                />
              ),
            }}
          />
          <Tab.Screen
            name="TrackCreate"
            component={TrackCreateScreen}
            options={{
              tabBarLabel: "Record Activity",
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="record-circle"
                  size={size}
                  color={color}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Account"
            component={AccountScreen}
            options={{
              tabBarLabel: "Account",
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons
                  name="account-circle"
                  size={size}
                  color={color}
                />
              ),
            }}
          />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;
