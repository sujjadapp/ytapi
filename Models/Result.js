module.exports = class Result {
  constructor(response, description, code, stackTrace, dice, version) {
    this.version = version || "1.0";
    this.code = code || 1;
    this.response = response || [];
    this.description = description || "";
    Object.defineProperty(this, 'stackTrace', {
      get: function () {
        return this._stackTrace;
      },
      set: function (value) {
        this._stackTrace = value;
      },
    });
    this.stackTrace = stackTrace;
    this.dice = dice;
    this.requisitionDate = new Date().toISOString();
  }
}
