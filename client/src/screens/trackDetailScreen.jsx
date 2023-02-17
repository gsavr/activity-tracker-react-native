import { useContext } from "react";
import { StyleSheet } from "react-native";
import { Text } from "@rneui/themed";
import { Context as TrackContext } from "../context/trackContext";
import { Spacer } from "../components/spacer";
import MapView, { Polyline } from "react-native-maps";
import { useTimeStamp } from "../hooks/useTimeStamp";

export const TrackDetailScreen = (props) => {
  const { state } = useContext(TrackContext);
  const [timeStamp, hourStamp, dateStamp] = useTimeStamp();

  const _id = props.route.params._id;

  const track = state.find((t) => t._id == _id);
  const initialCoords = track.locations[0].coords;
  const date = dateStamp(track.locations[0].timestamp);
  const initialTime = hourStamp(track.locations[0].timestamp);
  const lastLoc = track.locations.length - 1;
  const endTime = hourStamp(track.locations[lastLoc].timestamp);
  //use timeStamp(time)..split(",")[0] if not working in prod

  return (
    <>
      <Spacer>
        <Text style={{ fontSize: 48 }}>{track.name}</Text>
        <Text style={styles.time}>{date}</Text>
      </Spacer>
      <MapView
        style={styles.map}
        initialRegion={{
          longitudeDelta: 0.007,
          latitudeDelta: 0.007,
          ...initialCoords,
        }}
      >
        <Polyline
          coordinates={track.locations.map((loc) => loc.coords)}
          strokeWidth={6}
          strokeColor="rgba(31,137,220,0.95)"
        />
      </MapView>
      <Spacer>
        <Text style={styles.time}>Began: {initialTime}</Text>
        <Spacer />
        <Text style={styles.time}>Ended: {endTime}</Text>
      </Spacer>
    </>
  );
};

const styles = StyleSheet.create({
  map: {
    height: 300,
  },
  time: {
    fontSize: 20,
    fontStyle: "italic",
  },
});
