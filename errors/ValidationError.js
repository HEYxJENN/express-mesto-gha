class ValidationError {
   constructor(message) {
    this.name = "ValidationError";
    this.message = message;
    this.status=400;
   }
}

module.exports=ValidationError;