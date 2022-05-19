const express = require('express')
const app = express()
const mongoose = require('mongoose')
const User = require('./users')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const cors = require('cors')
const bcrypt = require('bcryptjs')
const multer  = require('multer')
// const upload = multer({ dest: 'uploads/' })

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null,Date.now()+ '-'+file.originalname)
  }
})
const upload = multer({ storage: storage })

mongoose.connect('mongodb+srv://sudeep:8888@cluster0.gmtky.mongodb.net/Student?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.warn('mongo connected')
  }).catch((err) => (console.log(err)))

app.use(cors())

app.use('/public',express.static('public'))
app.put('/profile/:id',upload.single('image'), function (req, res) {
  // console.log(req.file.originalname)
  User.findOne({ _id: req.params.id}).then((data) => {
  if(data){
    User.updateOne({ _id: req.params.id }, { $set: { image:req.file.filename} }).then((data1) => {
      return res.json({_id:req.params.id ,image:"http://localhost:5000/public/images/" + req.file.filename})
    }).catch((err) => (console.log(err)))
  } 
  })
})


app.put('/update/:id', jsonParser, function (req, res) {
  // console.log(req.params.id)
  User.findOne({ name: req.body.name }).then((data) => {
    if (data) {
      return res.json('Updated successfully..!!')
    }
    else {
      User.updateOne({ _id: req.params.id }, { $set: { name: req.body.name } }).then((data) => {
        return res.json('Updated successfully..!!')
      }).catch((err) => (console.log(err)))

    }
  })

  User.findOne({ email: req.body.email }).then((data) => {
    if (data) {
      return res.json('Updated successfully..!!')
    }
    else {
      User.updateOne({ _id: req.params.id }, { $set: { email: req.body.email } }).then((data) => {
        return res.json('Updated successfully..!!')
      }).catch((err) => (console.log(err)))

    }
  })
})


app.get('/list', jsonParser, function (req, response) {
  User.find({}).then((data) => {
    response.json(data)
  }).catch((err) => (console.log(err)))
})


app.get('/lists/:id', jsonParser, function (req, response) {
  // console.log(req.params.id)
  User.findOne({ _id: req.params.id }).then((data) => {
    response.json({name:data.name,email:data.email,password:data.password,image:"http://localhost:5000/public/images/"+ data.image})
  }).catch((err) => (console.log(err)))
})


app.post('/register', jsonParser, function (req, res) {
  User.findOne({ name: req.body.name }).then((data) => {
    if (data) {
      return res.json('That username already exists')
    }

    User.findOne({ email: req.body.email }).then((data) => {
      if (data) {
        return res.json('That email already exists')
      }
      else {
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(req.body.password, salt, function (err, hash) {
            // console.log(hash)
            // Store hash in your password DB.

            const data = new User({
              _id: mongoose.Types.ObjectId(),
              name: req.body.name,
              email: req.body.email,
              password: hash,
              image:'icon-3.png'
            })
            data.save().then((response) => {
              res.json(response)
            })
              .catch((err) => (console.log(err)))
          })
        });
      }
    }).catch((err) => (console.log(err)))
  }).catch((err) => (console.log(err)))
})


app.post('/login', jsonParser, function (req, response) {
  User.findOne({ name: req.body.name }).then((data) => {
    bcrypt.compare(req.body.password, data.password, function (err, res) {
      console.log(res)
      if (res) {
        response.json({_id:data._id,name:data.name,email:data.email,password:data.password,image:"http://localhost:5000/public/images/"+ data.image})
      }
      else {
        response.json(res)
      }
    })
  }).catch((err) => (console.log(err)))
})
app.listen(5000)