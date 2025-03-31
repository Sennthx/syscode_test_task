import winston from 'winston';

const { combine, timestamp, printf, colorize } = winston.format;

const logLevels = {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
};

const customFormat = printf(({ timestamp, level, message }) => {
    return `${timestamp} [${level}]: ${message}`;
});

const logger = winston.createLogger({
    levels: logLevels,
    level: 'info',
    format: combine(
        timestamp(),
        colorize(),
        customFormat
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'combined.log' }),
    ],
});

export default logger;
