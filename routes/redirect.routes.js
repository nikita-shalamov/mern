import { Router } from 'express';
import Link from '../models/Link.js';
const redirectRouter = Router();

redirectRouter.get('/:code', async (req, res) => {
    try {
        const link = await Link.findOne({ code: req.params.code });
        console.log('my link', link);
        if (link) {
            link.clicks++;
            await link.save();
            return res.redirect(link.from);
        }

        res.status(404).json('Ссылка не найдена');
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Что-то пошло не так" });
    }
});

export default redirectRouter;
