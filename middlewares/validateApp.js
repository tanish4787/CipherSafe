import { body, validationResult } from 'express-validator';

const validateApp = [
    body('appName')
        .trim()
        .notEmpty()
        .withMessage('App name is required')
        .isLength({ max: 50 })
        .withMessage('App name should not exceed 50 characters'),

    body('sharedData')
        .optional()
        .isObject()
        .withMessage('sharedData must be a valid object'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                success: false,
                errors: errors.array().map(err => err.msg),
            });
        }
        next();
    }
];

export default validateApp;
