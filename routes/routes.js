const Router = require('koa-router')
const Todo = require('../models/Todo')

const router = new Router()

router.get('/', async (ctx) => {
	await ctx.render('index')
})

router.get('/api/v1/todos', async (ctx) => {
	ctx.body = await Todo.find().exec()
})

router.get('/api/v1/todos/:query', async (ctx) => {
	ctx.body = await Todo.find({text: {$regex: '.*' + ctx.params.query + '.*'}}).exec()
})

router.post('/api/v1/todos', async (ctx) => {
	const todo = new Todo({text: ctx.request.body.text})
	ctx.body = await todo.save()
})

router.put('/api/v1/todos/:id', async (ctx) => {
	ctx.body = await Todo.findByIdAndUpdate(
		ctx.params.id,
		{text: ctx.request.body.text},
		{new: true}
	).exec()
})

router.delete('/api/v1/todos/:id', async (ctx) => {
	ctx.body = await Todo.findByIdAndRemove(ctx.params.id).exec()
})

module.exports = router