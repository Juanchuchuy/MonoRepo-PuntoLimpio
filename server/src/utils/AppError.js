// Error con código HTTP. Los controladores lo lanzan y errorHandler lo convierte en JSON.
export default class AppError extends Error {
  constructor(mensaje, status = 500) {
    super(mensaje);
    this.status = status;
  }
}
