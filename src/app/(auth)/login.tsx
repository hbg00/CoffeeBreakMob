import { Alert, Pressable, StyleSheet, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { useRouter } from 'expo-router'
import { useAuth } from '@/context/authContext'

import { colors, spacingX, spacingY } from '@/constants/theme'
import { verticalScale } from '@/utils/screenScale'
import *  as Icons from "phosphor-react-native";

import Typo from '@/components/ComponentsUtils/Typo'
import Button from '@/components/Shared/Button'
import BackButton from '@/components/Shared/BackButton'
import Input from '@/components/Shared/Input'
import ScreenWrapper from '@/components/ComponentsUtils/ScreenWrapper'


const Login = () => {
  const router = useRouter();
  const emailRef =  useRef("");
  const passwordRef = useRef("");
  const [isLoading, setIsLoading] = useState(false);
  const{login: loginEmail, loginWithGoogle: loginOAuth} = useAuth();


  const handleLoginEmail =  async () => {
    // TODO: Logic with email and password
    setIsLoading(true);
    
    const res = await loginEmail(emailRef.current, passwordRef.current);
    
    setIsLoading(false);
    
    if(!res.success){
      Alert.alert('Login', res.msg);
      return;
    }
  };

  const handleLoginGoogle = async () => {
    // TODO: Logic with OAuth Google
    setIsLoading(true);
    
    const res = await loginOAuth();
    
    setIsLoading(false);
    
    if(!res.success){
      Alert.alert('Login', res.msg);
      return;
    }
  }


  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <BackButton iconSize={28}/>
        
        <View style={{gap: 5, marginTop: spacingY._20}}>
          <Typo size={30} color={colors.darkCoffee} fontWeight={"800"}>
            Hey
          </Typo>
          <Typo size={28} color={colors.coffee} fontWeight={"800"}>
            Welcome Back
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

          <Button onPress={handleLoginEmail} style={{marginTop:20}}>
            <Typo fontWeight={"700"} color={colors.white} size={21} >
              Login
            </Typo>
          </Button>
            
          <Button onPress={handleLoginGoogle}>
            <Typo fontWeight={"700"} color={colors.white} size={21} >
              Register and Login with Google
            </Typo>
          </Button>
        </View>

        <View style={styles.footer}>
            <Typo size={15} fontWeight={"700"} color={colors.coffee}> 
              Don&apos;t have an account ? 
            </Typo>
            <Pressable onPress={() => router.push("/(auth)/register")}>
              <Typo fontWeight={"700"} color={colors.darkCoffee} size={15} >
                Sing Up
              </Typo>
            </Pressable>
        </View>

      </View>
    </ScreenWrapper>
  )
}

export default Login

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
        fontSize: verticalScale(15),
    },
})