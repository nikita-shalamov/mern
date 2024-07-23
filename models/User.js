import mongoose, { Schema, model, Types } from "mongoose";

// Определение схемы пользователя
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,  // Уникальность email для каждого пользователя
    },
    password: {
        type: String,
        required: true,  // Пароль является обязательным
    },
    links: [{
        type: Types.ObjectId,
        ref: 'Link'
    }]
}, {
    timestamps: true,  // Добавляет поля createdAt и updatedAt
})

// Экспорт модели пользователя
const User = model('User', userSchema);

export default User;
