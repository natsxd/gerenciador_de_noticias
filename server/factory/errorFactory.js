module.exports = class ErrorFactory {
  static getError(message) {
    return {
      status: 'error',
      message
    }
  }
}