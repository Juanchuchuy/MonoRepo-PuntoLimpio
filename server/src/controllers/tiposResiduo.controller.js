import AppError from "../utils/AppError.js";
import * as Tipo from "../models/tipoResiduo.model.js";

export async function listar(req, res) {
  res.json(await Tipo.listar());
}

export async function obtener(req, res) {
  const tipo = await Tipo.buscarPorId(Number(req.params.id));
  if (!tipo) throw new AppError("El tipo de residuo no existe", 404);
  res.json(tipo);
}

export async function crear(req, res) {
  const { nombre, descripcion } = req.body;

  if (await Tipo.buscarPorNombre(nombre)) throw new AppError("Ya existe un tipo de residuo con ese nombre", 409);

  const id = await Tipo.crear({ nombre, descripcion: descripcion || null });
  res.status(201).json(await Tipo.buscarPorId(id));
}

export async function actualizar(req, res) {
  const id = Number(req.params.id);
  const { nombre, descripcion } = req.body;

  if (!(await Tipo.buscarPorId(id))) throw new AppError("El tipo de residuo no existe", 404);

  const repetido = await Tipo.buscarPorNombre(nombre);
  if (repetido && repetido.id_tipo !== id) throw new AppError("Ya existe un tipo de residuo con ese nombre", 409);

  await Tipo.actualizar(id, { nombre, descripcion: descripcion || null });
  res.json(await Tipo.buscarPorId(id));
}

export async function eliminar(req, res) {
  const id = Number(req.params.id);

  if (!(await Tipo.buscarPorId(id))) throw new AppError("El tipo de residuo no existe", 404);

  // Si se borrara con puntos asignados, la base los desvincularía en silencio: se bloquea.
  const uso = await Tipo.contarUso(id);
  if (uso.puntos > 0 || uso.reportes > 0) {
    throw new AppError(`No se puede eliminar: lo usan ${uso.puntos} punto(s) y ${uso.reportes} reporte(s)`, 409);
  }

  await Tipo.eliminar(id);
  res.status(204).end();
}
