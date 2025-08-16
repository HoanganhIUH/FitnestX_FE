import React from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import OnboardingItem from "../components/OnboardingItem";
import { BUTTONS, COLORS, FONTS, SIZES, SPACING } from "../styles/commonStyles";

const slides = [
  {
    id: 1,
    title: "Track Your Goal",
    description: "Don't worry if you have trouble determining your goals. We can help you determine and track them.",
    image: require("../assets/images/Frame.png"),
  },
  {
    id: 2,
    title: "Get Burn",
    description: "Let's keep burning to achieve your goals. It's temporary pain for a lifetime of gain.",
    image: require("../assets/images/Frame(1).png"),
  },
  {
    id: 3,
    title: "Eat Well",
    description: "Start a healthy lifestyle with us. We can help you determine your diet every day.",
    image: require("../assets/images/Frame(2).png"),
  },
];

export default function OnboardingScreen({ navigation }) {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const renderItem = ({ item }) => (
    <OnboardingItem item={item} />
  );

  const onViewableItemsChanged = React.useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = React.useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  return (
    <View style={styles.container}>
      <FlatList
        data={slides}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />

      {/* Pagination Dots */}
      <View style={styles.paginationContainer}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === currentIndex && styles.activeDot,
            ]}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={() => navigation.replace("Auth")}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  dot: {
    backgroundColor: "#ccc",
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: SPACING.xs,
  },
  activeDot: {
    backgroundColor: COLORS.primary,
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: SPACING.xs,
  },
  button: {
    ...BUTTONS.primary,
    marginHorizontal: SIZES.width * 0.2,
    marginBottom: SPACING.xl,
  },
  buttonText: {
    color: COLORS.white,
    textAlign: "center",
    fontWeight: FONTS.bold,
    fontSize: SIZES.body2,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.l,
  },
});
