import { Image, StyleSheet, Text, View } from "react-native";
import { COLORS, FONTS, SIZES, SPACING } from "../styles/commonStyles";

export default function OnboardingItem({ item }) {
  return (
    <View style={styles.container}>
      <Image source={item.image} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SIZES.width,
    height: SIZES.height * 0.9,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: SIZES.height * 0.05,
    paddingHorizontal: SPACING.l,
  },
  image: {
    width: SIZES.width * 0.9,
    height: SIZES.height * 0.5,
    marginBottom: SPACING.xl,
  },
  title: {
    fontSize: SIZES.title,
    fontWeight: FONTS.bold,
    marginBottom: SPACING.l,
    textAlign: "center",
    color: COLORS.black,
  },
  description: {
    fontSize: SIZES.body2,
    textAlign: "center",
    color: COLORS.gray,
    lineHeight: 24,
    paddingHorizontal: SPACING.m,
  },
});
