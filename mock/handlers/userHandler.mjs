import path from 'node:path'
import express from 'express'
import multer from 'multer'

const uploadStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'mockUploads'))
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})
const upload = multer({ storage: uploadStorage })

const router = express.Router()

router.get('/user', (req, res) => {
  res.json({
    status: 'success',
    code: 200,
    data: {
      id: 1,
      name: 'Admin',
    },
    message: ''
  })
})

// 解析 application/json 请求体
router.post('/user-json', express.json(), (req, res) => {
  const { name } = req.body

  res.json({
    status: 'success',
    code: 200,
    data: {
      name
    },
    message: ''
  })
})

// 解析 application/x-www-form-urlencoded 请求体
router.post('/user-urlencoded', express.urlencoded({ extended: true }), (req, res) => {
  const { name } = req.body

  res.json({
    status: 'success',
    code: 200,
    data: {
      name
    },
    message: ''
  })
})

/**
 * 解析 multipart/form-data 请求体 - 单文件
 * const form = new FormData()
 * form.append('name', 'express')
 * form.append('file', document.querySelector('input[type="file"]').files[0])
 */ 
router.post('/user-upload', upload.single('file'), (req, res) => {

  /**
   * originalname, // 原文件名
   * filename,     // 存储后的文件名
   * path,         // 文件的存储路径
   * mimetype,     // 文件的 MIME 类型
   * size,         // 文件大小（字节）
   */
  const { name } = req.body
  const { file } = req

  res.json({
    status: 'success',
    code: 200,
    data: {
      name,
      fileName: file.filename
    },
    message: ''
  })
})

// 解析 multipart/form-data 请求体 - 多文件
router.post('/user-uploads', upload.array('files', 10), (req, res) => {
  const { files } = req

  const names = []
  files.forEach(file => {
    names.push(file.filename)
  })

  res.json({
    status: 'success',
    code: 200,
    data: {
      names
    },
    message: ''
  })
})

// 解析 multipart/form-data 请求体 - 不同文件
router.post('/user-uploads', upload.fields([
  { name: 'avatar', maxCount: 1 },
  { name: 'documents', maxCount: 3 }
]), (req, res) => {
  const { avatar, documents } = req.files

  const names = []
  documents.forEach(file => {
    names.push(file.filename)
  })

  res.json({
    status: 'success',
    code: 200,
    data: {
      avatarName: avatar[0].filename,
      documentNames: names
    },
    message: ''
  })
})


export default router