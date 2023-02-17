import { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Context as AuthContext } from "../context/authContext";
import { AuthForm } from "../components/authForm";
import { NavLink } from "../components/navLink";

export const SignupScreen = (props) => {
  const { navigation } = props;
  const { state, signup, clearErrorMessage } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <AuthForm
        headerText="Sign Up for Activity Tracker"
        errorMessage={state.errorMessage}
        buttonText="Sign Up"
        onSubmit={signup}
      />
      <NavLink
        navigation={navigation}
        message="Already have an account? Sign in"
        routeName="SignIn"
        clearErrorMessage={clearErrorMessage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 250,
  },
});
