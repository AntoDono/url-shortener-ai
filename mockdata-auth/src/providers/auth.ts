import { AuthBindings } from "@refinedev/core";

export const authProvider: AuthBindings = {
  login: async ({ email, password }) => {
    // In a real app, you would validate against your API
    // For mock data, we'll use localStorage to simulate auth
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u: any) => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem("auth", JSON.stringify(user));
      return {
        success: true,
        redirectTo: "/",
      };
    }

    return {
      success: false,
      error: {
        message: "Invalid email or password",
        name: "Invalid login",
      },
    };
  },
  register: async ({ email, password }) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // Check if user already exists
    if (users.find((u: any) => u.email === email)) {
      return {
        success: false,
        error: {
          message: "User already exists",
          name: "Register Error",
        },
      };
    }

    const newUser = {
      id: crypto.randomUUID(),
      email,
      password,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("auth", JSON.stringify(newUser));

    return {
      success: true,
      redirectTo: "/",
    };
  },
  logout: async () => {
    localStorage.removeItem("auth");
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
    const user = localStorage.getItem("auth");
    if (user) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      logout: true,
      redirectTo: "/login",
    };
  },
  getIdentity: async () => {
    const user = localStorage.getItem("auth");
    if (user) {
      const parsedUser = JSON.parse(user);
      return {
        id: parsedUser.id,
        email: parsedUser.email,
      };
    }
    return null;
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
};
