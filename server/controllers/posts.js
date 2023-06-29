module.exports = {
    getAllPosts: (req, res) => {
        console.log('get all posts function fired')
        res.status(200).send("get all posts function fired")
    },

    getCurrentUserPosts: (req, res) => {
        console.log('current user posts function fired')
        res.status(200).send("current user posts function fired")
    },

    addPost: (req, res) => {
        console.log('add post function fired')
        res.status(200).send("add post function fired")
    },

    editPost: (req, res) => {
        console.log('edit post function fired')
        res.status(200).send("edit post function fired")
    },

    deletePost: (req, res) => {
        console.log('delete post function fired')
        res.status(200).send("delete post function fired")
    }
}