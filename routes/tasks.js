const express = require('express')
const router = express.Router()
const pool = require('../db/db')

//get all tasks
router.get('/', async (req, res) => {
    try {
        const allTasks = await pool.query("SELECT * FROM demo_kanban_tasks")

        res.json(allTasks.rows)
    } catch (err) {
        console.error(err)
    }
})

//get a single task

//create a task
router.post('/', async (req, res) => {
    const { title, description, priority, column_id } = req.body;
    const textQuery = "INSERT INTO demo_kanban_tasks (title, description, priority, column_item_id) VALUES ($1, $2, $3, $4) RETURNING *"
    const values = [title, description, priority, column_id]
    try {
        const newTask = await pool.query(textQuery, values)
        res.json(newTask.rows[0]);
    } catch (err) {
        console.error(err)
    }
})

//update task

//delete task

module.exports = router