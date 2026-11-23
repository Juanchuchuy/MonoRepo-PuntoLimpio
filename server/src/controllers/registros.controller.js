import AppError from "../utils/AppError.js";
import * as Registro from "../models/registro.model.js";

// Normaliza el body ya validado.
function datosDelBody(body) {
  return {
    id_punto: Number(body.id_punto),
    fecha_hora: body.fecha_hora,
    estado: body.estado,
    observaciones: body.observaciones || null,
  };
}

export async function listar(req, res) {
  res.json(await Registro.listar());
}

export async function obtener(req, res) {
  const registro = await Registro.buscarPorId(Number(req.params.id));
  if (!registro) throw new AppError("El registro no existe", 404);
  res.json(registro);
}

export async function crear(req, res) {
  const datos = datosDelBody(req.body);
  if (!(await Registro.puntoExiste(datos.id_punto))) throw new AppError("El punto elegido no existe", 400);

  // Quien registra la recolección sale del token, nunca del body.
  const id = await Registro.crear(datos, req.user.id);
  res.status(201).json(await Registro.buscarPorId(id));
}

export async function actualizar(req, res) {
  const id = Number(req.params.id);
  if (!(await Registro.buscarPorId(id))) throw new AppError("El registro no existe", 404);

  const datos = datosDelBody(req.body);
  if (!(await Registro.puntoExiste(datos.id_punto))) throw new AppError("El punto elegido no existe", 400);

  await Registro.actualizar(id, datos);
  res.json(await Registro.buscarPorId(id));
}

export async function eliminar(req, res) {
  const id = Number(req.params.id);
  if (!(await Registro.buscarPorId(id))) throw new AppError("El registro no existe", 404);

  await Registro.eliminar(id);
  res.status(204).end();
}
