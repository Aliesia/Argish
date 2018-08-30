const User = require('../../../objects/User');
const Post = require('../../../objects/Post');

const PostService = function (site, driver) {
    let user = new User(site, driver);
    let post = new Post(site, driver);

/*this.canCreatePost = function () {
    driver
        .then(_ => user.asAdmin())
        .then(_ => post.canCreatePostTest())
};
this.canEditPost = function () {
    driver
        .then(_ => user.asAdmin())
        .then(_ => post.canEditPostTest())
};
this.canDeletePost = function () {
    driver
        .then(_ => user.asAdmin())
        .then(_ => post.canDeletePostTest())
}; */
};

module.exports = PostService;
