export default class DataMessage {
  constructor({
    data,
    message,
    isError,
  }) {
    this.data = data || {};
    this.message = message || '';
    this.isError = isError || false;
    return this;
  }

  getData() {
    return this.data;
  }

  getMessage() {
    return this.message;
  }
}