import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing, borderRadius, fontSize, fontWeight } from '@/core/styles/theme';

interface ConfirmDialogProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export function ConfirmLogoutDialog({
  visible,
  onCancel,
  onConfirm,
}: ConfirmDialogProps) {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Title */}
          <Text
            style={[
              styles.title,
              { textAlign: 'left' },
            ]}
          >
            {t('auth.logout')}
          </Text>

          {/* Message */}
          <Text
            style={[
              styles.message,
              { textAlign: 'left' },
            ]}
          >
            {t('auth.logoutConfirm')}
          </Text>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Buttons */}
          <View
            style={[
              styles.buttonRow,
              { flexDirection:'row' },
            ]}
          >
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onCancel}
              activeOpacity={0.7}
            >
              <Text style={styles.cancelText}>
                {t('common.cancel')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.confirmButton}
              onPress={onConfirm}
              activeOpacity={0.8}
            >
              <Text style={styles.confirmText}>
                {t('auth.logout')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.45)',
      justifyContent: 'center',
      paddingHorizontal: spacing.lg,
    },
    container: {
      backgroundColor: colors.card,
      borderRadius: borderRadius.xl,
      padding: spacing.xl,
      elevation: 10,
      shadowColor: '#000',
      shadowOpacity: 0.15,
      shadowRadius: 20,
      shadowOffset: { width: 0, height: 10 },
    },
    title: {
      fontSize: fontSize.lg,
      fontWeight: fontWeight.semibold,
      color: colors.foreground,
      marginBottom: spacing.sm,
    },
    message: {
      fontSize: fontSize.base,
      color: colors.mutedForeground,
      lineHeight: 22,
      marginBottom: spacing.lg,
    },
    divider: {
      height: 1,
      backgroundColor: colors.border,
      marginBottom: spacing.lg,
    },
    buttonRow: {
      justifyContent: 'space-between',
      gap: 5
    },
    cancelButton: {
      flex: 1,
      paddingVertical: spacing.md,
      borderRadius: borderRadius.lg,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: 'center',
      marginRight: spacing.sm,
    },
    confirmButton: {
      flex: 1,
      paddingVertical: spacing.md,
      borderRadius: borderRadius.lg,
      backgroundColor: colors.destructive,
      alignItems: 'center',
      marginLeft: spacing.sm,
    },
    cancelText: {
      fontSize: fontSize.base,
      fontWeight: fontWeight.medium,
      color: colors.foreground,
    },
    confirmText: {
      fontSize: fontSize.base,
      fontWeight: fontWeight.medium,
      color: '#fff',
    },
  });
  