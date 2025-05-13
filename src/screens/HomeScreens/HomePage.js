import React, { useEffect , useRef } from "react";
import { View, Image, StyleSheet, Dimensions, Animated, TouchableOpacity, FlatList, Text, ScrollView, LinearGradient } from "react-native";
import Swiper from 'react-native-swiper';
import { StatusBar } from 'react-native';
import { useNavigation } from "@react-navigation/native";
// import { Ionicons } from "@expo/vector-icons";



  const screenWidth = Dimensions.get("window").width;

  const HomePage = ({}) => {
    const glowAnim = useRef(new Animated.Value(0)).current; // Initialize animated value
    const navigation = useNavigation();

    useEffect(() => { 
    Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: false, // Animation on styles requires useNativeDriver: false
          }),
          Animated.timing(glowAnim, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: false,
          }),
        ])
      ).start();
    }, []);
    
    const shadowInterpolation = glowAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 100], // Change this range to adjust the glow intensity
    });

    const icons = [
      { id: "1", source: require("../../../assets/images/icons/list.png"), label: "My List" },
      { id: "2", source: require("../../../assets/images/icons/music.png"), label: "Music" },
      { id: "3", source: require("../../../assets/images/icons/noise.png"), label: "White Noise" },
      { id: "4", source: require("../../../assets/images/icons/premium.png"), label: "Premium" },
    ];

    const items = [
      {
        id: 1,
        title: 'Feel Better: Drift Into Peaceful Nights',
        category: 'Collections',
        image: require('../../../assets/images/banners/Recently_Updated_5.webp'), // Use require here
        count: '7 items',
      },
      {
        id: 2,
        title: 'Thanksgiving Meditation',
        category: 'Meditation',
        image: require('../../../assets/images/banners/Recently_Updated_2.webp'), // Use require here
        count: '6 MIN',
      },
      {
        id: 3,
        title: 'Feel Better: Drift Into Peaceful Nights',
        category: 'Collections',
        image: require('../../../assets/images/banners/Recently_Updated_3.webp'), // Use require here
        count: '7 items',
      },
      {
        id: 4,
        title: 'Thanksgiving Meditation',
        category: 'Meditation',
        image: require('../../../assets/images/banners/Recently_Updated_4.webp'), // Use require here
        count: '6 MIN',
      },
      {
        id: 5,
        title: 'Feel Better: Drift Into Peaceful Nights',
        category: 'Collections',
        image: require('../../../assets/images/banners/Recently_Updated_1.webp'), // Use require here
        count: '7 items',
      },
    ];

    const data = [
      { id: '1', row1: { name: 'Rain', category: 'Rain', icon: '🌧️' }, row2: { name: 'Wind', category: 'Nature', icon: '🌬️' } },
      { id: '2', row1: { name: 'Exhaust Fan', category: 'Fan', icon: '🔲' }, row2: { name: 'Forest', category: 'Nature', icon: '🌲' } },
      { id: '3', row1: { name: 'Campfire', category: 'Nature', icon: '🔥' }, row2: { name: 'Thunder', category: 'Nature', icon: '⚡' } },
      { id: '4', row1: { name: 'Ocean', category: 'Nature', icon: '🌊' }, row2: { name: 'Stream', category: 'Nature', icon: '💧' } },
      // Add more pairs as needed
    ];


    return (
      <ScrollView style={styles.containerMain}>
        <StatusBar 
        barStyle="light-content" // Changes text/icons to white
        translucent={true} // Makes status bar transparent
        backgroundColor="transparent" // Keeps background transparent
      />
        <View style={styles.container}>
          <Image source={require('../../../assets/images/homebg1.webp')} style={[styles.image, { width: screenWidth }]} />
          <Animated.Text style={[styles.text, {textShadowRadius: shadowInterpolation}]}>DREAM</Animated.Text>
        </View>

        {/* -------------------------------------------------------------------------------------------------------------------------------------- */}

        <FlatList
          data={icons}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.iconContainer}>
              <Image source={item.source} style={styles.icon} />
              <Text style={styles.iconText}>{item.label}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.carousel}
          snapToInterval={screenWidth / 4} // Ensures snapping to 4 items per screen width
          decelerationRate="fast" // Smooth scrolling
        />

        {/* -------------------------------------------------------------------------------------------------------------------------------------- */}

        <View style={styles.sliderMainContainer}>
          <View style={styles.sliderSubContainer}>
            <Swiper
              loop
              autoplay
              autoplayTimeout={3}
              showsPagination={true}
              showsButtons={false}
              dotColor="#FFFFFF"
              activeDotColor="#9b9b9e"
              paginationStyle={styles.paginationStyle}
            >
              <View style={styles.sliderItem}>
                <Image source={require('../../../assets/images/banners/swiper-1.webp')} style={styles.sliderImage} />
              </View>
              <View style={styles.sliderItem}>
                <Image source={require('../../../assets/images/banners/swiper-2.webp')} style={styles.sliderImage} />
              </View>
              <View style={styles.sliderItem}>
                <Image source={require('../../../assets/images/banners/swiper-3.webp')} style={styles.sliderImage} />
              </View>
            </Swiper>
          </View>
        </View>

        {/* -------------------------------------------------------------------------------------------------------------------------------------- */}


        <View style={styles.recentlyUpdatedContainer}>
          {/* Header Section */}
          <View style={styles.recentlyUpdatedHeader}>
            <Text style={styles.recentlyUpdatedTitle}>Recently Updated</Text>
            <TouchableOpacity>
              <Text style={styles.recentlyUpdatedSeeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          {/* Carousel Section */}
          <FlatList
          data={items}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View key={item.id} style={styles.recentlyUpdatedSlide}>
                <Image
                  source={item.image}
                  style={styles.recentlyUpdatedCarousel2Image}
                  resizeMode="cover"
                />
                <Text style={styles.recentlyUpdatedNewBadge}>NEW</Text>
                <View style={styles.recentlyUpdatedTextContainer}>
                  <Text style={styles.recentlyUpdatedCategory}>{item.category}</Text>
                  <Text style={styles.recentlyUpdatedEntryTitle}>{item.title}</Text>
                  <Text style={styles.recentlyUpdatedEntryDetails}>{item.count}</Text>
                </View>
              </View>
          )}
          contentContainerStyle={styles.recentlyUpdatedCarousel}
          decelerationRate='normal' // Smooth scrolling
        />
        </View>

        {/* -------------------------------------------------------------------------------------------------------------------------------------- */}

        <View style={styles.noiseContainer}>
          {/* Header Section */}
          <View style={styles.noiseHeaderContainer}>
            <Text style={styles.noiseHeader}>White Noise</Text>
            <Text style={styles.noiseSeeAll}>See All</Text>
          </View>
    
          {/* Horizontal Scroll List */}
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={ ({ item }) => (
              <View style={styles.noiseItemContainer}>
                {/* Row 1 */}
                <View style={styles.noiseRow}>
                  <Text style={styles.noiseIcon}>{item.row1.icon}</Text>
                  <View>
                  <Text style={styles.noiseTitle}>{item.row1.name}</Text>
                  <Text style={styles.noiseCategory}>{item.row1.category}</Text>
                  </View>
                </View>
                {/* Row 2 */}
                <View style={styles.noiseRow}>
                  <Text style={styles.noiseIcon}>{item.row2.icon}</Text>
                  <View>
                  <Text style={styles.noiseTitle}>{item.row2.name}</Text>
                  <Text style={styles.noiseCategory}>{item.row2.category}</Text>
                  </View>
                </View>
              </View>
            )}
            horizontal
            contentContainerStyle={styles.noiseListContainer}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        {/* -------------------------------------------------------------------------------------------------------------------------------------- */}

        <View style={styles.storyContainer}>
          {/* Header Section */}
          <View style={styles.storyHeader}>
            <Text style={styles.storyTitle}>Stories</Text>
            <TouchableOpacity>
              <Text style={styles.storySeeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          {/* Carousel Section */}
          <FlatList
          data={items}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View key={item.id} style={styles.storySlide}>
                <Image
                  source={item.image}
                  style={styles.storyCarousel2Image}
                  resizeMode="cover"
                />
                <Text style={styles.storyNewBadge}>NEW</Text>
                <View style={styles.storyTextContainer}>
                  <Text style={styles.storyCategory}>{item.category}</Text>
                  <Text style={styles.storyEntryTitle}>{item.title}</Text>
                  <Text style={styles.storyEntryDetails}>{item.count}</Text>
                </View>
              </View>
          )}
          contentContainerStyle={styles.storyCarousel}
          decelerationRate='normal' // Smooth scrolling
        />
        </View>

        {/* -------------------------------------------------------------------------------------------------------------------------------------- */}

        
      </ScrollView>
    );
};

