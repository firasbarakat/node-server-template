function ServerResponse() {
    this.Error = false;
    this.ErrorNumber = 0;
    this.Result = null;

    this.toJSON = function() {
        return {
            Error: this.Error,
            ErrorNumber: this.ErrorNumber,
            Result: this.Result || null
        }
    }
}

module.exports = ServerResponse;