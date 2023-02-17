import { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Context as TrackContext } from "../context/trackContext";
import { Context as LocationContext } from "../context/locationContext";

export const useSaveTrack = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { createTrack } = useContext(TrackContext);
  const {
    state: { name, locations },
    resetTrack,
  } = useContext(LocationContext);

  const saveTrack = async () => {
    setLoading(true);
    await createTrack(name || "Unnamed Activity", locations);
    resetTrack();
    setTimeout(() => {
      setLoading(false);
      navigation.navigate("TrackList");
    }, 1500);
  };

  return [saveTrack, loading];
};
