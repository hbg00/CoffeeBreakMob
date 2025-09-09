import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';

import { colors, radius, spacingX, spacingY } from '@/constants/theme';

import Typo from '@/components/Shared/Typo'
import { Image } from 'expo-image';
import * as Icons from 'phosphor-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/authContext';
import ScreenWrapper from '@/components/Shared/ScreenWrapper';
import { verticalScale } from '@/utils/screenScale';
import { accountOptionType } from '@/constants/types/profileTypes';

const Profile = () => {
  const{ user } = useAuth();
  const router = useRouter();
  
  const accountOptions: accountOptionType[] = [
    {
      title: "Edit Profile",
      icon: <Icons.UserIcon size={26} color={colors.white} weight="fill" />,
      routeName: "/(modals)/profileModal",
      bgColor: colors.orange,
    },
    {
      title: "Settings",
      icon: <Icons.GearSixIcon size={26} color={colors.white} weight="fill" />,
      bgColor: colors.orange,
    },
    {
      title: "Logout",
      icon: <Icons.PowerIcon size={26} color={colors.white} weight="fill" />,
      bgColor: colors.orange,
    },
  ];

  const handleLogout = async () => {
    // Handle sign out
    router.push("/(auth)/login")
  };

  const showLogoutAlert = () => {
    Alert.alert("Confirm Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        onPress: () => console.log("Logout cancelled"),
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: async () => {
          handleLogout();
        },
        style: "destructive",
      },
    ]);
  };
    
  const handlePress = async (item: accountOptionType) => {
    if(item.title === "Logout"){
      showLogoutAlert();
    }

    if(item.routeName) router.push(item.routeName);
  };


  return (
    <ScreenWrapper>
      <View style={styles.constainer}>
        <View style={styles.userInfo}>

          <View>
            <Image 
              source={require("../../assets/images/tempProfile.png")}
              style={styles.avatar} 
              contentFit="cover" 
              transition={100} 
            />
          </View>

          <View style={styles.nameContainer}>
            <Typo size={24} fontWeight={'600'} color={colors.white}>
              {user?.name}
            </Typo>

            <Typo size={15} color={colors.white}>
              {user?.email}
            </Typo>
          </View>
        </View>

        <View style={styles.accountOptions}>
          {
            accountOptions.map((item, index) => {
              return (
                <Animated.View 
                  key={index.toString()}
                  entering={FadeInDown.delay(index * 50)
                    .springify()
                    .damping(14)}
                  style={styles.listItem}
                >
                  <TouchableOpacity style={styles.flexRow} onPress={() => handlePress(item)}>
                    <View
                      style={[
                        styles.listIcon,
                        { 
                          backgroundColor: item?.bgColor 
                        },
                      ]}
                    >
                      {item.icon && item.icon}
                    </View>
                    <Typo size={16} style ={{ flex: 1 }} fontWeight={'500'}>
                      {item.title}
                    </Typo>
                    <Icons.CaretRightIcon
                      size={verticalScale(20)} 
                      color={colors.white} 
                      weight="bold"
                      />
                  </TouchableOpacity>
                </Animated.View>
              );
            })}
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Profile;

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    paddingHorizontal: spacingX._20,
  },
  userInfo: {
    marginTop: verticalScale(30),
    alignItems: "center"
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
  },
  editIcon: {
    position: "absolute",
    bottom: 5,
    right: 8,
    borderRadius: 50,
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
    padding: 5,
  },
  nameContainer: {
    gap: verticalScale(4),
    alignItems: "center",
  },
  listIcon:{
    height: verticalScale(44),
    width: verticalScale(44),
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius._15,
    borderCurve: "continuous"
  },
  listItem: {
    marginBottom: verticalScale(17),
  },
  accountOptions: {
    marginTop: spacingY._35,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacingX._10,
  },
});