import { Pressable, StyleSheet, View } from 'react-native';
import React, { useRef }from 'react';
import { useRouter } from 'expo-router';

import { colors, spacingX, spacingY } from '@/constants/theme';
import { verticalScale } from '@/utils/screenScale';
import *  as Icons from "phosphor-react-native";

import Button from '@/components/Shared/Button';
import BackButton from '@/components/Shared/BackButton';
import Typo from '@/components/ComponentsUtils/Typo';
import Input from '@/components/Shared/Input';
import ScreenWrapper from '@/components/ComponentsUtils/ScreenWrapper';

const Register = () => {
  const emailRef =  useRef("");
  const passwordRef = useRef("");
  const nameRef = useRef("");
  const surnameRef = useRef("");
  const phoneNumberRef = useRef("");

  const router = useRouter();
  
  const handleRegisterEmail =  async () => {
    // TODO: Login with email and password
    console.log("Registered & Login with email");
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <BackButton iconSize={28}/>

        <View style={{gap: 5, marginTop: spacingY._20}}>
          <Typo size={30} fontWeight={"800"} color={colors.darkCoffee}>
            Ready To Join Us?
          </Typo>
          <Typo size={28} color={colors.coffee} fontWeight={"800"}>
            Be ready for free coffee!
          </Typo>
        </View>

        {/* form */}
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
            secureTextEntry
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
            secureTextEntry
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
            placeholder='Enter your phone number without "+" sign'
            secureTextEntry
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

          <Button onPress={handleRegisterEmail} style={{marginTop:20}}>
            <Typo fontWeight={"700"} color={colors.white} size={21} >
              Sign up
            </Typo>
          </Button>
        </View>

        {/* footer */}
        <View style={styles.footer}>
            <Typo size={15} color={colors.coffee}> Already have an account ? </Typo>
            <Pressable onPress={() => router.push("/(auth)/welcome")}>
              <Typo fontWeight={"700"} color={colors.darkCoffee} size={15} >
                Sign In
              </Typo>
            </Pressable>
        </View>


      </View>
    </ScreenWrapper>
  )
}

export default Register;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: spacingY._30,
        paddingHorizontal: spacingX._20
    },
    welcomeText: {
        fontSize: verticalScale(20),
        fontWeight: "bold",
        color: colors.white,
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
    footerText: {
        textAlign: "center",
        color: colors.white,
        fontSize: verticalScale(15),
    },
});