/**
 * Language toggle hook.
 *
 * @module hooks/useLanguageToggle
 *
 * @remarks
 * Handles language switching with RTL support and automatic app restart.
 *
 * @example
 * ```typescript
 * const { currentLanguage, toggleLanguage } = useLanguageToggle();
 *
 * toggleLanguage(); // Switches between 'en' and 'ar' and restarts automatically
 * ```
 */

import { useCallback } from 'react';
import { I18nManager } from 'react-native';
import RNRestart from 'react-native-restart';
import { useTranslation } from 'react-i18next';
import { storageUtils, STORAGE_KEYS } from '@/common/utils/storage';

/**
 * Hook for handling language switching with RTL support.
 *
 * @returns Language state and toggle handler
 */
export function useLanguageToggle() {
  const { i18n } = useTranslation();

  /**
   * Gets the current language code.
   *
   * @returns Current language ('en' or 'ar')
   */
  const currentLanguage = i18n.language;

  /**
   * Toggles between English and Arabic with RTL support.
   *
   * @remarks
   * Automatically restarts the app to apply RTL changes.
   */
  const toggleLanguage = useCallback(() => {
    const newLang = currentLanguage === 'en' ? 'ar' : 'en';
    const isRTL = newLang === 'ar';

    // Update i18n
    i18n.changeLanguage(newLang);

    // Save to storage
    storageUtils.setString(STORAGE_KEYS.LOCALE, newLang);

    // Update RTL and restart automatically
    if (I18nManager.isRTL !== isRTL) {
      I18nManager.allowRTL(isRTL);
      I18nManager.forceRTL(isRTL);

      // Restart app automatically after a brief delay
      setTimeout(() => {
        RNRestart.restart();
      }, 100);
    }
  }, [currentLanguage, i18n]);

  return {
    currentLanguage,
    toggleLanguage,
  };
}
