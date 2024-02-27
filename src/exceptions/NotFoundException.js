class NotFoundException extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundException";
    this.status = 404; // Optionally add a status property to differentiate error types
  }
}

module.exports = NotFoundException;
