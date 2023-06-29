module.exports = {
    register: (req, res) => {
        console.log('register')
        res.status(200).send("register")
    },

    login: (req, res) => {
        console.log('login')
        res.status(200).send("login")
    },
}