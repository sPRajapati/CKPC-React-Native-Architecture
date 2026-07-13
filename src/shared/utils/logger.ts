type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const write = (level: LogLevel, message: string, ...args: unknown[]) => {
  if (!__DEV__) return;
  const prefix = `[${level.toUpperCase()}]`;
  console[level === 'debug' ? 'log' : level](prefix, message, ...args);
};

export const logger = {
  debug: (message: string, ...args: unknown[]) => write('debug', message, ...args),
  info: (message: string, ...args: unknown[]) => write('info', message, ...args),
  warn: (message: string, ...args: unknown[]) => write('warn', message, ...args),
  error: (message: string, ...args: unknown[]) => write('error', message, ...args),
};
