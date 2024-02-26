import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import PrivacyPolicyLayout from "components/moleculars/layouts/PrivacyPolicyLayout";
import GoogleLogin from "components/moleculars/buttons/GoogleLogin";
import MagicLinkLogin from "components/moleculars/buttons/MagicLinkLogin";
import AppleLogin from "components/moleculars/buttons/AppleLogin";
import UserAvatarIcon from "screens/auth/assets/UserAvatarIcon";
import S from "./styles";

export type Props = {
  title: string;
  description: string;
  onContinue: () => void;
  onContinueMagicLink: () => void;
};

function ValidateAccount({
  title,
  description,
  onContinue,
  onContinueMagicLink,
}: Props): JSX.Element {
  return (
    <KeyboardAvoidingView
      behavior="position"
      style={S.keyboardView}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -20}
    >
      <TouchableWithoutFeedback
        accessibilityRole="button"
        onPress={Keyboard.dismiss}
      >
        <ScrollView contentContainerStyle={S.container}>
          <View style={S.imageContainer}>
            <UserAvatarIcon />
          </View>
          <View style={S.contentContainer}>
            <Text style={S.title}>{title}</Text>
            <Text style={S.description}>{description}</Text>
            <GoogleLogin onContinue={onContinue} from="validation_flow" />
            {Platform.OS === "ios" && (
              <AppleLogin onContinue={onContinue} from="validation_flow" />
            )}
            <MagicLinkLogin
              onContinue={onContinueMagicLink}
              from="validation_flow"
            />
            <PrivacyPolicyLayout />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default ValidateAccount;
