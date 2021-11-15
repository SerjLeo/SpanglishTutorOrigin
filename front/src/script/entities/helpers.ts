import {availableLanguage} from "../types";
import {isAvailableLang} from "./typeGuards";

export function languageVocabulary(lang: string): string {
    const vocabulary: Record<availableLanguage, string> = {
        eng: 'Английский язык',
        esp: 'Испанский язык',
        both: 'Испанский и английский языки',
    }
    return isAvailableLang(lang) ? vocabulary[lang] : lang;
}
