import express from 'express'

const router = express.Router()

// 解析 application/json 请求体
router.post('/group', express.json(), (req, res) => {
  res.json({
    status: 'success',
    code: 200,
    data: [
      {
        id: 1,
        name: '人力资源部'
      },
      {
        id: 1,
        name: '财务部'
      },
      {
        id: 1,
        name: '销售部'
      },
      {
        id: 1,
        name: '研发部'
      }
    ],
    message: ''
  })
})



export default router