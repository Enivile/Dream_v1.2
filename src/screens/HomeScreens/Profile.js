import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from 'react-native';


const sections = [
  {
    title: "Tracker",
    data: [
      { id: "1", name: "Wake-up Alarm", value: "Off" },
      { id: "2", name: "Placement", value: "On" },
      { id: "3", name: "Battery Warning", value: "On" },
      { id: "4", name: "Sleep Note", value: "Off" },
      { id: "5", name: "Wake-up Mood", value: "On" },
    ],
  },
  {
    title: "Settings",
    data: [
      { id: "6", name: "Language", value: "Automatic" },
      { id: "7", name: "Sleep Reminder", value: "Off" },
      { id: "8", name: "Rate Us", value: "" },
      { id: "9", name: "Feedback", value: "" },
      { id: "10", name: "More", value: "" },
    ],
  },
];

const ProfileScreen = () => {
  return (
    
    <View style={styles.container}>
      <StatusBar 
        barStyle="light-content" // Changes text/icons to white
        translucent={true} // Makes status bar transparent
        backgroundColor="transparent" // Keeps background transparent
      />
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }} // Replace with actual image URL
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>James Robert</Text>
        <Text style={styles.profileAge}>Free Account</Text>
      </View>
      <View style={styles.container}>
      <FlatList
        data={sections}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.sectionHeader}>{item.title}</Text>
            {item.data.map((subItem) => (
              <TouchableOpacity key={subItem.id} style={styles.item}>
                <Text style={styles.itemText}>{subItem.name}</Text>
                <View style={styles.rightContainer}>
                  {subItem.value ? (
                    <Text style={styles.itemValue}>{subItem.value}</Text>
                  ) : null}
                  <Ionicons name="chevron-forward" size={18} color="white" />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      />

      {/* Bottom Navigation */}
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#121212',
    paddingTop:40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  headerButton: {
    fontSize: 24,
  },
  profileContainer: {
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileAge: {
    fontSize: 16,
    color: '#888',
    marginBottom: 20,
  },
  friendButton: {
    backgroundColor: '#E5FFE5',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 10,
  },
  friendButtonText: {
    color: '#2ECC71',
    fontSize: 16,
  },
  matchButton: {
    backgroundColor: '#2ECC71',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  matchButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  infoContainer: {
    padding: 20,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    margin: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 16,
    color: '#888',
  },
  infoValue: {
    fontSize: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  star: {
    fontSize: 16,
    color: '#FFD700',
  },
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingTop: 50,
  },
  header: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  sectionHeader: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
    marginLeft: 20,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  itemText: {
    color: "white",
    fontSize: 14,
  },
  itemValue: {
    color: "white",
    fontSize: 14,
    marginRight: 10,
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#1E1E1E",
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: "#333",
  },
  navItem: {
    alignItems: "center",
  },
  activeNav: {
    backgroundColor: "#0A84FF",
    borderRadius: 50,
    padding: 10,
  },
});

export default ProfileScreen;
