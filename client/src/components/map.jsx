import { useContext, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Text, Switch } from "@rneui/themed";
import { Spacer } from "./spacer";
import MapView, { Polyline } from "react-native-maps";
import { Context as LocationContext } from "../context/locationContext";

export const Map = () => {
  const {
    state: { currentLocation, locations },
  } = useContext(LocationContext);
  const [followUser, setFollowUser] = useState(true);

  if (!currentLocation) {
    return <ActivityIndicator size="large" style={{ marginTop: 200 }} />;
  }

  return (
    <>
      <MapView
        style={styles.map}
        initialRegion={{
          ...currentLocation.coords,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
        followsUserLocation={followUser}
        showsUserLocation
        showsCompass
      >
        <Polyline
          coordinates={locations.map((loc) => loc.coords)}
          strokeWidth={6}
          strokeColor="rgba(31,137,220,0.95)"
        />
      </MapView>
      <Spacer>
        <View style={styles.row}>
          <Text style={styles.rowText}>Follow Location</Text>
          <Switch
            value={followUser}
            onValueChange={() => setFollowUser(!followUser)}
          />
        </View>
      </Spacer>
    </>
  );
};

const styles = StyleSheet.create({
  map: {
    height: 300,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#e2e0e0",
    paddingVertical: 2,
  },
  rowText: {
    fontSize: 12,
    marginTop: 8,
  },
});

//this was to fake location myself
/* let points = [];
  for (let i = 0; i < 20; i++) {
    if (i % 2 === 0) {
      points.push({
        latitude: 25.793449 + i * 0.001,
        longitude: -80.139198 + i * 0.001,
      });
    } else {
      points.push({
        latitude: 25.793449 - i * 0.002,
        longitude: -80.139198 - i * 0.002,
      });
    }
  } */
