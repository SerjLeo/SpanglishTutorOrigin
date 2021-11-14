package helpers

func LangVocabulary(lang string) string {
	langs := map[string]string{
		"eng":"Английский",
		"esp":"Испанский",
		"both":"Оба",
	}
	result, ok := langs[lang]
	if !ok {
		return lang
	}
	return result
}