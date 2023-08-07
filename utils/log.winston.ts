import winston, { error } from 'winston';
import { format } from 'logform';
const { combine, timestamp, printf, colorize } = format;

const logFormat = printf(({ level, message, timestamp,stack }) => {
  if(stack){
    return `${timestamp} [${level.toUpperCase()}]: ${message }\n${stack}`;

  }
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

const logger = winston.createLogger({
  level: 'info',
  format: combine(
    colorize(),
    timestamp(),
    format.errors({stack:true}),
    logFormat
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/app.log' }),
  ],
});

export default logger;