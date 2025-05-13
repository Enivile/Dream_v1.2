import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { downloadAudioFromFirebase } from "../../../utils/firebaseAudioDownloader";
import * as FileSystem from "expo-file-system";
import { ActivityIndicator } from "react-native";

const soundData = [
  { "id": "1", "name": "Campfire", "icon": "flame-outline" },
  { "id": "2", "name": "Rain", "icon": "bug-outline" },
  { "id": "3", "name": "Wind", "icon": "speedometer-outline" },
  { "id": "4", "name": "Wind", "icon": "speedometer-outline" },
  { "id": "5", "name": "Flute", "icon": "musical-notes-outline" },
  { "id": "6", "name": "Roof", "icon": "home-outline" },
  { "id": "7", "name": "Pink Noise", "icon": "volume-low-outline" },
  { "id": "8", "name": "Ocean Waves", "icon": "water-outline" },
  { "id": "9", "name": "Flute", "icon": "musical-notes-outline" },
  { "id": "10", "name": "White Noise", "icon": "volume-high-outline" },
  { "id": "11", "name": "Keyboard", "icon": "laptop-outline" },
  { "id": "12", "name": "Roof", "icon": "home-outline" }
];

const firebasePathMap = {
  "Campfire": "whiteNoises/campfire.mp3",
  "Rain": "whiteNoises/rain.mp3",
  "Wind": "whiteNoises/wind.mp3",
  "Flute": "whiteNoises/flute.mp3",
  "Roof": "whiteNoises/roof.mp3",
  "Pink Noise": "whiteNoises/pink_noise.mp3",
  "Ocean Waves": "whiteNoises/ocean_waves.mp3",
  "White Noise": "whiteNoises/white_noise.mp3",
  "Keyboard": "whiteNoises/keyboard.mp3"
};

const WNcity = () => {
  const [loadingIds, setLoadingIds] = useState([]);

  const handleDownload = async (item) => {
    const firebasePath = firebasePathMap[item.name];
    if (!firebasePath) {
      Alert.alert("Not available", "No Firebase path mapped for this sound.");
      return;
    }
    const fileName = firebasePath.split("/").pop();
    const localUri = FileSystem.documentDirectory + fileName;
    try {
      setLoadingIds((prev) => [...prev, item.id]);
      const fileInfo = await FileSystem.getInfoAsync(localUri);
      if (fileInfo.exists) {
        Alert.alert("Already downloaded", `File is already available: ${localUri}`);
        setLoadingIds((prev) => prev.filter((id) => id !== item.id));
        return;
      }
      const downloadedUri = await downloadAudioFromFirebase(firebasePath, fileName);
      Alert.alert("Download complete", `Saved to: ${downloadedUri}`);
    } catch (error) {
      Alert.alert("Download failed", error.message || "An error occurred while downloading.");
    } finally {
      setLoadingIds((prev) => prev.filter((id) => id !== item.id));
    }
  };

  return (
    <View style={styles.gridContainer}>
      <FlatList
        data={soundData}
        keyExtractor={(item) => item.id}
        numColumns={4}
        renderItem={({ item }) => (
          <View style={styles.gridItemContainerMain}>
            <TouchableOpacity
              style={styles.gridItemContainer}
              onPress={() => handleDownload(item)}
              disabled={loadingIds.includes(item.id)}
            >
              {loadingIds.includes(item.id) ? (
                <ActivityIndicator size={25} color="white" />
              ) : (
                <Ionicons name={item.icon} size={25} color="white" />
              )}
            </TouchableOpacity>
            <Text style={styles.gridText}>{item.name}</Text>
          </View>
        )}
        contentContainerStyle={styles.gridListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    flex: 1,
    backgroundColor: "#121212",
    paddingTop: 0,
  },
  gridListContainer: {
    paddingHorizontal: 10,
  },
  gridItemContainerMain: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  gridItemContainer: {
    flex: 1,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1E1E1E",
    borderRadius: 50,
    padding: 15,
  },
  gridText: {
    color: "white",
    marginTop: 5,
    fontSize: 12,
  },
});

export default WNcity;