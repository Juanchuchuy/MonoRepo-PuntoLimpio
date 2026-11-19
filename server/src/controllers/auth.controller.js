import bcrypt from "bcrypt";
import AppError from "../utils/AppError.js";
import { firmarToken } from "../utils/jwt.js";
import * as Usuario from "../models/usuario.model.js";

const SALT_ROUNDS = 10;

// Datos que se devuelven al frontend: nunca incluye password_hash.
const publico = (u) => ({ id: u.id_usuario, nombre: u.nombre, apellido: u.apellido, email: u.email, rol: u.rol });

export async function register(req, res) {
  const { nombre, apellido, email, password } = req.body;

  if (await Usuario.buscarPorEmail(email)) throw new AppError("El email ya está registrado", 409);

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  // El rol siempre es "usuario": nunca se toma del body, así nadie puede registrarse como administrador.
  const id = await Usuario.crear({ nombre, apellido, email, passwordHash, rol: "usuario" });

  const user = publico(await Usuario.buscarPorId(id));
  res.status(201).json({ token: firmarToken(user), user });
}

export async function login(req, res) {
  const { email, password } = req.body;

  const usuario = await Usuario.buscarPorEmail(email);
  const valido = usuario?.activo && usuario.password_hash && (await bcrypt.compare(password, usuario.password_hash));
  // Mismo mensaje para "no existe" y "contraseña incorrecta": no revela qué emails están registrados.
  if (!valido) throw new AppError("Credenciales inválidas", 401);

  const user = publico(usuario);
  res.json({ token: firmarToken(user), user });
}

// Devuelve el usuario de la sesión actual (el frontend lo usa al recargar la página).
export async function me(req, res) {
  const usuario = await Usuario.buscarPorId(req.user.id);
  if (!usuario || !usuario.activo) throw new AppError("Sesión inválida", 401);
  res.json({ user: publico(usuario) });
}
