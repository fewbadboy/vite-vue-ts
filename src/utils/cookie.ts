import Cookie from 'js-cookie'

const tokenName = 'User'

export function getCookie() {
  return Cookie.get(tokenName)
}

export function setCookie(value: string) {
  Cookie.set(tokenName, value, { expires: 1 / (24 * 6) }) // 10 min
}

export function removeCookie() {
  Cookie.remove(tokenName)
}
