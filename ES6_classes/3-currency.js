export default class Currency {
    constructor(code, name) {
      // Validate and assign values
      if (typeof code !== 'string') {
        throw new TypeError('Code must be a string');
      }
      if (typeof name !== 'string') {
        throw new TypeError('Name must be a string');
      }
      
      this._code = code;
      this._name = name;
    }
  
    // Getter and setter for code
    get code() {
      return this._code;
    }
  
    set code(value) {
      if (typeof value !== 'string') {
        throw new TypeError('Code must be a string');
      }
      this._code = value;
    }
  
    // Getter and setter for name
    get name() {
      return this._name;
    }
  
    set name(value) {
      if (typeof value !== 'string') {
        throw new TypeError('Name must be a string');
      }
      this._name = value;
    }
  
    // Method to display full currency
    displayFullCurrency() {
      return `${this._name} (${this._code})`;
    }
  }
