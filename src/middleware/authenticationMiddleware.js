// middleware/authenticationMiddleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticationMiddleware = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token inválido' });
    }

    const tokenWithoutBearer = token.slice(7);

    try {
        const decoded = jwt.verify(tokenWithoutBearer, process.env.SECRET_KEY);

        req.user = decoded;
        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ error: 'Token inválido' });
        } else if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ error: 'Token expirado' });
        } else if (error instanceof jwt.NotBeforeError) {
            return res.status(401).json({ error: 'Token ainda não é válido' });
        }

        res.status(401).json({ error: 'Não autorizado' });
    }
};

module.exports = authenticationMiddleware;
