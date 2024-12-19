# Лента видео

## Описание проекта

Данный проект представляет собой ленту видео с базовым функционалом регистрации и авторизации. После успешной авторизации пользователю становится доступен просмотр ленты видео.

### Функционал:

1. **Регистрация**

   - Позволяет создать учетную запись, введя любой логин и пароль в специальной форме.

2. **Авторизация**

   - Доступ к ленте видео открывается только после ввода корректных данных авторизации.

3. **Лента видео**
   - Основной функционал проекта:
     - Навигация по ленте с помощью стрелок клавиатуры:
       - **⬆ Вверх** — перейти к предыдущему видео.
       - **⬇ Вниз** — перейти к следующему видео.
     - Управление воспроизведением:
       - Клик мыши по видео — пауза/воспроизведение.
       - После клика мыши стрелки продолжают управление лентой начиная с текущего выбранного видео.
     - Кнопка "Выход":
       - После нажатия сбрасывается токен авторизации, и пользователю потребуется войти снова.

## Инструкция по демонстрации

1. Перейдите на страницу регистрации.
2. Введите любой логин и пароль в форме регистрации.
3. После успешной авторизации будет доступна страница с лентой видео.
4. Управляйте видео при помощи клавиатуры или мыши:
   - Для переключения видео используйте стрелки на клавиатуре.
   - Клик мыши ставит видео на паузу или продолжает воспроизведение.
5. Для выхода из учетной записи нажмите кнопку "Выход", чтобы завершить текущую сессию.

## Установка и запуск

после клонирования репозитория нужно выполнить несколько команд.
## установка:

1.  cd ./server; yarn
2.  cd ..
3.  cd ./video-feed; yarn
4.  cd ..

## запуск:

1.  cd ./server; npm run start
2.  создать новый терминал
3.  cd ./video-feed; npm run start