const express = require('express')
const router = express.Router()

router.get('/', function (req, res) {
  res.render('index', {
    title: 'Simple Node Authentication',
    userinfo: req.userinfo,
  })
})

router.get('/about', function (req, res) {
  res.render('about', {
    title: 'About',
  })
})

router.get('/contact', function (req, res) {
  res.render('contact', {
    title: 'Contact',
  })
})

module.exports = router
