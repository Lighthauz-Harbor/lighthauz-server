var UserSchema = require("../models/user.model.server");

module.exports = function(router, dbDriver) {

    var userSchema = new UserSchema(dbDriver);

    router.post("/users/create", function(req, res) {
        userSchema.create(req, res);
    });

    router.get("/users/list", function(req, res) {
        userSchema.listUsers(req, res);
    });

    router.get("/users/get/:id", function(req, res) {
        userSchema.getSingle(req, res);
    });

    router.get("/users/name/:id", function(req, res) {
        userSchema.getName(req, res);
    });

    router.get("/users/search/:term", function(req, res) {
        userSchema.search(req, res);
    });

    router.put("/users/update/:id", function(req, res) {
        userSchema.update(req, res);
    });

    router.post("/users/delete", function(req, res) {
        userSchema.deleteUsers(req, res);
    });

    router.get("/users/total-users", function(req, res) {
        userSchema.getTotalUsersCount(req, res);
    });

    router.get("/users/new-users", function(req, res) {
        userSchema.getNewUsersCount(req, res);
    });

};
