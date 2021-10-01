const express = require('express')
const router = express.Router()
const pool = require('../db/db')

//get all tasks
router.get('/', async (req, res) => {
    const textQuery = `
    SELECT json_object_agg(id, js) res
    FROM (
        SELECT column_item.name, column_item.id, json_build_object(
            'name', column_item.name,
            'tasks', json_agg(demo_kanban_tasks.*)
        ) js
        FROM demo_kanban_tasks 
        FULL JOIN column_item ON demo_kanban_tasks.column_item_id = column_item.id
        GROUP BY column_item.id
        ORDER BY column_item.id
    ) column_item;`
    try {
        const allTasks = await pool.query(textQuery)
        res.json(allTasks.rows)
    } catch (err) {
        console.error(err)
    }
})

//get a single task
router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const task = await pool.query("SELECT * FROM demo_kanban_tasks WHERE id = $1", [id])
        res.json(task.rows[0])
    } catch (err) {
        console.error(err)
    }
})

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
router.put('/:id', async (req, res) => {
    const { id } = req.params
    const { title, description, priority, column_id } = req.body
    const textQuery = "UPDATE demo_kanban_tasks SET title = COALESCE($1, title), description = COALESCE($2, description), priority = COALESCE($3, priority), column_item_id = COALESCE($4, column_item_id) WHERE id = $5"
    const values = [title, description, priority, column_id, id]
    try {
        const updateTask = await pool.query(textQuery, values)
        res.json("Task updated.")
    } catch (err) {
        console.error(err)
    }
})

//delete task
router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        await pool.query("DELETE FROM demo_kanban_tasks WHERE id = $1", [id])
        res.json("Task deleted.")
    } catch (err) {
        console.error(err)
    }
})

module.exports = router