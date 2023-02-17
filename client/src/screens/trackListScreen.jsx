import { useEffect, useContext } from "react";
import { StyleSheet, Text, FlatList, TouchableOpacity } from "react-native";
import { ListItem } from "@rneui/themed";
import { Context as TrackContext } from "../context/trackContext";
import { useTimeStamp } from "../hooks/useTimeStamp";

export const TrackListScreen = (props) => {
  const { navigation } = props;
  const { state, fetchTracks } = useContext(TrackContext);
  const [timeStamp] = useTimeStamp();

  useEffect(() => {
    navigation.addListener("focus", fetchTracks);
  }, []);

  return (
    <>
      {!state.length ? (
        <Text style={styles.noList}>Please record your first activity</Text>
      ) : (
        <FlatList
          data={state.reverse()}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("TrackDetail", { _id: item._id })
                }
              >
                <ListItem containerStyle={styles.listItem} bottomDivider>
                  <ListItem.Content>
                    <ListItem.Title style={styles.title}>
                      {item.name}
                    </ListItem.Title>
                    <ListItem.Subtitle>
                      {timeStamp(item.locations[0].timestamp)}
                    </ListItem.Subtitle>
                  </ListItem.Content>
                  <ListItem.Chevron />
                </ListItem>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  noList: {
    flex: 1,
    marginTop: 150,
    alignSelf: "center",
    alignContent: "center",
    fontSize: 25,
  },
  listItem: {
    backgroundColor: "rgba(242, 242, 242, 0.6)",
  },
  title: {
    fontWeight: "bold",
    fontStyle: "italic",
  },
});
