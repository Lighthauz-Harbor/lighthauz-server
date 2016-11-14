var IdeaSchema = require("../models/idea.model.server");

module.exports = function(router, dbDriver) {

    var ideaSchema = new IdeaSchema(dbDriver);

    router.get("/ideas/list", function(req, res) {
        ideaSchema.listIdeas(req, res);
    });

};