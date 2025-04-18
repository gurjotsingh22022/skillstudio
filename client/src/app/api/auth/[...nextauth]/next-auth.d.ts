import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: string; // Now role is a string like "admin"
    };
  }

  interface User {
    id: string;
    role: { Title: string }; // Match the database structure
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string; // Now role is a string
  }
}
