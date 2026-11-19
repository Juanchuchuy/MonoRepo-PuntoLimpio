import AppError from "../utils/AppError.js";
import * as Rol from "../models/rol.model.js";

// Roles de los que dependen el login y los permisos: no se pueden renombrar ni eliminar.
const ROLES_PROTEGIDOS = ["administrador", "usuario"];
const esProtegido = (rol) => ROLES_PROTEGIDOS.includes(rol.nombre.toLowerCase());
// El frontend usa "protegido" para deshabilitar acciones que el backend de todos modos rechaza.
const conProteccion = (rol) => ({ ...rol, protegido: esProtegido(rol) });

export async function listar(req, res) {
  const roles = await Rol.listar();
  res.json(roles.map(conProteccion));
}

export async function obtener(req, res) {
  const rol = await Rol.buscarPorId(Number(req.params.id));
  if (!rol) throw new AppError("El rol no existe", 404);
  res.json(conProteccion(rol));
}

export async function crear(req, res) {
  const { nombre, descripcion } = req.body;

  if (await Rol.buscarPorNombre(nombre)) throw new AppError("Ya existe un rol con ese nombre", 409);

  const id = await Rol.crear({ nombre, descripcion: descripcion || null });
  res.status(201).json(conProteccion(await Rol.buscarPorId(id)));
}

export async function actualizar(req, res) {
  const id = Number(req.params.id);
  const { nombre, descripcion } = req.body;

  const actual = await Rol.buscarPorId(id);
  if (!actual) throw new AppError("El rol no existe", 404);

  if (esProtegido(actual) && nombre !== actual.nombre) {
    throw new AppError(`El rol "${actual.nombre}" no se puede renombrar`, 409);
  }

  const repetido = await Rol.buscarPorNombre(nombre);
  if (repetido && repetido.id_rol !== id) throw new AppError("Ya existe un rol con ese nombre", 409);

  await Rol.actualizar(id, { nombre, descripcion: descripcion || null });
  res.json(conProteccion(await Rol.buscarPorId(id)));
}

export async function eliminar(req, res) {
  const id = Number(req.params.id);

  const actual = await Rol.buscarPorId(id);
  if (!actual) throw new AppError("El rol no existe", 404);

  if (esProtegido(actual)) throw new AppError(`El rol "${actual.nombre}" no se puede eliminar`, 409);

  const usuarios = await Rol.contarUsuarios(id);
  if (usuarios > 0) {
    throw new AppError(`No se puede eliminar: hay ${usuarios} usuario(s) con este rol`, 409);
  }

  await Rol.eliminar(id);
  res.status(204).end();
}