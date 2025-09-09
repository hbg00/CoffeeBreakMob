import { Alert, Pressable, StyleSheet, View } from 'react-native';
import React, { useRef, useState } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/authContext';

import { colors, spacingX, spacingY } from '@/constants/theme';
import { verticalScale } from '@/utils/screenScale';
import * as Icons from "phosphor-react-native";

import Button from '@/components/Shared/Button';
import BackButton from '@/components/Shared/BackButton';
import Typo from '@/components/ComponentsUtils/Typo';
import Input from '@/components/Shared/Input';
import ScreenWrapper from '@/components/ComponentsUtils/ScreenWrapper';

const Register = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { register: registerWithEmail } = useAuth();

  const emailRef = useRef("");
  const passwordRef = useRef("");
  const nameRef = useRef("");
  const surnameRef = useRef("");
  const phoneNumberRef = useRef("");

  const handleRegisterEmail = async () => {
    setIsLoading(true);

    const res = await registerWithEmail(
      emailRef.current,
      passwordRef.current,
      nameRef.current,
      surnameRef.current,
      phoneNumberRef.current
    );

    setIsLoading(false);

    if (!res.success) {
      Alert.alert('Register', res.msg);
      return;
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <BackButton iconSize={28} />

        <View style={{ gap: 5, marginTop: spacingY._20 }}>
          <Typo size={30} fontWeight={"800"} color={colors.darkCoffee}>
            Ready To Join Us?
          </Typo>
          <Typo size={28} color={colors.coffee} fontWeight={"800"}>
            Be ready for free coffee!
          </Typo>
        </View>

        <View style={styles.form}>
          <Input
            placeholder="Enter your email"
            onChangeText={(value) => (emailRef.current = value)}
            icon={
              <Icons.AtIcon
                size={verticalScale(26)}
                color={colors.darkCoffee}
                weight="fill"
              />
            }
          />

          <Input
            placeholder="Enter your Name"
            onChangeText={(value) => (nameRef.current = value)}
            icon={
              <Icons.PersonIcon
                size={verticalScale(26)}
                color={colors.darkCoffee}
                weight="fill"
              />
            }
          />

          <Input
            placeholder="Enter your Surname"
            onChangeText={(value) => (surnameRef.current = value)}
            icon={
              <Icons.PersonIcon
                size={verticalScale(26)}
                color={colors.darkCoffee}
                weight="fill"
              />
            }
          />

          <Input
            placeholder='Enter your phone number'
            onChangeText={(value) => (phoneNumberRef.current = value)}
            icon={
              <Icons.PhoneCallIcon
                size={verticalScale(26)}
                color={colors.darkCoffee}
                weight="fill"
              />
            }
          />

          <Input
            placeholder="Enter your password"
            secureTextEntry
            onChangeText={(value) => (passwordRef.current = value)}
            icon={
              <Icons.LockIcon
                size={verticalScale(26)}
                color={colors.darkCoffee}
                weight="fill"
              />
            }
          />

          <Button onPress={handleRegisterEmail} style={{ marginTop: 20 }} loading={isLoading}>
            <Typo fontWeight={"700"} color={colors.white} size={21}>
              Sign up
            </Typo>
          </Button>
        </View>

        <View style={styles.footer}>
          <Typo size={15} color={colors.coffee}> Already have an account ? </Typo>
          <Pressable onPress={() => router.push("/(auth)/login")}>
            <Typo fontWeight={"700"} color={colors.darkCoffee} size={15}>
              Sign In
            </Typo>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacingY._30,
    paddingHorizontal: spacingX._20
  },
  form: {
    gap: spacingY._20,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
});
