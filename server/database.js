const sqlite3 = require('sqlite3').verbose()
const path = require('path')

// Путь к базе данных
const dbPath = path.join(__dirname, 'videoDatabase.db')

// Создание или подключение к базе данных
const db = new sqlite3.Database(dbPath, err => {
	if (err) {
		console.error('Ошибка подключения к базе данных:', err.message)
	} else {
		console.log('Подключение к базе данных установлено.')
	}
})

// Создание таблицы для видеофайлов, если она еще не существует
db.serialize(() => {
	db.run(`CREATE TABLE IF NOT EXISTS videos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    path TEXT NOT NULL,
    size INTEGER,
    date_added DATETIME DEFAULT CURRENT_TIMESTAMP
  )`)

	db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    login TEXT NOT NULL,
    passwordHash TEXT NOT NULL
  )`)
})

module.exports = db
