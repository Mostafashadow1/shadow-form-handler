
  export class LanguageManager {
    private translations  : any = {};
    private currentLanguage: string = 'en';
  
    /**
     * Set the current language.
     * @param {string} langCode - The language code to set.
     */
    public setCurrentLanguage(langCode : string) {
      this.currentLanguage = langCode; 
    }

    /**
     * get the current language.
     */
    public getCurrentLanguage() : string {
      return this.currentLanguage;
    }
  
    /**
     * Add translations for a specific language.
     * @param {string} lang - The language code.
     * @param {Translations} translations - The translations to add.
     */
   
    public addTranslations(lang: string, translations: { [key: string]: string; }): void {
      this.translations[lang] = { ...this.translations[lang], ...translations };
    }
 
    /**
 * Get the translation for a key in the current language.
 * If the translation key is not found, the default message will be returned.
 * If a parameter is not found, the placeholder will be used as the default value and a warning will be logged.
 * @param {string} key - The key to translate.
 * @param {Object} [params] - Parameters to interpolate in the translated string.
 * @param {string} [defaultMessage] - The default message to use if the translation is not found.
 * @returns {string} The translated string, or the default message if the translation is not found.
 */
public getTranslation(key: string, params: { [key: string]: string | number } = {}, defaultMessage?: string): string {
  const translation = this.translations[this.currentLanguage]?.[key];

  if (translation) {
    return translation.replace(/{(\w+)}/g, (match: string, paramKey: string) => {
      const paramValue = params[paramKey];
      if (paramValue !== undefined) {
        return paramValue.toString();
      } else {
        return match;
      }
    });
  } else {
    return defaultMessage || key;
  }
}
}
  // Create and export a singleton instance
export const lang = new LanguageManager();