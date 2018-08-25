const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const views = require('koa-views')
const static = require('koa-static')
const router = require('./routes/routes')

const app = new Koa()

app.use(static(__dirname + '/dist'))

app.use(views(__dirname + '/dist', {
	extension: 'html'
}))

app.use(bodyParser())

app.use(router.routes())

app.listen(50319, () => {
	console.log('Server is running at http://localhost:50319')
})