import { reactive } from 'vue';
import { loadCartForUser } from './shopStore';

const SESSION_KEY = 'coffe-time-session';
const USERS_KEY = 'coffe-time-users';
const DEFAULT_USER = {
  user: 'Coffe',
  password: '2026',
  role: 'admin',
};

function getUsers() {
  const savedUsers = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');

  if (Array.isArray(savedUsers) && savedUsers.length > 0) {
    const users = savedUsers.map((savedUser) => ({
      ...savedUser,
      role: savedUser.user?.trim().toLowerCase() === DEFAULT_USER.user.toLowerCase() ? 'admin' : 'user',
    }));
    saveUsers(users);
    return users;
  }

  localStorage.setItem(USERS_KEY, JSON.stringify([DEFAULT_USER]));
  return [DEFAULT_USER];
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getSession() {
  try {
    const savedSession = localStorage.getItem(SESSION_KEY);

    if (!savedSession) {
      return null;
    }

    if (savedSession === 'true') {
      return {
        user: DEFAULT_USER.user,
        role: DEFAULT_USER.role,
      };
    }

    return JSON.parse(savedSession);
  } catch {
    return null;
  }
}

const currentSession = getSession();

export const authState = reactive({
  isAuthenticated: Boolean(currentSession) || localStorage.getItem(SESSION_KEY) === 'true',
  currentUser: currentSession,
});

export function login(user, password) {
  const normalizedUser = user.trim().toLowerCase();
  const normalizedPassword = password.trim();
  const foundUser = getUsers().find(
    (savedUser) =>
      savedUser.user.trim().toLowerCase() === normalizedUser &&
      savedUser.password === normalizedPassword
  );

  if (foundUser) {
    const session = {
      user: foundUser.user,
      role: foundUser.role,
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    authState.isAuthenticated = true;
    authState.currentUser = session;
    loadCartForUser(session.user);
  }

  return Boolean(foundUser);
}

export function register(user, password) {
  const trimmedUser = user.trim();
  const trimmedPassword = password.trim();
  const users = getUsers();
  const exists = users.some(
    (savedUser) => savedUser.user.trim().toLowerCase() === trimmedUser.toLowerCase()
  );

  if (exists) {
    return {
      ok: false,
      message: 'Ese usuario ya existe.',
    };
  }

  users.push({
    user: trimmedUser,
    password: trimmedPassword,
    role: 'user',
  });
  saveUsers(users);

  return {
    ok: true,
    message: 'Cuenta creada correctamente. Ya puedes iniciar sesion.',
  };
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
  authState.isAuthenticated = false;
  authState.currentUser = null;
  loadCartForUser(null);
}

export function isAdmin() {
  return authState.currentUser?.role === 'admin';
}
