import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import { colors, spacingX, spacingY } from "@/constants/theme";

import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/authContext";
import BackButton from "@/components/Shared/BackButton";
import Typo from "@/components/Shared/Typo";
import Input from "@/components/Shared/Input";
import Modal from "@/components/Shared/Modal";
import Button from "@/components/Shared/Button";
import { UserType } from "@/constants/types/types";
import { verticalScale } from "@/utils/screenScale";
import * as Icons from "phosphor-react-native";

const ProfileModal = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState<UserType>({
    uid: "",
    email: "",
    name: "",
    surname: "",
    phoneNumber: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setUserData({
      uid: user?.uid || "",
      email: user?.email || null,
      name: user?.name || "",
      surname: user?.surname || "",
      phoneNumber: user?.phoneNumber || "",
    });
  }, [user]);

  const onSubmit = () => {
    const name = userData?.name ?? "";

    if (!name.trim()) {
      Alert.alert("User", "Name cannot be empty");
      return;
    }

    setIsLoading(true);

    console.log("Submitting profile data:", userData);

    setTimeout(() => {
      setIsLoading(false);
      console.log("User update success");
      router.back();
    }, 1000);
  };

  return (
    <Modal>
      <View style={styles.container}>
        <BackButton />

        <ScrollView contentContainerStyle={styles.form}>
          <View style={styles.avatarContainer}>
            <Image
              source={require("../../assets/images/tempProfile.png")}
              style={styles.avatar}
              contentFit="cover"
              transition={100}
            />
            <TouchableOpacity
              style={styles.editIcon}
              onPress={() => console.log("Change avatar pressed")}
            >
              <Icons.PencilSimpleLineIcon size={20} color={colors.black} />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Typo color={colors.white}>Name</Typo>
            <Input
              placeholder="Name"
              value={userData?.name ?? ""}
              onChangeText={(value: string) =>
                setUserData((prev) => ({ ...prev, name: value }))
              }
            />
          </View>

          <View style={styles.inputContainer}>
            <Typo color={colors.white}>Surname</Typo>
            <Input
              placeholder="Surname"
              value={userData.surname}
              onChangeText={(value: string) =>
                setUserData((prev) => ({ ...prev, surname: value }))
              }
            />
          </View>

          <View style={styles.inputContainer}>
            <Typo color={colors.white}>Phone Number</Typo>
            <Input
              placeholder="Phone Number"
              value={userData.phoneNumber}
              onChangeText={(value: string) =>
                setUserData((prev) => ({ ...prev, phoneNumber: value }))
              }
            />
          </View>
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <Button onPress={onSubmit} style={{ flex: 1 }} loading={isLoading}>
          <Typo color={colors.white} fontWeight="700">
            Update
          </Typo>
        </Button>
      </View>
    </Modal>
  );
};

export default ProfileModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: spacingX._20,
  },
  footer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: spacingX._20,
    marginBottom: spacingY._17,
  },
  form: {
    gap: spacingY._30,
    marginTop: spacingY._15,
  },
  avatarContainer: {
    position: "relative",
    alignSelf: "center",
  },
  avatar: {
    alignSelf: "center",
    backgroundColor: colors.white,
    height: verticalScale(135),
    width: verticalScale(135),
    borderRadius: 200,
    borderWidth: 1,
    borderColor: colors.white,
  },
  editIcon: {
    position: "absolute",
    bottom: spacingY._5,
    right: spacingX._7,
    borderRadius: 100,
    backgroundColor: colors.white,
    padding: spacingY._7,
    elevation: 4,
  },
  inputContainer: {
    gap: spacingY._10,
  },
});