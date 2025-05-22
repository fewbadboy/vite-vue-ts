import { nextTick } from 'vue';
import { createI18n } from 'vue-i18n'

console.log(navigator.language)
console.log(navigator.languages);

export const Support_Langs = [
  'zh',
  'en',
]

export const Support_Langs_Options = [
  {
    label: '简体中文',
    value: 'zh',
  },
  {
    label: 'English',
    value: 'en',
  }
]

const i18n = createI18n({
  datetimeFormats: {
    zh: {
      short: {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      },
      long: {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }
    },
    en: {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      },
      long: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        weekday: 'long',
        hour: 'numeric',
        minute: 'numeric',
      }
    }
  },
  numberFormats : {
    zh: {
      currency: {
        style: 'currency',
        currency: 'CNY',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      },
      decimal: {
        style: 'decimal',
        useGrouping: false,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      },
      percent: {
        style: 'percent',
        minimumFractionDigits: 2,
      }
    },
    en: {
      currency: {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      },
      decimal: {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      },
      percent: {
        style: 'percent',
        minimumFractionDigits: 2,
      }
    }
  },
  legacy: false,
  locale: 'zh',
  fallbackLocale: 'zh',
  messages: {
    zh: {
      message: {
        hello: '你好， {name}'
      }
    },
    en: {
      message: {
        hello: 'Hello, {name}'
      }
    }
  }
})

export function setI18nLanguage(lang: 'zh' | 'en') {
  i18n.global.locale.value = lang
  document.documentElement.setAttribute('lang', lang)
}

export async function loadLocaleMessages(lang: string) {
  const messages = await import(`./lang/${lang}.ts`)
  i18n.global.setLocaleMessage(lang, messages.default)
  return nextTick()
}

export function getI18nLanguage() {
  return i18n.global.locale.value
}

export default i18n