// const { createLogger, format, transports } = require('winston');

// const { combine, timestamp, label, printf } = format;

// const myFormat = printf(info => {
//   return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
// });

// const logger = createLogger({
//   format: combine(
//     label({ label: 'right meow!' }),
//     timestamp(),
//     myFormat
//   ),
//   transports: [new transports.Console()]
// });

//   return logger;