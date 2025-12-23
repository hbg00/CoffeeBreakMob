import React from "react";
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
import { DetailModalProps } from "@/constants/types/homeTypes";

const DetailModal = ({
  visible,
  product,
  onClose,
  onAddToCart,
}: DetailModalProps) => {
  if (!product) return null;

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Image
              source={product.imageSource ?? require("../../assets/images/coffee_temp.jpg")}
              style={styles.image}
            />

            <View style={styles.headerRow}>
              <Typo size={22} color={colors.darkCoffee} fontWeight="bold">
                {product.name}
              </Typo>
            </View>

            <View style={styles.tagsRow}>
              <View style={styles.tag}>
                <Typo size={12} color={colors.darkCoffee}>
                  {product.productType}
                </Typo>
              </View>
              <View style={styles.tag}>
                <Typo size={12} color={colors.darkCoffee}>
                  {product.categoryLabel}
                </Typo>
              </View>
            </View>

            <Typo
              size={16}
              color={colors.darkCoffee}
              fontWeight="bold"
              style={{ marginBottom: 5 }}
            >
              About
            </Typo>
            <Typo size={14} color={colors.black}>
              {product.description || "No description available."}
            </Typo>

            <TouchableOpacity
              style={styles.addButton}
              onPress={() => onAddToCart(product)}
            >
              <Typo size={16} color="white" fontWeight="bold">
                Add to basket
              </Typo>
              <Typo size={16} color="white" fontWeight="bold">
                {(product.price ?? 0).toFixed(2)} {product.currency}
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
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: colors.lightCream,
    borderRadius: radius._20,
    padding: spacingX._20,
    maxHeight: "80%",
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