const styles = StyleSheet.create({
  containerMain: {
    backgroundColor: "#000000",
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#000000",
    position: "relative",
    height: 200,
  },
  image: {
    // marginBottom: 2,
    height: 200,
    position: "absolute",
    resizeMode: 'cover',
  },
  text: {
    color: "#f1e6c9",
    fontSize: 34,
    fontWeight: "bold",
    position: "absolute",
    transform: [{ translateY: 50 }], // Center the text
    textShadowColor: "#f1e6c9", // Glow color
    textShadowOffset: { width: 0, height: 0 }, // No offset
    textShadowRadius: 10, // Initial shadow radius
    padding: 20,
  },
  carousel: {
    paddingHorizontal: 10,
    // paddingVertical: 20,
    backgroundColor: "#000000",
    marginTop: 10,
  },
  iconContainer: {
    width: screenWidth / 4, // Width to fit 4 icons per screen
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(43, 43, 43, 0.76)", // Background color with 76% opacity
    borderRadius: 15, // Rounded corners
    borderWidth: 0, // Border thickness
    borderColor: "#6200EE", // Border color
    padding: 10, // Add some padding inside the box
    marginHorizontal: 5, // Space between the boxes
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.2, // Shadow opacity
    shadowRadius: 5, // Shadow blur
    elevation: 5, // Shadow for Android
  },
  icon: {
    width: 30,
    height: 30,
    // resizeMode: "contain",
  },
  iconText: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 12,
    marginTop: 5,
  },

  // -----------------------------------------------------------------------------------------------------------------------------
  
  sliderMainContainer: {
    width: "100%",
    height: 170,
    backgroundColor: "#000000",
  },
  sliderSubContainer: {
    alignSelf: "center",
    width: "90%",
    flex: 1,
    borderRadius: 10,
    margin: 15,
    backgroundColor: "#000000",
  },
  sliderImage: {
    width: "100%",
    height: "100%",
    padding: 15,
    borderRadius: 10,
  },
  paginationStyle: {
    position: "absolute",
    bottom: -15,
    alignSelf: "center",
    flexDirection: "row",
  },

  // ------------------------------------------------------------------------------------------
  
  recentlyUpdatedContainer: {
    marginVertical: 20,
    backgroundColor: '#000', // Matches your homepage theme
  },
  recentlyUpdatedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  recentlyUpdatedTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
  },
  recentlyUpdatedSeeAll: {
    fontSize: 14,
    color: '#1E90FF',
    fontWeight: '600',
  },
  recentlyUpdatedCarousel: {
    paddingHorizontal: 10,
    // paddingVertical: 20,
    backgroundColor: "#000000",
    // marginTop: 10,
  },
  recentlyUpdatedSlide: {
    width: screenWidth - 32, // Keeps spacing consistent with paddingHorizontal
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#333',
    alignSelf: 'center',
    marginHorizontal: 10,
  },
  recentlyUpdatedCarousel2Image: {
    width: '100%',
    height: 120,
  },
  recentlyUpdatedNewBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'red',
    color: '#FFF',
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    fontWeight: 'bold',
  },
  recentlyUpdatedTextContainer: {
    padding: 10,
  },
  recentlyUpdatedCategory: {
    fontSize: 12,
    color: '#999',
    marginBottom: 5,
  },
  recentlyUpdatedEntryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
  recentlyUpdatedEntryDetails: {
    fontSize: 12,
    color: '#CCC',
  },

  // -----------------------------------------------------------------------------------------------------

  storyContainer: {
    marginVertical: 20,

    backgroundColor: '#000', // Matches your homepage theme
  },
  storyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  storyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
  },
  storySeeAll: {
    fontSize: 14,
    color: '#1E90FF',
    fontWeight: '600',
  },
  storyCarousel: {
    paddingHorizontal: 10,
    // paddingVertical: 20,
    backgroundColor: "#000000",
    // marginTop: 10,
  },
  storySlide: {
    width: (screenWidth/2), // Keeps spacing consistent with paddingHorizontal
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#333',
    alignSelf: 'center',
    marginHorizontal: 10,
  },
  storyCarousel2Image: {
    width: '100%',
    height: 120,
  },
  storyNewBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'red',
    color: '#FFF',
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    fontWeight: 'bold',
  },
  storyTextContainer: {
    padding: 10,
  },
  storyCategory: {
    fontSize: 12,
    color: '#999',
    marginBottom: 5,
  },
  storyEntryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
  storyEntryDetails: {
    fontSize: 12,
    color: '#CCC',
  },
// --------------------------------------------------------------------------------------------------------------------------------------------------
  noiseContainer: {
    // backgroundColor: '#0d1117', // Dark background
    flex: 1,
    paddingVertical: 16,
  },
  noiseHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  noiseHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  noiseSeeAll: {
    fontSize: 14,
    color: '#58a6ff',
  },
  noiseListContainer: {
    paddingHorizontal: 16,
  },
  noiseItemContainer: {
    width: 140, // Adjust width for each column
    marginRight: 16,
  },
  noiseCard: {
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#161b22', // Dark card background
    borderRadius: 50, // Circular effect
    padding: 16,
    width: 100, // Circular size
    height: 100, // Circular size
    alignSelf: 'center',
  },
  noiseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '#1a1a1a', // Dark card background
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  noiseIcon: {
    fontSize: 24, // Adjust the icon size
    color: '#fff',
    marginRight: 12,
    backgroundColor: '#2b2b2b',
    padding: 8,
    borderRadius: 50,
  },
  noiseTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  noiseCategory: {
    color: '#aaa',
    fontSize: 12,
  },
  buttonPlayer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#58a6ff',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    right: 50,
  },
  buttonPlayerIcon: {
    fontSize: 24,
    color: '#fff',
    }

});

export default HomePage;
