import React from "react";
import {
  Modal,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { colors } from "../theme/colors";
import { typography } from "../theme/typography";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import PrimaryButton from "./PrimaryButton";

interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  confirmColor?: string;
}

const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  onClose,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  confirmColor = colors.primary,
}: CustomModalProps) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.message}>{message}</Text>
              
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
                  <Text style={styles.cancelText}>{cancelLabel}</Text>
                </TouchableOpacity>
                <PrimaryButton
                  title={confirmLabel}
                  onPress={onConfirm}
                  style={styles.confirmButton}
                  backgroundColor={confirmColor}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: wp("10%"),
  },
  modalContent: {
    width: "100%",
    backgroundColor: colors.white,
    borderRadius: hp("3%"),
    padding: wp("6%"),
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: hp("0.5%") },
    shadowOpacity: 0.1,
    shadowRadius: hp("1.2%"),
    elevation: 5,
  },
  title: {
    ...typography.h2,
    textAlign: "center",
    marginBottom: hp("1%"),
  },
  message: {
    ...typography.bodyMedium,
    textAlign: "center",
    color: colors.textSecondary,
    marginBottom: hp("3%"),
  },
  buttonContainer: {
    flexDirection: "row",
    gap: wp("4%"),
    width: "100%",
  },
  cancelButton: {
    flex: 1,
    height: hp("6%"),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: hp("1.5%"),
    borderWidth: 1,
    borderColor: colors.border,
  },
  cancelText: {
    ...typography.bodyLarge,
    color: colors.textPrimary,
  },
  confirmButton: {
    flex: 1,
    height: hp("6%"),
  },
});

export default CustomModal;
