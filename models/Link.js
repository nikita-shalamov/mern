import mongoose, { Schema, model, Types } from "mongoose";

// Определение схемы пользователя
const schema = new Schema({
    from: {type: String, required: true},
    to: {type: String, required: true, unique: true},
    code: {type: String, required: true, unique: true},
    date: {type: Date, default: Date.now},
    clicks: {type: Number, default: 0},
    owner: {type: Types.ObjectId, ref: 'User'}

})

// Экспорт модели пользователя
const Link = model('Link', schema);

export default Link;
