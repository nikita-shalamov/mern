import { Router } from "express";
import User from "../models/User.js";
import bcrypt from 'bcrypt'
import { check, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import config from 'config'
const routerAuth = Router();

// POST /api/auth/register
routerAuth.post(
    '/register', 
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Минимальная длина пароля 6 символов').isLength({min: 6})
    ],
    async (req, res) => {
    try {

        console.log('body', req.body);
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные при регистрации'
            })
        }

        // получаем то, что отправляем с фронта
        const { email, password } = req.body; 

        // ищем человека с похожим email
        const candidate = await User.findOne({ email });

        if (candidate) {
            return res.status(400).json({ message: 'Такой пользователь уже существует' });
        }

        const hashedPassword = await bcrypt.hash(password, 12) // хэшируем пароль
        const user = new User({email, password: hashedPassword}) // записываем хэш пароль

        await user.save() // ждем, пока юзер сохранится

        // в итоге отправляем ответ от сервера, что все удачно
        res.status(201).json({message: "Пользователь создан"})

    } catch (e) {
        res.status(500).json({ message: "Что-то пошло не так" });
    }
});

// POST /api/auth/login
routerAuth.post(
    '/login', 
    [
        check('email', 'Введите корректный email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные при входе'
            })
        }

        const {email, password} = req.body

        const user = await User.findOne({email})

        if (!user) {
            return res.status(400).json({message: 'Пользователь не найден'})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({message: "Неверный пароль"})
        }

        const token = jwt.sign(
            { userId: user.id },
            config.get('jwtSecret'),
            { expiresIn: '1h' }
        )

        res.json({ token, userId: user.id })

    } catch (e) {
        res.status(500).json({ message: "Что-то пошло не так" });
    }
});

export default routerAuth;
