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
 * @param {string} key - The key to translate.
 * @param {Object} params - Parameters to interpolate in the translated string.
 * @returns {string} The translated string.
 */
    getTranslation(key: string, params?: {
        [key: string]: string | number;
    }): string;
}
export declare const lang: LanguageManager;
