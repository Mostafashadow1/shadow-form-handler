
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
   * @param {string} key - The key to translate.
   * @param {Object} params - Parameters to interpolate in the translated string.
   * @returns {string} The translated string.
   */
    public getTranslation(key: string, params: { [key: string]: string | number } = {}): string {
      const translation = this.translations[this.currentLanguage]?.[key] || key;      
      return translation.replace(/{(\w+)}/g, (match : string, paramKey : string) => {
        return params[paramKey]?.toString() || match
      }
      );
    }
}
  // Create and export a singleton instance
export const lang = new LanguageManager();