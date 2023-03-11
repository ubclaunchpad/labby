import { expressjwt } from 'express-jwt';

function authorize(admin) {

    return [
        expressjwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }),
        (err, req, res, next) => {
            if (err.name === 'UnauthorizedError') {
                return res.status(401).json({ message: 'Unauthorized Error' });
            }
            if (req.auth.role !== 'User' && req.auth.role !== 'Admin') {
                return res.status(401).json({ message: 'Unauthorized User' });
            }
            if (admin && req.auth.role !== 'Admin') {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            next();
        }
    ]
}

export default authorize;