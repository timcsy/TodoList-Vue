import Vue from 'vue'
const axios = require('axios')

Vue.component('todo-item', {
	props: ['todo'],
	template: `
	<li>
		<p v-if="!editMode" style="display: inline">{{todo.text}}</p>
		<input v-if="editMode" v-model="text">
		<button v-if="!editMode" @click="startEdit">Edit</button>
		<button v-if="editMode" @click="updateItem">Save</button>
		<button v-if="!editMode" @click="$emit('remove')">Delete</button>
	</li>
	`,
	data: function() {
		return {
			editMode: false,
			text: ''
		}
	},
	methods: {
		startEdit: function() {
			this.editMode = true
			this.text = this.todo.text
		},
		updateItem: async function() {
			const response = await axios.put('/api/v1/todos/' + this.todo._id, {
				text: this.text
			})
			const todo = response.data
			Vue.set(this.todo, '_id', todo._id)
			Vue.set(this.todo, 'text', todo.text)
			this.editMode = false
		}
	}
})

const app = new Vue({
	el: '#app',
	data: {
		todos: [],
		query: '',
		text: ''
	},
	methods: {
		search: async function() {
			const response = await axios.get('/api/v1/todos/' + this.query)
			this.todos = response.data
		},
		addItem: async function() {
			const response = await axios.post('/api/v1/todos', {
				text: this.text
			})
			const todo = response.data
			this.todos.push(todo)
			this.text = ''
		},
		removeItem: async function(index) {
			try {
				const response = await axios.delete('/api/v1/todos/' + this.todos[index]._id)
				if (response.status === 200) this.todos.splice(index, 1)
				else console.error(response)
			} catch (err) {
				console.error(err)
			}
		}
	},
	created: async function() {
		this.todos = (await axios.get('/api/v1/todos')).data
	}
})