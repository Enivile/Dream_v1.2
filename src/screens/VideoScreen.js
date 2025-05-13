import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { Video } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const VideoScreen = () => {
  const [showButtons, setShowButtons] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButtons(true);
    }, 1000); // Show buttons after 8 seconds

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, []);

  const handleNextScreen = () => {
    navigation.navigate("Main"); // Replace "NextScreen" with the actual screen name
  };

  return (
    <View style={styles.container}>
      <Video
        source={require("../../assets/videos/back11.webm")}
        style={[StyleSheet.absoluteFillObject, styles.video]}
        shouldPlay
        resizeMode="cover"
      />

      {showButtons && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.roundButton} onPress={handleNextScreen}>
            <Ionicons name="arrow-forward" size={24} color="#000" />
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={login}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity> */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 60,
    alignItems: "center",
    width: "100%",
  },
  video: {
    minWidth: "100%",
  },
  roundButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  loginText: {
    fontSize: 16,
    color: "#FFF",
  },
});

export default VideoScreen;
