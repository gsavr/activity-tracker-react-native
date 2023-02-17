import { useContext, useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { Input, Button, Text } from "@rneui/themed";
import { Spacer } from "./spacer";
import { LoadingBar } from "./loadingBar";
import { StopWatch } from "./stopwatch";
import { Context as LocationContext } from "../context/locationContext";
import { useSaveTrack } from "../hooks/useSaveTrack";

export const TrackForm = () => {
  const {
    state: { name, recording, locations },
    startRecording,
    stopRecording,
    activityName,
    resetTrack,
  } = useContext(LocationContext);
  const [saveTrack, loading] = useSaveTrack();
  const [time, setTime] = useState(0);

  const createDeleteAlert = () =>
    Alert.alert("Delete your current activity?", "This cannot be undone", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => {
          resetTrack();
          setTime(0);
        },
        style: "destructive",
      },
    ]);

  const createNameAlert = () => {
    Alert.alert("Please name your activity", "", [
      {
        text: "OK",
        onPress: () => null,
        style: "cancel",
      },
    ]);
  };

  const saveTrackCheck = () => {
    if (!name) {
      createNameAlert();
    } else {
      saveTrack();
      setTime(0);
    }
  };

  return (
    <>
      <Spacer>
        <Input
          value={name}
          placeholder="Name your Activity"
          onChangeText={activityName}
          returnKeyType="done"
        />
        {recording ? (
          <>
            <Button
              title={"Pause"}
              buttonStyle={{
                backgroundColor: "rgba(234, 209, 16, 1)",
                borderRadius: 55,
              }}
              titleStyle={{ marginVertical: 10, color: "black" }}
              onPress={stopRecording}
            />
          </>
        ) : (
          <Button
            title={"Record"}
            buttonStyle={{
              backgroundColor: "rgba(234, 209, 16, 1)",
              borderRadius: 55,
            }}
            titleStyle={{ marginVertical: 10, color: "black" }}
            onPress={startRecording}
          />
        )}
        {recording || !locations.length ? (
          <StopWatch time={time} setTime={setTime} />
        ) : null}

        {!recording && locations.length ? (
          <>
            <View style={styles.bottomRow}>
              <Text style={styles.digits}>Current time: </Text>
              <Text style={styles.digits}>
                {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
              </Text>
              <Text style={styles.digits}>
                {("0" + Math.floor((time / 1000) % 60)).slice(-2)}.
              </Text>
              <Text style={styles.digits}>
                {("0" + ((time / 10) % 100)).slice(-2)}
              </Text>
            </View>
            <View style={styles.bottomRow}>
              <Button
                title="Save"
                buttonStyle={{
                  backgroundColor: "rgba(30, 204, 154, 1)",
                  borderRadius: 55,
                }}
                titleStyle={{
                  marginVertical: 25,
                  marginHorizontal: 17,
                  color: "black",
                }}
                onPress={saveTrackCheck}
              />
              <Spacer />
              <Button
                title="Delete"
                buttonStyle={{
                  backgroundColor: "rgba(214, 61, 57, .8)",
                  borderRadius: 55,
                }}
                titleStyle={{ marginVertical: 25, marginHorizontal: 10 }}
                onPress={() => createDeleteAlert()}
              />
            </View>
          </>
        ) : (
          <></>
        )}
      </Spacer>
      {loading && <LoadingBar />}
    </>
  );
};

const styles = StyleSheet.create({
  bottomRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
  digits: {
    fontSize: 20,
    fontStyle: "italic",
    marginVertical: 5,
  },
});
