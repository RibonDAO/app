import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { RootStackScreenProps } from "types";
import { useDonations, useUsers } from "@ribon.io/shared/hooks";
import { RIBON_INTEGRATION_ID } from "utils/constants/Application";
import { useCurrentUser } from "contexts/currentUserContext";
import Button from "components/atomics/Button";
import { showToast } from "lib/Toast";
import { isValidEmail } from "lib/validators/email";
import * as S from "screens/donations/DonateModal/styles";
import { LinearGradient } from "expo-linear-gradient";

export default function DonateModal({
  route,
  navigation,
}: RootStackScreenProps<"DonateModal">) {
  const [isDonating, setIsDonating] = useState(false);
  const [invalidInput, setInvalidInput] = useState(false);
  const { nonProfit } = route.params;
  const { findOrCreateUser } = useUsers();
  const { setCurrentUser, currentUser } = useCurrentUser();
  const [email, setEmail] = useState(currentUser?.email || "");
  const { donate } = useDonations(currentUser?.id);

  useEffect(() => {
    if (isValidEmail(email)) {
      setInvalidInput(false);
    } else {
      setInvalidInput(true);
    }
  }, [email]);

  function handleButtonPress() {
    if (!isValidEmail(email)) {
      setIsDonating(false);
    } else {
      setIsDonating(true);
    }
  }

  async function donateCallback() {
    if (email) {
      try {
        const user = await findOrCreateUser(email);
        setCurrentUser(user);
        await donate(RIBON_INTEGRATION_ID, nonProfit.id, email);
        navigation.pop();
        setTimeout(() => {
          navigation.navigate("DonationDonePage", { nonProfit });
        }, 500);
      } catch (error: any) {
        navigation.pop();
        showToast(error.response.data.formatted_message);
      } finally {
        setIsDonating(false);
      }
    }
  }

  const handleTextChange = (text: string) => {
    setEmail(text);
  };

  return (
    <S.ModalWrapper>
      <S.NonProfitContainer>
        <S.NonProfitText>
          You are donating to {"\n"}
          <S.NonProfitHighlight>{nonProfit.name}</S.NonProfitHighlight>
        </S.NonProfitText>
        <S.Logo source={{ uri: nonProfit.mainImage }} />
        <LinearGradient
          colors={["rgb(0, 218, 147)", "transparent"]}
          start={[0.0, 0.5]}
          end={[1.0, 0.5]}
          locations={[0.0, 1.0]}
          style={S.inline.gradient}
        />
      </S.NonProfitContainer>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <S.Container>
            <S.InputEmailContainer>
              <S.Description>
                Hey! It looks like you're donating for the first time. Enter
                your email address to proceed.
              </S.Description>

              <S.Title>Place your e-mail to donate</S.Title>
              <S.Input
                placeholder="Place your email"
                keyboardType="email-address"
                onChangeText={handleTextChange}
                value={email}
                autoCapitalize="none"
                textContentType="emailAddress"
                error={invalidInput}
                autoFocus
              />
              <S.InputHint error={invalidInput}>
                {invalidInput
                  ? "Please enter a valid email address"
                  : "All your data is safe with us"}
              </S.InputHint>
            </S.InputEmailContainer>

            <S.ButtonContainer>
              <Button
                text={isDonating ? "Donating..." : "Donate"}
                onPress={handleButtonPress}
                timeout={isValidEmail(email) ? 2000 : null}
                timeoutCallback={donateCallback}
                disabled={isDonating}
              />
            </S.ButtonContainer>
          </S.Container>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      <S.Footer>
        <S.FooterText>(c) Ribon {new Date().getFullYear()}</S.FooterText>
      </S.Footer>
    </S.ModalWrapper>
  );
}
