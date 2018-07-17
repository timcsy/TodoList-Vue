Todo List with Vue and Koa2 Mongoose
===

使用說明
---
先在跟目錄創建一個叫做 config 的資料夾
在資料夾下新增一個檔案叫做 mongoose.js 如下：
```
module.exports = {
	hostname: '主機名稱(預設值為localhost)',
	port: '端口(預設值為27017)'
	username: '使用者名稱',
	password: '密碼',
	database: 'todolist_vue'
}
```
就可以完成資料庫設定了

安裝
---
```
npm instll
```

執行
---
產生前端程式碼
```
npm run build
```
運行後端server
```
npm run server
```
產生前端程式碼與運行後端server
```
npm run start

or

npm start
```