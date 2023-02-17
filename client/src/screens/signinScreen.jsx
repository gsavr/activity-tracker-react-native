import { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Context as AuthContext } from "../context/authContext";
import { AuthForm } from "../components/authForm";
import { NavLink } from "../components/navLink";

export const SigninScreen = (props) => {
  const { navigation } = props;
  const { state, signin, clearErrorMessage } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <AuthForm
        headerText="Sign In to Activity Tracker"
        errorMessage={state.errorMessage}
        buttonText="Sign In"
        onSubmit={signin}
      />
      <NavLink
        navigation={navigation}
        message="Don't have an account? Sign up"
        routeName="SignUp"
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
