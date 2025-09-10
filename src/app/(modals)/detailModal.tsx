import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Typo from "@/components/Shared/Typo";
import { colors, spacingX, spacingY, radius } from "@/constants/theme";
import { DetailModalProps } from "@/constants/types/profileTypes";

const DetailModal = ({
  visible,
  coffee,
  onClose,
  onAddToCart,
}: DetailModalProps) => {
  const [size, setSize] = useState("Small");

  if (!coffee) return null;

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Image
              source={require("../../assets/images/coffee_temp.jpg")}
              style={styles.image}
            />

            <View style={styles.headerRow}>
              <Typo size={22} color={colors.darkCoffee} fontWeight="bold">
                {coffee.name}
              </Typo>
            </View>

            <View style={styles.tagsRow}>
              <View style={styles.tag}>
                <Typo size={12} color={colors.darkCoffee}>
                  Coffee
                </Typo>
              </View>
              <View style={styles.tag}>
                <Typo size={12} color={colors.darkCoffee}>
                  Chocolate
                </Typo>
              </View>
              <View style={styles.tag}>
                <Typo size={12} color={colors.darkCoffee}>
                  Medium roasted
                </Typo>
              </View>
            </View>

            <Typo size={16} color={colors.darkCoffee} fontWeight="bold">
              Coffee Size
            </Typo>
            <View style={styles.sizeRow}>
              {["Small", "Medium", "Large"].map((s) => (
                <TouchableOpacity
                  key={s}
                  style={[
                    styles.sizeButton,
                    size === s && styles.activeSizeButton,
                  ]}
                  onPress={() => setSize(s)}
                >
                  <Typo
                    size={14}
                    color={size === s ? "white" : colors.darkCoffee}
                    fontWeight={size === s ? "bold" : "600"}
                  >
                    {s}
                  </Typo>
                </TouchableOpacity>
              ))}
            </View>

            <Typo size={16} color={colors.darkCoffee} fontWeight="bold">
              About
            </Typo>
            <Typo size={14} color={colors.black}>
              Cappuccino is the richest of all types of coffee and uses cream
              instead of milk as the primary ingredient along with double espresso
            </Typo>

            <TouchableOpacity
              style={styles.addButton}
              onPress={() => onAddToCart(coffee, size)}
            >
              <Typo size={16} color="white" fontWeight="bold">
                Add to basket
              </Typo>
              <Typo size={16} color="white" fontWeight="bold">
                ${coffee.price.toFixed(2)}
              </Typo>
            </TouchableOpacity>

            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <Typo size={14} color={colors.white}>
                Close
              </Typo>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default DetailModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: colors.lightCream,
    borderRadius: radius._20,
    padding: spacingX._20,
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: radius._20,
    marginBottom: spacingY._10,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tagsRow: {
    flexDirection: "row",
    gap: spacingX._10,
    marginVertical: spacingY._10,
  },
  tag: {
    backgroundColor: colors.carmel,
    paddingHorizontal: spacingX._7,
    paddingVertical: spacingY._5,
    borderRadius: radius._10,
  },
  sizeRow: {
    flexDirection: "row",
    gap: spacingX._10,
    marginVertical: spacingY._10,
  },
  sizeButton: {
    paddingHorizontal: spacingX._12,
    paddingVertical: spacingY._5,
    backgroundColor: colors.lightCream,
    borderRadius: radius._10,
    borderWidth: 1,
    borderColor: colors.coffee,
  },
  activeSizeButton: {
    backgroundColor: colors.darkCoffee,
    borderColor: colors.darkCoffee,
  },
  addButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.orange,
    paddingHorizontal: spacingX._20,
    paddingVertical: spacingY._12,
    borderRadius: radius._10,
    marginVertical: spacingY._15,
  },
  closeBtn: {
    backgroundColor: colors.darkCoffee,
    paddingVertical: spacingY._10,
    borderRadius: radius._10,
    alignItems: "center",
    marginBottom: spacingY._10,
  },
});
