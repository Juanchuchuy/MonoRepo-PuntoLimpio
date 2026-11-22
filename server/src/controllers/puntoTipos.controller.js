import AppError from "../utils/AppError.js";
import * as PuntoTipo from "../models/puntoTipo.model.js";

// Verifica que el punto y el tipo elegidos existan antes de tocar la tabla.
async function verificarReferencias(idPunto, idTipo) {
  if (!(await PuntoTipo.puntoExiste(idPunto))) throw new AppError("El punto elegido no existe", 400);
  if (!(await PuntoTipo.tipoExiste(idTipo))) throw new AppError("El tipo de residuo elegido no existe", 400);
}

export async function opciones(req, res) {
  res.json(await PuntoTipo.opciones());
}

export async function listar(req, res) {
  res.json(await PuntoTipo.listar());
}

export async function obtener(req, res) {
  const asignacion = await PuntoTipo.buscar(Number(req.params.idPunto), Number(req.params.idTipo));
  if (!asignacion) throw new AppError("La asignación no existe", 404);
  res.json(asignacion);
}

export async function crear(req, res) {
  const idPunto = Number(req.body.id_punto);
  const idTipo = Number(req.body.id_tipo);
  await verificarReferencias(idPunto, idTipo);

  if (await PuntoTipo.buscar(idPunto, idTipo)) throw new AppError("Ese punto ya recibe ese tipo de residuo", 409);

  await PuntoTipo.crear(idPunto, idTipo);
  res.status(201).json(await PuntoTipo.buscar(idPunto, idTipo));
}

export async function actualizar(req, res) {
  const idPunto = Number(req.params.idPunto);
  const idTipo = Number(req.params.idTipo);
  if (!(await PuntoTipo.buscar(idPunto, idTipo))) throw new AppError("La asignación no existe", 404);

  const nuevoPunto = Number(req.body.id_punto);
  const nuevoTipo = Number(req.body.id_tipo);
  await verificarReferencias(nuevoPunto, nuevoTipo);

  const cambioLaClave = nuevoPunto !== idPunto || nuevoTipo !== idTipo;
  if (cambioLaClave && (await PuntoTipo.buscar(nuevoPunto, nuevoTipo))) {
    throw new AppError("Ese punto ya recibe ese tipo de residuo", 409);
  }

  await PuntoTipo.actualizar(idPunto, idTipo, nuevoPunto, nuevoTipo);
  res.json(await PuntoTipo.buscar(nuevoPunto, nuevoTipo));
}

export async function eliminar(req, res) {
  const idPunto = Number(req.params.idPunto);
  const idTipo = Number(req.params.idTipo);
  if (!(await PuntoTipo.buscar(idPunto, idTipo))) throw new AppError("La asignación no existe", 404);

  await PuntoTipo.eliminar(idPunto, idTipo);
  res.status(204).end();
}
