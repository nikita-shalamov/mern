import { Router } from "express";
import Link from "../models/Link.js";
import authMiddleware from "../middleware/auth.middleware.js";
const routerLink = Router()
import config from 'config'
import shortid from "shortid";


routerLink.post(
    '/generate',
    authMiddleware,
    async (req, res) => {
        try {
            console.log('Request body:', req.body);
            const baseUrl = config.get('baseUrl');
            const { from } = req.body;

            const code = shortid.generate();

            // Add await here to wait for the database query
            const existing = await Link.findOne({ from });

            if (existing) {
                console.log('Existing link found');
                return res.status(201).json({ link: existing });
            }

            const to = baseUrl + '/t/' + code;

            const link = new Link({
                code, to, from, owner: req.user.userId
            });

            await link.save();

            res.status(201).json({ link });
        } catch (e) {
            console.error('Error:', e); // Log the actual error
            res.status(500).json({ message: "Что-то пошло не так" });
        }
    }
);


routerLink.get(
    '/',
    authMiddleware,
    async (req, res) => {
        try {
            const links = await Link.find({owner: req.user.userId})
            res.json(links)
        } catch (e) {
            res.status(500).json({ message: "Что-то пошло не так" });
        }
    }
)


routerLink.get(
    '/:id', 
    authMiddleware,
    async (req, res) => {
        try {
            const link = await Link.findById(req.params.id)
            res.json(link)
        } catch (e) {
            res.status(500).json({ message: "Что-то пошло не так" });
        }
    }
)
export default routerLink