import { useState } from "react";
import { StyleSheet } from "react-native";
import { Text, Input, Button } from "@rneui/themed";
import { Spacer } from "./spacer";

export const AuthForm = (props) => {
  const { headerText, errorMessage, buttonText, onSubmit } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <Spacer>
        <Text h3 style={styles.h3}>
          {headerText}
        </Text>
      </Spacer>
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize={false}
        autoCorrect={false}
      />
      <Spacer />
      <Input
        secureTextEntry
        label="Password"
        value={password}
        onChangeText={setPassword}
        autoCapitalize={false}
        autoCorrect={false}
      />
      {errorMessage && (
        <Spacer>
          <Text style={styles.error}>{errorMessage}</Text>
        </Spacer>
      )}
      <Spacer>
        <Button
          title={buttonText}
          onPress={() => onSubmit({ email, password })}
        />
      </Spacer>
    </>
  );
};

const styles = StyleSheet.create({
  h3: {
    alignSelf: "center",
    marginBottom: 50,
  },
  error: {
    alignSelf: "center",
    color: "red",
    fontSize: 18,
  },
});
