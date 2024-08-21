export declare class LanguageManager {
    private translations;
    private currentLanguage;
    /**
     * Set the current language.
     * @param {string} langCode - The language code to set.
     */
    setCurrentLanguage(langCode: string): void;
    /**
     * get the current language.
     */
    getCurrentLanguage(): string;
    /**
     * Add translations for a specific language.
     * @param {string} lang - The language code.
     * @param {Translations} translations - The translations to add.
     */
    addTranslations(lang: string, translations: {
        [key: string]: string;
    }): void;
    /**
 * Get the translation for a key in the current language.
 * If the translation key is not found, the default message will be returned.
 * If a parameter is not found, the placeholder will be used as the default value and a warning will be logged.
 * @param {string} key - The key to translate.
 * @param {Object} [params] - Parameters to interpolate in the translated string.
 * @param {string} [defaultMessage] - The default message to use if the translation is not found.
 * @returns {string} The translated string, or the default message if the translation is not found.
 */
    getTranslation(key: string, params?: {
        [key: string]: string | number;
    }, defaultMessage?: string): string;
}
export declare const lang: LanguageManager;
