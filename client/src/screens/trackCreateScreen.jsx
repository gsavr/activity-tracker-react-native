//import "../_mockLocation";
import { useContext, useCallback } from "react";
import { useIsFocused } from "@react-navigation/native";
import {
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { Text } from "@rneui/themed";
import { Map } from "../components/map";
import { Spacer } from "../components/spacer";
import { Context as LocationContext } from "../context/locationContext";
import { useLocation } from "../hooks/useLocation";
import { TrackForm } from "../components/trackForm";

export const TrackCreateScreen = () => {
  const isFocused = useIsFocused();
  const {
    state: { recording },
    updateLocation,
  } = useContext(LocationContext);
  //useCallback limits the number of times we create a new callback function
  const callback = useCallback(
    (location) => {
      updateLocation(location, recording);
    },
    [recording]
  );
  //we only pull err out of the hook, but pass it a callback to update location and whether we are recording
  const [err] = useLocation(isFocused || recording, callback);

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <SafeAreaView forceInset={{ top: "always" }}>
        <ScrollView>
          <Spacer>
            <Text h2>Record Your Activity</Text>
          </Spacer>
          <Map />
          {err && (
            <Text
              style={styles.err}
            >{`Please enable location services in 'Settings > Activity Tracker > Location'`}</Text>
          )}
          <TrackForm />
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  err: {
    color: "red",
    fontSize: 18,
    alignSelf: "center",
    marginTop: 10,
  },
});
