import { View, StyleSheet, Text } from "react-native";
import * as Progress from "react-native-progress";

export const LoadingBar = () => {
  return (
    <View style={styles.progressView}>
      <Text style={styles.text}>Saving Your Activity</Text>
      <Progress.Bar
        progress={0.3}
        width={200}
        indeterminate={true}
        color={"black"}
        style={styles.progress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  progressView: {
    backgroundColor: "rgba(242, 242, 242, 0.6)",
    flex: 1,
    justifyContent: "center",

    ...StyleSheet.absoluteFillObject,
  },
  text: {
    alignSelf: "center",
    fontSize: 20,
    marginBottom: 5,
  },
  progress: {
    alignSelf: "center",
  },
});
