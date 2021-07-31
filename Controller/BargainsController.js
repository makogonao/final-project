"use strict";
const response = require("./../response");
const db = require("../settings/db");

exports.addNewBargain = (req, res) => {
    const user_id = req.body.user_id
    const departure_date = req.body.departure_date
    const task_name = req.body.task_name
    const departure_from= req.body.departure_from
    const departure_to= req.body.departure_to
    const show_bargain= req.body.show_bargain ? 1 : 0;
    db.query(
        `INSERT INTO bargains
        (user_id, departure_date, task_name, departure_from, departure_to, show_bargain)
        VALUES
        (${user_id}, '${departure_date}', '${task_name}', '${departure_from}', '${departure_to}', '${show_bargain}');`,
        (err, rows, fields) => {
            if (err) {
                response.status(400, { message: `error`}, res);
            } else {
                response.status(200, { message: `successful`}, res);
            }
        }
    );
};

exports.editBargain = (req, res) => {
    const postId = parseInt(req.params.id);
    db.query(
        `update bargains
         set 
         departure_date = ${typeof req.body.departure_date !== "undefined" ? `'${req.body.departure_date}',` : "NULL,"}
         task_name = ${typeof req.body.task_name !== "undefined" ? `'${req.body.task_name}',` : "NULL,"}
         departure_from = ${typeof req.body.departure_from !== "undefined" ? `'${req.body.departure_from}',` : "NULL,"}
         departure_to = ${typeof req.body.departure_to !== "undefined" ? `'${req.body.departure_to}'` : "NULL"}
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

exports.archiveBargainById = (req, res) => {
    const postId = parseInt(req.params.id);
    db.query(
        `UPDATE bargains
         SET 
         show_bargain = '0'
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

exports.getAllBargains = (req, res) => {
    db.query(
        `select id, user_id, departure_date, task_name, departure_from, departure_to from bargains where show_bargain = '1' ORDER BY id DESC`,
        (err, rows, fields) => {
            if (err) {
                response.status(400, {message: `error`}, res);
            } else {
                response.status(200, {bargains: rows, message: `successful`}, res);
            }
        }
    );
};