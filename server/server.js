require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { sequelize } = require('./util/database');
const { User } = require ('./models/user')
const { Post } = require ('./models/post')






const {PORT} = process.env
const {getAllPosts, getCurrentUserPosts, addPost, editPost, deletePost} = require('./controllers/posts')
const {register, login} = require('./controllers/auth')
const {isAuthenticated} = require('./middleware/isAuthenticated')

const app = express()

app.use(express.json())
app.use(cors())


User.hasMany(Post)
Post.belongsTo(User)


app.post('/register', register)
app.post('/login', login)


app.get('/posts', getAllPosts)


app.get('/userposts/:userId', getCurrentUserPosts)
app.post('/posts', isAuthenticated, addPost)
app.put('/posts/:id', isAuthenticated, editPost)
app.delete('/posts/:id', isAuthenticated, deletePost)


sequelize.sync()
.then(() => {
    app.listen(PORT, () => console.log(`db fusion has been made hunter 2-1 we are also live on port ${PORT}`))
})
.catch(err => console.log(err))

// let newUser = User.create({username: req.body.username, password: req.body.password})

// let newUser = User.create(req.body)

// {
//   "username": "jhon",
//   "password": "1234"
// }



