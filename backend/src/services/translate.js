const fallbackLang = 'en';

export function translateField(entity, field, lang = fallbackLang) {
  const fieldName = `${field}_${lang}`;
  if (entity[fieldName]) {
    return entity[fieldName];
  }
  return entity[`${field}_${fallbackLang}`] || entity[field] || '';
}

export function withTranslations(entity, lang = fallbackLang, keys = []) {
  const translated = { ...entity };
  keys.forEach((key) => {
    translated[key] = translateField(entity, key, lang);
  });
  return translated;
}
