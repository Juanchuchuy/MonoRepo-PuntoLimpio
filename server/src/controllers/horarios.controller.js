import AppError from "../utils/AppError.js";
import * as Horario from "../models/horario.model.js";

// Normaliza el body ya validado.
function datosDelBody(body) {
  return {
    id_punto: Number(body.id_punto),
    dia_semana: body.dia_semana,
    hora_estimada: body.hora_estimada,
    observaciones: body.observaciones || null,
  };
}

export async function listar(req, res) {
  res.json(await Horario.listar());
}

export async function obtener(req, res) {
  const horario = await Horario.buscarPorId(Number(req.params.id));
  if (!horario) throw new AppError("El horario no existe", 404);
  res.json(horario);
}

export async function crear(req, res) {
  const datos = datosDelBody(req.body);

  if (!(await Horario.puntoExiste(datos.id_punto))) throw new AppError("El punto elegido no existe", 400);
  if (await Horario.buscarRepetido(datos.id_punto, datos.dia_semana, datos.hora_estimada)) {
    throw new AppError("Ese punto ya tiene un horario ese día a esa hora", 409);
  }

  const id = await Horario.crear(datos);
  res.status(201).json(await Horario.buscarPorId(id));
}

export async function actualizar(req, res) {
  const id = Number(req.params.id);
  if (!(await Horario.buscarPorId(id))) throw new AppError("El horario no existe", 404);

  const datos = datosDelBody(req.body);
  if (!(await Horario.puntoExiste(datos.id_punto))) throw new AppError("El punto elegido no existe", 400);

  const repetido = await Horario.buscarRepetido(datos.id_punto, datos.dia_semana, datos.hora_estimada);
  if (repetido && repetido.id_horario !== id) throw new AppError("Ese punto ya tiene un horario ese día a esa hora", 409);

  await Horario.actualizar(id, datos);
  res.json(await Horario.buscarPorId(id));
}

export async function eliminar(req, res) {
  const id = Number(req.params.id);
  if (!(await Horario.buscarPorId(id))) throw new AppError("El horario no existe", 404);

  await Horario.eliminar(id);
  res.status(204).end();
}
