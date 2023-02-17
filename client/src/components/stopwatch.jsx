import { useState, useEffect, useContext } from "react";
import { Text } from "@rneui/themed";
import { StyleSheet, View } from "react-native";
import { Context as LocationContext } from "../context/locationContext";

export const StopWatch = (props) => {
  const {
    state: { isTimerActive, isTimerPaused },
  } = useContext(LocationContext);
  const { time, setTime } = props;

  useEffect(() => {
    let interval = null;

    if (isTimerActive && isTimerPaused === false) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isTimerActive, isTimerPaused]);

  return (
    <View style={styles.time}>
      <Text style={styles.digits}>
        {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
      </Text>
      <Text style={styles.digits}>
        {("0" + Math.floor((time / 1000) % 60)).slice(-2)}.
      </Text>
      <Text style={styles.milisec}>
        {("0" + ((time / 10) % 100)).slice(-2)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  time: {
    margin: 15,
    flexDirection: "row",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  digits: {
    fontSize: 55,
  },
  milisec: {
    fontSize: 55,
    color: "#e42a2a",
  },
});
