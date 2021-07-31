"use strict";

module.exports = (app) => {
    const passport = require('passport')
    const usersController = require("../Controller/UsersController");
    const tasksController = require("../Controller/TasksController");
    const bargainsController = require("../Controller/BargainsController");
    const newsController = require("../Controller/NewsController");
    
    //AUTH

    app
    .route("/api/auth/signup")
    .post(usersController.signup);

    app
    .route('/api/auth/signin')
    .post(usersController.signin)

    // USERS

    app
    .route("/api/users")
    .get(passport.authenticate('jwt', {session: false}), usersController.getAllUsers);

    app
    .route("/api/users/:id")
    .get(passport.authenticate('jwt', {session: false}), usersController.getUserById);
   
    app
    .route('/api/user/edit/:id')
    .put(passport.authenticate('jwt', {session: false}), usersController.editProfile)

    //TASKS

    app
    .route("/api/tasks/new")
    .post(passport.authenticate('jwt', {session: false}), tasksController.addNewTask);

    app
    .route("/api/tasks/get-for-user/:user_id")
    .get(passport.authenticate('jwt', {session: false}), tasksController.getTasksByUserId);
    
    app
    .route("/api/tasks/edit/:task_id")
    .put(passport.authenticate('jwt', {session: false}), tasksController.editTask);

    app
    .route("/api/tasks/archive/:task_id")
    .put(passport.authenticate('jwt', {session: false}), tasksController.archiveTaskById);

    //NEWS

    app
    .route("/api/news/new")
    .post(passport.authenticate('jwt', {session: false}), newsController.addNewPost);

    app
    .route("/api/news/")
    .get(passport.authenticate('jwt', {session: false}), newsController.getAllNews);

    app
    .route("/api/news/user/:id")
    .get(passport.authenticate('jwt', {session: false}), newsController.getNewsByUserId);

    app
    .route("/api/news/edit/:id")
    .put(passport.authenticate('jwt', {session: false}), newsController.editPost);

    app
    .route("/api/news/archive/:id")
    .put(passport.authenticate('jwt', {session: false}), newsController.archivePostById);

    //BARGAINS

    app
    .route("/api/bargains/new")
    .post(passport.authenticate('jwt', {session: false}), bargainsController.addNewBargain);

    app
    .route("/api/bargains/edit/:id")
    .put(passport.authenticate('jwt', {session: false}), bargainsController.editBargain);

    app
    .route("/api/bargains/archive/:id")
    .put(passport.authenticate('jwt', {session: false}), bargainsController.archiveBargainById);

    app
    .route("/api/bargains/")
    .get(passport.authenticate('jwt', {session: false}), bargainsController.getAllBargains);

};
