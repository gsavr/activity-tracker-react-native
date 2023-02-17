import { View, StyleSheet } from "react-native";
import { Text } from "@rneui/themed";
import * as Progress from "react-native-progress";
//import { LoadingBar } from "../components/loadingBar";

export const SplashScreen = () => {
  return (
    <View style={styles.splash}>
      {/* <Text style={styles.text}>Welcome to </Text> */}
      <Text style={styles.text}>Activity Tracker</Text>
      <Progress.Bar
        progress={0.6}
        width={200}
        indeterminate={true}
        color={"#1e80cd"}
        style={styles.progress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  splash: {
    alignSelf: "center",
    marginVertical: 300,
  },
  text: {
    fontSize: 40,
    fontWeight: "bold",
  },
  progress: {
    marginTop: 150,
    alignSelf: "center",
  },
});
