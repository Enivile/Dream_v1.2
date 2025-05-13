import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import { startSession, uploadAudio, endSession, getSessionResults } from "../../utils/asleepApi";
import { startRecording, stopRecording } from "../../utils/audioRecorder";

const Tracker = () => {
  const [sessionId, setSessionId] = useState(null);
  const [recording, setRecording] = useState(null);
  const [seqNum, setSeqNum] = useState(1);

  const handleStartSession = async () => {
    const id = await startSession();
    setSessionId(id);
  };

  const handleStartRecording = async () => {
    const rec = await startRecording();
    setRecording(rec);
  };

  const handleStopRecording = async () => {
    if (!recording || !sessionId) return;
    const audioData = await stopRecording(recording);
    await uploadAudio(sessionId, audioData, seqNum);
    setSeqNum(seqNum + 1);
  };

  const handleEndSession = async () => {
    await endSession(sessionId);
    const results = await getSessionResults(sessionId);
    console.log("📊 Final Sleep Analysis:", results);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#121212" }}>
      <Text style={{ color: "white", fontSize: 20, marginBottom: 20 }}>Sleep Tracker</Text>
      <Button title="Start Session" onPress={handleStartSession} />
      <Button title="Start Recording" onPress={handleStartRecording} />
      <Button title="Stop Recording & Upload" onPress={handleStopRecording} />
      <Button title="End Session & Get Results" onPress={handleEndSession} />
    </View>
  );
};

export default Tracker;
