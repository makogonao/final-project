"use strict";

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const response = require("./../response");
const db = require("../settings/db");
const config = require("./../config");

exports.addNewTask = (req, res) => {
    const user_id = req.body.user_id
    const scheduled_date = req.body.scheduled_date
    const task_name = req.body.task_name
    const task_description= req.body.task_description
    const task_show= req.body.task_show ? 1 : 0;
    db.query(
        `INSERT INTO organizer
        (user_id, scheduled_date, task_name, task_description, task_show)
        VALUES
        (${user_id}, '${scheduled_date}', '${task_name}', '${task_description}', '${task_show}');`,
        (err, rows, fields) => {
            if (err) {
                response.status(400, { message: `error`}, res);
            } else {
                response.status(200, { message: `successful`}, res);
            }
        }
    );
};

exports.getTasksByUserId = (req, res) => {
    const user_id = parseInt(req.params.user_id);
    db.query(
        `select id, scheduled_date, due_date, task_name, task_description from organizer where user_id = '${user_id}' and task_show = '1'`,
        (err, rows, fields) => {
            if (err) {
                response.status(400, {message: `error`}, res);
            } else {
                response.status(200, {tasks: rows, message: `successful`}, res);
            }
        }
    );
};

exports.editTask = (req, res) => {
    const taskId = parseInt(req.params.task_id);
    db.query(
        `update organizer
         set 
         scheduled_date = ${typeof req.body.scheduled_date !== "undefined" ? `'${req.body.scheduled_date}',` : "NULL,"}
         task_name = ${typeof req.body.task_name !== "undefined" ? `'${req.body.task_name}',` : "NULL,"}
         task_description = ${typeof req.body.task_description !== "undefined" ? `'${req.body.task_description}'` : "NULL"}
         where id = '${taskId}'`,
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

exports.archiveTaskById = (req, res) => {
    const taskId = parseInt(req.params.task_id);
    db.query(
        `UPDATE organizer
         SET 
         task_show = '0'
         WHERE id = '${taskId}'`,
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