import bcrypt from "bcrypt";
import AppError from "../utils/AppError.js";
import * as Usuario from "../models/usuario.model.js";
import * as Rol from "../models/rol.model.js";

const SALT_ROUNDS = 10;

export async function listar(req, res) {
  res.json(await Usuario.listar());
}

export async function obtener(req, res) {
  const usuario = await Usuario.buscarParaAdmin(Number(req.params.id));
  if (!usuario) throw new AppError("El usuario no existe", 404);
  res.json(usuario);
}

export async function crear(req, res) {
  const { nombre, apellido, email, password, id_rol, activo } = req.body;

  if (!(await Rol.buscarPorId(id_rol))) throw new AppError("El rol indicado no existe", 400);
  if (await Usuario.buscarPorEmail(email)) throw new AppError("El email ya está registrado", 409);

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const id = await Usuario.crearConRol({ id_rol, nombre, apellido, email, passwordHash, activo: activo ? 1 : 0 });
  res.status(201).json(await Usuario.buscarParaAdmin(id));
}

export async function actualizar(req, res) {
  const id = Number(req.params.id);
  const { nombre, apellido, email, password, id_rol, activo } = req.body;

  const actual = await Usuario.buscarParaAdmin(id);
  if (!actual) throw new AppError("El usuario no existe", 404);

  // Evita que el administrador se deje afuera del panel.
  if (id === req.user.id && (!activo || id_rol !== actual.id_rol)) {
    throw new AppError("No podés desactivar tu cuenta ni cambiar tu propio rol", 409);
  }

  if (!(await Rol.buscarPorId(id_rol))) throw new AppError("El rol indicado no existe", 400);

  const repetido = await Usuario.buscarPorEmail(email);
  if (repetido && repetido.id_usuario !== id) throw new AppError("El email ya está registrado", 409);

  await Usuario.actualizar(id, { id_rol, nombre, apellido, email, activo: activo ? 1 : 0 });
  if (password) await Usuario.cambiarPassword(id, await bcrypt.hash(password, SALT_ROUNDS));

  res.json(await Usuario.buscarParaAdmin(id));
}

export async function eliminar(req, res) {
  const id = Number(req.params.id);

  if (id === req.user.id) throw new AppError("No podés eliminar tu propia cuenta", 409);
  if (!(await Usuario.buscarParaAdmin(id))) throw new AppError("El usuario no existe", 404);

  const relacionados = await Usuario.contarRegistrosYReportes(id);
  if (relacionados > 0) {
    throw new AppError(`No se puede eliminar: tiene ${relacionados} registro(s) o reporte(s). Desactivá la cuenta en su lugar`, 409);
  }

  await Usuario.eliminar(id);
  res.status(204).end();
}