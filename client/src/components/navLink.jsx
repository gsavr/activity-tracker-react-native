import { StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "@rneui/themed";
import { Spacer } from "./spacer";

export const NavLink = (props) => {
  const { navigation, message, routeName, clearErrorMessage } = props;

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(`${routeName}`);
        if (clearErrorMessage) {
          navigation.addListener("blur", () => clearErrorMessage());
        }
      }}
    >
      <Spacer>
        <Text style={styles.link}>{message}</Text>
      </Spacer>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  link: {
    alignSelf: "center",
    color: "#1e80cd",
  },
});
