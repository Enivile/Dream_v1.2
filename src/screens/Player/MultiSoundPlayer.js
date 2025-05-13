import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import Slider from "@react-native-community/slider";
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";

/**
 * Improved MultiSoundPlayer:
 * - Uses a ref to store Audio.Sound instances, avoiding stale state closures
 * - Loads new sounds dynamically without unloading all
 * - Plays/pauses all sounds in parallel using Promise.all
 * - Ensures proper cleanup on unmount
 */
const MultiSoundPlayer = ({ sounds, onRemoveSound, onClose }) => {
  // Store sound instances in a ref for consistent access
  const soundRefs = useRef({});
  const [volumes, setVolumes] = useState({});
  const [isPlaying, setIsPlaying] = useState(true);

  // Load newly added sounds
  useEffect(() => {
    sounds.forEach(async (sound) => {
      if (!soundRefs.current[sound.id]) {
        try {
          const { sound: soundObj } = await Audio.Sound.createAsync(
            { uri: sound.uri },
            { shouldPlay: isPlaying, isLooping: true, volume: volumes[sound.id] ?? 1 }
          );
          soundRefs.current[sound.id] = soundObj;
        } catch (error) {
          console.error(`Error loading sound ${sound.id}:`, error);
        }
      }
    });
  }, [sounds]);

  // Cleanup all sounds on unmount
  useEffect(() => {
    return () => {
      Object.values(soundRefs.current).forEach(async (soundObj) => {
        try {
          await soundObj.unloadAsync();
        } catch (error) {
          console.error('Error unloading sound:', error);
        }
      });
      soundRefs.current = {};
    };
  }, []);

  // Adjust volume for a specific sound
  const handleVolumeChange = async (id, value) => {
    setVolumes((prev) => ({ ...prev, [id]: value }));
    const soundObj = soundRefs.current[id];
    if (soundObj) {
      await soundObj.setVolumeAsync(value);
    }
  };

  // Remove and unload a specific sound
  const handleRemove = async (id) => {
    const soundObj = soundRefs.current[id];
    if (soundObj) {
      await soundObj.stopAsync();
      await soundObj.unloadAsync();
      delete soundRefs.current[id];
    }
    onRemoveSound(id);
  };

  // Play or pause all sounds in parallel
  const togglePlayPause = async () => {
    const actions = Object.values(soundRefs.current).map((soundObj) =>
      isPlaying ? soundObj.pauseAsync() : soundObj.playAsync()
    );
    await Promise.all(actions);
    setIsPlaying((prev) => !prev);
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.playerContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Now Playing</Text>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={28} color="#fff" />
          </TouchableOpacity>
        </View>
        <FlatList
          data={sounds}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.soundRow}>
              <Ionicons name={item.icon} size={24} color="#fff" style={{ marginRight: 10 }} />
              <Text style={styles.soundName}>{item.name}</Text>
              <Slider
                style={{ flex: 1, marginHorizontal: 10 }}
                minimumValue={0}
                maximumValue={1}
                value={volumes[item.id] ?? 1}
                onValueChange={(value) => handleVolumeChange(item.id, value)}
                minimumTrackTintColor="#1DB954"
                maximumTrackTintColor="#fff"
                thumbTintColor="#1DB954"
              />
              <TouchableOpacity onPress={() => handleRemove(item.id)}>
                <Ionicons name="remove-circle-outline" size={24} color="#ff5252" />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
      <TouchableOpacity style={styles.playPauseButton} onPress={togglePlayPause}>
        <Ionicons name={isPlaying ? "pause" : "play"} size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(18,18,18,0.98)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  playerContainer: {
    width: "90%",
    maxHeight: "80%",
    backgroundColor: "#232323",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  soundRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
    backgroundColor: "#181818",
    borderRadius: 12,
    padding: 10,
  },
  soundName: {
    color: "#fff",
    fontSize: 16,
    minWidth: 80,
    marginRight: 10,
  },
  playPauseButton: {
    position: "absolute",
    bottom: 40,
    backgroundColor: "#1DB954",
    padding: 15,
    borderRadius: 50,
  },
});

export default MultiSoundPlayer;
