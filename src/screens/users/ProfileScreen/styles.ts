import { StyleSheet } from "react-native";
import { stylizedTitleMedium } from "styles/typography/stylized";
import {
  defaultParagraphMedium,
  defaultParagraphSmall,
} from "styles/typography/default";
import { theme } from "@ribon.io/shared/styles";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: theme.colors.neutral10,
    minHeight: "100%",
  },
  itemContainer: {
    width: "33%",
    alignItems: "center",
  },
  listContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 200,
  },
  userContainer: {
    width: "100%",
    height: 150,
    backgroundColor: "#ECF0F1",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    padding: 20,
    marginBottom: 20,
  },
  userAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    ...stylizedTitleMedium,
  },
  userEmail: {
    ...defaultParagraphMedium,
    color: theme.colors.gray30,
  },
  userPoints: {
    ...defaultParagraphMedium,
    color: theme.colors.gray30,
  },
  badgesContainer: {
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  badgeContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  badgeRoundContainer: {
    width: 90,
    height: 90,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.gray10,
  },
  badgeImage: {
    width: 55,
    height: 55,
    resizeMode: "contain",
  },
  badgeText: {
    ...defaultParagraphSmall,
    marginTop: 4,
    color: theme.colors.gray30,
    fontSize: 12,
  },
});

export default styles;
