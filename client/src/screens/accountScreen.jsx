import { useContext } from "react";
import { View, StyleSheet, Text, SafeAreaView } from "react-native";
import { Button } from "@rneui/themed";
import { Spacer } from "../components/spacer";
import { Context as AuthContext } from "../context/authContext";

export const AccountScreen = () => {
  const { state, signout } = useContext(AuthContext);

  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Spacer>
        <Text style={{ fontSize: 48 }}>Account:</Text>
      </Spacer>
      <Spacer>
        <Text style={{ fontSize: 18 }}> {state.email}</Text>
      </Spacer>
      <Spacer>
        <Button title="Sign Out" onPress={signout} />
      </Spacer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
