import * as Location from "expo-location";

//this represents 10 meters
const tenMetersWithDegrees = 0.0001;

const getLocation = (increment) => {
  return {
    timeStamp: 10000000,
    coords: {
      speed: 0,
      heading: 0,
      accuracy: 5,
      altitudeAccuracy: 5,
      altitude: 5,
      longitude: -80.139198 + increment + tenMetersWithDegrees,
      latitude: 25.793449 + increment + tenMetersWithDegrees,
    },
  };
};

let counter = 0;
setInterval(() => {
  Location.EventEmitter.emit("Expo.locationChanged", {
    watchId: Location._getCurrentWatchId(),
    location: getLocation(counter),
  });
  counter++;
}, 1000);
