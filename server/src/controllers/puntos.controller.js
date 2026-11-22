import AppError from "../utils/AppError.js";
import * as Punto from "../models/punto.model.js";

// Normaliza el body ya validado: números y booleano a 0/1.
function datosDelBody(body) {
  return {
    id_calle: Number(body.id_calle),
    nombre: body.nombre,
    referencia: body.referencia || null,
    latitud: Number(body.latitud),
    longitud: Number(body.longitud),
    activo: body.activo === undefined ? 1 : body.activo === true || body.activo === "true" || body.activo === 1 ? 1 : 0,
  };
}

// Responde 400 si la calle no existe, en vez de dejar que falle la clave foránea.
async function verificarCalle(idCalle) {
  if (!(await Punto.calleExiste(idCalle))) throw new AppError("La calle elegida no existe", 400);
}

export async function opciones(req, res) {
  res.json(await Punto.opciones());
}

export async function listar(req, res) {
  res.json(await Punto.listar());
}

export async function obtener(req, res) {
  const punto = await Punto.buscarPorId(Number(req.params.id));
  if (!punto) throw new AppError("El punto no existe", 404);
  res.json(punto);
}

export async function crear(req, res) {
  const datos = datosDelBody(req.body);
  await verificarCalle(datos.id_calle);

  const id = await Punto.crear(datos, req.user.id);
  res.status(201).json(await Punto.buscarPorId(id));
}

export async function actualizar(req, res) {
  const id = Number(req.params.id);
  if (!(await Punto.buscarPorId(id))) throw new AppError("El punto no existe", 404);

  const datos = datosDelBody(req.body);
  await verificarCalle(datos.id_calle);

  await Punto.actualizar(id, datos);
  res.json(await Punto.buscarPorId(id));
}

export async function eliminar(req, res) {
  const id = Number(req.params.id);
  if (!(await Punto.buscarPorId(id))) throw new AppError("El punto no existe", 404);

  // El historial de recolección no se borra: si el punto ya tiene registros, se puede desactivar pero no eliminar.
  const registros = await Punto.contarRegistros(id);
  if (registros > 0) {
    throw new AppError(`No se puede eliminar: el punto tiene ${registros} registro(s) de recolección. Podés desactivarlo.`, 409);
  }

  await Punto.eliminar(id);
  res.status(204).end();
}
