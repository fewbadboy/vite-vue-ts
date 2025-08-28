import { dayjs } from './extend'
import type { EulerAngles, Quaternion } from '@/global'

/**
 * 格式化数字
 * @param params
 * @returns
 */
export function parseNumber(params: number) {
  return new Intl.NumberFormat().format(params)
}

/**
 * 格式化时间戳或 Date 对象为字符串
 * @param {number | Date} date 时间戳或 Date 对象
 * @description 将时间戳或 Date 对象转换为格式化的字符串
 * @returns string 格式化后的时间字符串，格式为 'YYYY-MM-DD HH:mm:ss'
 */
export function parseDate(
  date: number | Date,
  template = 'YYYY-MM-DD HH:mm:ss',
): string {
  return dayjs(date).format(template)
}

/**
 * 将时间戳或 Date 对象转换为相对时间字符串
 * @param {number | Date} date 时间戳或 Date 对象
 * @description 将时间戳或 Date 对象转换为相对时间字符串，例如 "2 hours ago"
 * @returns string 相对时间字符串
 */
export function fromNow(date: number | Date): string {
  return dayjs(date).fromNow()
}

/**
 * 计算字符串的字节长度
 * @param {string} str 字符串
 * @description 计算字符串的字节长度，适用于 utf-8 编码
 * @returns {number} 字节长度
 */
export function byteLength(str: string): number {
  return new Blob([str]).size
}

/**
 * 加载图片
 * @param url
 * @returns
 */
export async function loadImage(url: string) {
  return await new Promise((resolve, reject) => {
    const img = new Image()
    img.src = url
    Object.assign(img, {
      onload: () => {
        resolve(img)
      },
      onerror: (error: ErrorEvent) => {
        reject(error)
      },
    })
  })
}

/**
 * 预览图片
 * @param url
 * @returns
 */
export async function previewImage(file: Blob | File) {
  const preview = document.querySelector('img')!
  return await new Promise<void>((resolve, reject) => {
    const reader = Object.assign(new FileReader(), {
      onload: () => {
        preview.src = reader.result as string
        resolve()
      },
      onerror: () => reject(reader.error),
    })
    reader.readAsDataURL(file)
  })
}

/**
 * websocket 流式数据处理，前端转换成 utf-8 编码的字符串
 * @param {Blob | ArrayBuffer} data
 * @return {Promise<string>} utf-8 编码的字符串
 */
export async function arrayBufferToString(
  data: Blob | ArrayBuffer,
): Promise<string> {
  let arrayBuffer: ArrayBuffer
  if (data instanceof Blob) {
    arrayBuffer = await data.arrayBuffer()
  } else {
    arrayBuffer = data
  }
  return new TextDecoder('utf-8').decode(new Uint8Array(arrayBuffer))
}

/**
 * 四元数转 rpy
 * @param {Objecr} orientation
 * @return {String} object
 */
export function quaternionToEulerAngles(orientation: Quaternion): EulerAngles {
  const { w, x, y, z } = orientation
  return {
    roll: Math.atan2(2 * (y * z + w * x), w * w - x * x - y * y + z * z),
    pitch: Math.asin(2 * (w * y - x * z)),
    yaw: Math.atan2(2 * (x * y + w * z), w * w + x * x - y * y - z * z),
  }
}

/**
 * 仅在z轴旋转（导航角）转四元数 roll-x pitch-y yaw-z
 * w = cos(x/2)cos(y/2)cos(z/2) + sin(x/2)sin(y/2)sin(z/2)
 * x = sin(x/2)cos(y/2)cos(z/2) - cos(x/2)sin(y/2)sin(z/2)
 * y = cos(x/2)sin(y/2)sin(z/2) + sin(x/2)cos(y/2)sin(z/2)
 * z = cos(x/2)cos(y/2)sin(z/2) - sin(x/2)sin(y/2)cos(z/2)
 */
export function yawToQuaternion(rad: number): Quaternion {
  const { PI, cos, sin } = Math
  return {
    w: cos((PI / 360) * rad),
    x: 0,
    y: 0,
    z: sin((PI / 360) * rad),
  }
}
