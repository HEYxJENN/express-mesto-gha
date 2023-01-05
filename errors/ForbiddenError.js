class ForbidddenError extends Error {
  constructor(message) {
    super(message);
    this.name = 'Forbidden';
    this.status = 403;
  }
}

module.exports = ForbidddenError;
