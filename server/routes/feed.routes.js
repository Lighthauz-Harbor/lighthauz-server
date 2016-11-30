module.exports = function(router, dbDriver) {

    router.get("/news/:skip/:num", function(req, res) {
        var session = dbDriver.session();

        session
            .run("MATCH (u:User)-[m:MAKE]->(i:Idea)<-[:CATEGORIZE]-(c:Category) \
                RETURN u.id, u.name, u.profilePic, \
                i.id, i.pic, i.title, i.description, \
                c.name, m.lastChanged, m.createdAt \
                ORDER BY m.lastChanged DESC \
                SKIP {skip} LIMIT {num}",
                {
                    skip: Number(req.params.skip),
                    num: Number(req.params.num)
                })
            .then(function(result) {
                res.send({
                    // post as in "a post of the news feed"
                    news: result.records.map(function(post) {
                        return {
                            author: {
                                id: post.get("u.id"),
                                name: post.get("u.name"),
                                pic: post.get("u.profilePic")
                            },
                            idea: {
                                id: post.get("i.id"),
                                pic: post.get("i.pic"),
                                title: post.get("i.title"),
                                description: post.get("i.description"),
                                category: post.get("c.name")
                            },
                            type: post.get("m.createdAt") === post.get("m.lastChanged") ? "create" : "update",
                            timestamp: post.get("m.lastChanged")
                        };
                    })
                });
                session.close();
            })
            .catch(function(err) {
                console.log(err);
                res.send({
                    fail: "Failed fetching news feed. Please refresh."
                });
                session.close();
            });
    });

    router.post("/like", function(req, res) {
        var session = dbDriver.session();

        session
            .run("MATCH (u:User), (i:Idea) \
                WHERE u.id = {userId} AND i.id = {ideaId} \
                CREATE (u)-[:LIKE {lastChanged: {lastChanged}}]->(i)",
                {
                    userId: req.body.userId,
                    ideaId: req.body.ideaId,
                    lastChanged: (new Date()).getTime()
                })
            .then(function() {
                res.sendStatus(200);
                session.close();
            })
            .catch(function(err) {
                res.send({
                    fail: "Failed to like this post. Please try again."
                });
                session.close();
            });
    });

    router.post("/unlike", function(req, res) {
        var session = dbDriver.session();

        session
            .run("MATCH (u:User)-[l:LIKE]->(i:Idea) \
                WHERE u.id = {userId} AND i.id = {ideaId} \
                DELETE l",
                {
                    userId: req.body.userId,
                    ideaId: req.body.ideaId
                })
            .then(function() {
                res.sendStatus(200);
                session.close();
            })
            .catch(function(err) {
                res.send({
                    fail: "Failed to unlike this post. Please try again."
                });
                session.close();
            });
    });

    router.post("/comment", function(req, res) {
        var session = dbDriver.session();

        session
            .run("MATCH (u:User), (i:Idea) \
                WHERE u.id = {userId} AND i.id = {ideaId} \
                CREATE (u)-[:COMMENT {comment: {comment}, \
                lastChanged: {lastChanged}}]->(i)",
                {
                    userId: req.body.userId,
                    ideaId: req.body.ideaId,
                    comment: req.body.comment,
                    lastChanged: (new Date()).getTime()
                })
            .then(function() {
                res.sendStatus(200);
                session.close();
            })
            .catch(function(err) {
                res.send({
                    fail: "Failed commenting this post. Please try again."
                });
                session.close();
            });
    });

};