"use strict";
const response = require("./../response");
const db = require("../settings/db");

exports.addNewPost = (req, res) => {
    const user_id = req.body.user_id
    const post_date = req.body.post_date
    const post_theme = req.body.post_theme
    const post_text= req.body.post_text
    const show_post= req.body.show_post ? 1 : 0;
    db.query(
        `INSERT INTO news
        (user_id, post_date, post_theme, post_text, show_post)
        VALUES
        (${user_id}, '${post_date}', '${post_theme}', '${post_text}', '${show_post}');`,
        (err, rows, fields) => {
            if (err) {
                response.status(400, { message: `error`, err}, res);
            } else {
                response.status(200, { message: `successful`}, res);
            }
        }
    );
};

exports.editPost = (req, res) => {
    const postId = parseInt(req.params.id);
    db.query(
        `update news
         set 
         post_date = ${typeof req.body.post_date !== "undefined" ? `'${req.body.post_date}',` : "NULL,"}
         post_theme = ${typeof req.body.post_theme !== "undefined" ? `'${req.body.post_theme}',` : "NULL,"}
         post_text = ${typeof req.body.post_text !== "undefined" ? `'${req.body.post_text}'` : "NULL"}
         where id = '${postId}'`,
        (err, rows, fields) => {
            if (err) {
                response.status(400, { message: `error`, err}, res);
            } else {
                req.logout();
                    response.status(200, { message: `successful`}, res);
            }
        }
    );
}

exports.archivePostById = (req, res) => {
    const postId = parseInt(req.params.id);
    db.query(
        `UPDATE news
         SET 
         show_post = '0'
         WHERE id = '${postId}'`,
        (err, rows, fields) => {
            if (err) {
                response.status(400, { message: `error`, err}, res);
                console.log(err)
            } else {
                req.logout();
                response.status(200, { message: `successful`}, res);
            }
        }
    );
}

exports.getAllNews = (req, res) => {
    db.query(
        `select id, user_id, post_date, post_theme, post_text from news where show_post = '1' ORDER BY id DESC`,
        (err, rows, fields) => {
            if (err) {
                response.status(400, {message: `error`}, res);
            } else {
                response.status(200, {news: rows, message: `successful`}, res);
            }
        }
    );
};

exports.getNewsByUserId = (req, res) => {
    const userId = parseInt(req.params.id);
    console.log(userId)
    db.query(
        `select id, user_id, post_date, post_theme, post_text from news where show_post = '1' and user_id = '${userId}' ORDER BY id DESC`,
        (err, rows, fields) => {
            if (err) {
                response.status(400, {message: `error`}, res);
            } else {
                response.status(200, {news: rows, message: `successful`}, res);
            }
        }
    );
};