import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import {defaultBodyLgBold, defaultBodySmRegular} from "styles/typography/default";

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: theme.colors.brand.primary[300],
  },
  BadgesContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: theme.colors.neutral10,
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 15,
  },
  BadgeContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 35,
  },
  InfoContainer: {
    padding: 15,
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  BadgeImage: {
    height: 60,
    width: 60,
    borderRadius: 70,
    resizeMode: "contain",
  },
  BadgeCard: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderRadius: 50,
    width: 80,
    height: 80,
  },
  BadgeText: {
    textAlign: "center",
    fontSize: 14,
    marginTop: 4,
  },
  BadgeCategory: {
    fontWeight: "bold",
    marginBottom: 35,
    fontSize: 12,
  },
  Title: {
    ...defaultBodyLgBold,
    fontSize: 28,
    color: theme.colors.neutral10,
    textAlign: "center",
  },
  Subtitle: {
    ...defaultBodySmRegular,
    color: theme.colors.neutral10,
    textAlign: "center",
    width: 50,
  },
});

export default styles;
