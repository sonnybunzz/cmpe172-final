const express = require('express')
const router = express.Router()

router.get('/', function (req, res) {
  res.render('index', {
    title: 'Simple Node Authentication',
    userinfo: req.userinfo,
    //layout: 'layout'
  })
})


module.exports = router
