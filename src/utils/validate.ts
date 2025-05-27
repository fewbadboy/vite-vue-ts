/**
 * 验证是否为合法的手机号码
 * 支持格式：
 * - 3-4 位区号，7-8 位本地号码（如：010-12345678）
 * - 11 位手机号码（如：13812345678）
 * @param {string} phone
 * @returns {Boolean}
 */
export function validPhone(phone: string): boolean {
  const reg = /^(\d{3}-\d{8}|\d{4}-\{7,8}|\d{11})$/
  return reg.test(phone)
}

/**
 * 验证是否为合法的邮箱地址
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail(email: string): boolean {
  const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(email)
}

/**
 * 验证是否为合法的URL地址
 * 支持http、https、ftp协议
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL(url: string): boolean {
  const reg = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i
  return reg.test(url)
}

/**
 * 验证是否为合法的IP地址
 * 支持IPv4和IPv6格式
 * @param {string} ip
 * @returns {boolean}
 */
export function validateIP(ip: string): boolean {
  const ipv4 = /^(?=(\b|\D))((\d|([1-9]\d)|(1\d{1,2})|(2[0-4]\d)|(25[0-5]))\.){3}((\d)|([1-9]\d)|(\d{1,2})|(1\d{1,2})|(2[0-4]\d)|(25[0-5]))(?=(\b|\D))$/
  const ipv6 = /^([\\da-fA-F]{1,4}:){7}([\\da-fA-F]{1,4})$/
  return ipv4.test(ip.trim()) || ipv6.test(ip.trim())
}

/**
 * 验证是否为合法的端口号
 * 端口号范围为 0-65535
 * @param {number} port
 * @returns {boolean}
 */
export function validPort(port: number): boolean {
  return !isNaN(port) && port >= 0 && port <= 65535
}

/**
 * 验证是否为合法的字符串
 * 允许非空字符串，且不全是空格
 * @param {string} string
 * @returns {boolean}
 */
export function validSpace(string: string): boolean {
  const reg = /^(?!\s*$).+/
  return reg.test(string)
}

/**
 * 验证是否为正整数
 * 正整数是大于0的整数
 * @param {number} number
 * @returns {Boolean}
 */
export function validPositiveInteger(number: number): boolean {
  const reg = /^[1-9]\d*$/
  return reg.test(String(number))
}



