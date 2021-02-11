const Post = require('../../models/Post');
const checkAuth = require('../../util/check-auth');
const { AuthenticationError } = require('apollo-server');
module.exports = {
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find().sort({ createdAt: -1 }); //得到最新的post 由新到旧排序
                return posts;
            } catch (error) {
                throw new Error(error);
            }
        },
        async getPost(a, { postId }) {
            console.log(a);
            try {
                const post = await Post.findById(postId);
                if (post) {
                    return post;
                } else {
                    throw new Error('Post not Found');
                }
            } catch (error) {
                throw new Error(error);
            }
        }
    },
    Mutation: {
        async createPost(_, { body }, context) { //可以在context中检查request body ，进而检查其中headers的auth-token

            const user = checkAuth(context);
            const newPost = new Post({
                body,
                user: user.id,
                username: user.username,
                createdAt: new Date().toISOString()
            });
            const post = await newPost.save();
            return post;
        },
        async deletePost(_, { postId }, context) {
            const user = checkAuth(context);

            try {
                const post = await Post.findById(postId);
                console.log(user, post);
                if (user.username === post.username) {
                    await post.delete();
                    return 'Post deleted successfully';
                } else {
                    throw new AuthenticationError('Action not allowed');
                }
            } catch (err) {
                console.log(1);
                throw new Error(err);
            }
        }
    }
}