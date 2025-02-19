import { create } from "zustand";
import CryptoJS from "crypto-js";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY || "default_secret";

interface User {
  name: string;
  email: string;
  mobile: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  signup: (user: User, password: string) => boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const encryptData = (data: any) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

const decryptData = (cipherText: string) => {
  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch {
    return null;
  }
};

const generateToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

const getStoredAuth = (): { user: AuthState["user"]; token: string | null } => {
  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");

  return {
    user: storedUser ? decryptData(storedUser) : null,
    token: storedToken || null,
  };
};

const useAuthStore = create<AuthState>((set) => ({
  ...getStoredAuth(),

  signup: (user, password) => {
    const existingUser = localStorage.getItem("user");
    if (existingUser) return false;

    const hashedPassword = bcrypt.hashSync(password, 10);
    const encryptedUser = encryptData({ ...user, password: hashedPassword });

    localStorage.setItem("user", encryptedUser);
    return true;
  },

  login: (email, password) => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return false;

    const user = decryptData(storedUser);
    if (!user || !user.password) return false;

    if (user.email === email && bcrypt.compareSync(password, user.password)) {
      const token = generateToken();
      localStorage.setItem("token", token);
      set({ user, token });
      return true;
    }

    return false;
  },

  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },
}));

export default useAuthStore;
