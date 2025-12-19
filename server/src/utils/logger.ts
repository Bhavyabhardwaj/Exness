import winston from 'winston';
import fs from 'fs';
import path from 'path';
import { debug, trace } from 'console';

// ensure logs directory exists
const logDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logDir)) {                   // if logs not exist create it
    fs.mkdirSync(logDir, { recursive: true });
}

// custom log levels
const customLevels = {
    levels: {
        fatal: 0,
        error: 1,
        warn: 2,
        info: 3,
        debug: 4,
        trace: 5
    },
    colors: {
        fatal: 'red',
        error: 'red',
        warn: 'yellow',
        info: 'green',
        debug: 'blue',
        trace: 'gray'
    }
};

// define format for console
const consoleFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    winston.format.colorize({ all: true }),
    winston.format.printf(({ timestamp, level, message, ...meta }) => {
        const metaStr = Object.keys(meta).length ? JSON.stringify(meta) : '';
        return `${timestamp} [${level}]: ${message} ${metaStr}`;
    })
)

// format for file
const fileFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.json()
);

// create logger
const logger = winston.createLogger({
    levels: customLevels.levels,
    level: process.env.LOG_LEVEL || 'debug',
    transports: [

        // send logs to console
        new winston.transports.Console({
            format: consoleFormat
        }),

        // save logs to file(log)
        new winston.transports.File({
            filename: path.join(logDir, 'app.log'),
            format: fileFormat, 
            maxsize: 5 * 1024 * 1024, // 5MB
            maxFiles: 5
        }),
        
        // save only error logs to file(errors.log)
        new winston.transports.File({
            filename: path.join(logDir, 'errors.log'),
            level: 'error',
            format: fileFormat,
            maxsize: 5 * 1024 * 1024, // 5MB
            maxFiles: 5
        }),
    ],
});

// handle logger errors
logger.on('error', (err) => {
    debug('Logger error:', err);
});

winston.addColors(customLevels.colors);         // add colors

export default logger;