const express = require('express')
const fs = require('fs')
const path = require('path')
const cors = require('cors')
const db = require('./database') // Подключаем модуль базы данных
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const secretKey = 'XVCJ9'

const app = express()
const PORT = 3010

// Включаем CORS для всех маршрутов
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
//'D:\\coub' 'E:\\raivevans' './video'
const videoDirectory = path.join('E:\\raivevans') // Указываем путь к папке с видео

// Функция для получения списка видеофайлов
const getVideoFiles = () => {
	const files = fs.readdirSync(videoDirectory) // Считываем все файлы в папке
	return files.filter(file => file.endsWith('.mp4')) // Отбираем только mp4 файлы
}

// Функция для добавления видео в базу данных
const addVideosToDatabase = () => {
	const videoFiles = getVideoFiles() // Получаем список файлов
	const uniqueFiles = new Set() // Множество для хранения уникальных имен файлов

	videoFiles.forEach(file => {
		// Удаляем суффиксы, такие как (1), (2) и т.д., из имени файла
		const baseName = file.replace(/\s\(\d+\)/, '')

		// Проверяем, обрабатывали ли уже это имя файла
		if (!uniqueFiles.has(baseName)) {
			uniqueFiles.add(baseName) // Добавляем имя в множество

			const videoPath = path.join(videoDirectory, file)
			const stat = fs.statSync(videoPath)
			const fileSize = stat.size

			// Проверяем, есть ли уже это видео в базе
			db.get('SELECT * FROM videos WHERE name = ?', [baseName], (err, row) => {
				if (!row) {
					// Добавляем новое видео, если его нет в базе
					db.run(
						'INSERT INTO videos (name, path, size) VALUES (?, ?, ?)',
						[baseName, videoPath, fileSize],
						err => {
							if (err) {
								console.error(
									'Ошибка при добавлении видео в базу:',
									err.message
								)
							}
						}
					)
				}
			})
		}
	})
}

// Добавляем видео в базу данных при старте сервера
addVideosToDatabase()

// Маршрут для получения списка первых 50 видео
app.get('/videos', (req, res) => {
	const { start = 0, count = 10 } = req.query // Получаем параметры с фронта

	// Преобразуем start и end в числа
	const startIndex = parseInt(start, 10)

	// Проверка на корректность значений start и end
	if (isNaN(startIndex) || startIndex < 0 || count > 120) {
		return res.status(400).send('Некорректные параметры диапазона')
	}

	db.all(
		'SELECT * FROM videos LIMIT ? OFFSET ?',
		[count, startIndex],
		(err, rows) => {
			if (err) {
				return res.status(500).send('Ошибка при получении видео из базы данных')
			}

			const videoFiles = rows.map(row => row.name) // Возвращаем только названия видео
			res.json(videoFiles) // Отправляем список видеофайлов в формате JSON
		}
	)
})

// Маршрут для воспроизведения видео по имени
app.get('/video/:videoName', (req, res) => {
	const videoName = req.params.videoName
	db.get('SELECT * FROM videos WHERE name = ?', [videoName], (err, row) => {
		if (err) {
			return res.status(500).send('Ошибка при поиске видео в базе данных')
		}
		if (!row) {
			return res.status(404).send('Видео не найдено в базе данных')
		}

		const videoPath = row.path
		const stat = fs.statSync(videoPath)
		const fileSize = stat.size

		res.writeHead(200, {
			'Content-Length': fileSize,
			'Content-Type': 'video/mp4',
		})

		fs.createReadStream(videoPath).pipe(res)
	})
})

app.post('/login', (req, res) => {
	const { login, password } = req.body

	if (!login || !password) {
		return res.status(400).send('Логин и пароль обязательны')
	}

	db.get('SELECT * FROM users WHERE login = ?', [login], (err, row) => {
		if (err) {
			return res.status(500).send('Ошибка при поиске в базе данных')
		}

		if (!row) {
			return res.status(404).send('Пользователь не найден')
		}

		console.log(password, getMD5(password), row)
		if (getMD5(password) !== row.passwordHash) {
			return res.status(401).send('Неправильный логин или пароль')
		}

		const token = jwt.sign({ username: login }, secretKey)

		return res.json({ token })
	})
})

function getMD5(text) {
	return crypto.createHash('md5').update(text).digest('hex')
}

app.post('/register', (req, res) => {
	const { login, password } = req.body

	if (!login || !password) {
		res.status(400).send('Логин и пароль обязательны')
		return
	}

	// Проверка, существует ли уже пользователь с таким логином
	db.get('SELECT * FROM users WHERE login = ?', [login], (err, row) => {
		if (err) {
			console.error('Ошибка при проверке пользователя:', err.message)
			res.status(500).send('Произошла ошибка на сервере')
			return
		}

		if (row) {
			// Если такой пользователь существует, отправляем ошибку
			res.status(400).send('Пользователь с таким именем уже зарегистрирован')
			return
		}

		// Если пользователь не найден, продолжаем регистрацию
		const hash = getMD5(password)

		db.run(
			'INSERT INTO users (login, passwordHash) VALUES (?, ?)',
			[login, hash],
			err => {
				if (err) {
					console.error(
						'Ошибка при добавлении пользователя в базу:',
						err.message
					)
					res.status(500).send('Ошибка при добавлении пользователя')
					return
				}

				// Генерация JWT токена
				const token = jwt.sign({ username: login }, secretKey)
				res.json({ token })
			}
		)
	})
})

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`)
})
