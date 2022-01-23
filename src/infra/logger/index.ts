import pino from 'pino'

function initLogger() {
  const loggerInstance = pino({
    base: null,
    messageKey: 'message',
    timestamp: () => `,"timestamp":"${new Date().toISOString()}"`,
    formatters: {
      level(label) {
        return { pino_level: label }
      },
    },
  })

  return loggerInstance
}

export const logger = initLogger()
