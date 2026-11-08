import { storageService } from './storage';

export interface AdminUser {
  email: string;
  name: string;
  role: string;
  token: string;
}

export const DEMO_CREDENTIALS = {
  email: 'admin@amproperty.demo',
  password: 'Demo@12345',
  name: 'Abdul Malik Khan',
  role: 'Managing Principal & Admin'
};

export const authService = {
  /**
   * Demo Authentication Service
   * NOTE: This is for local client demonstration and prototype evaluation only.
   * Production deployment should connect to Supabase Auth or a secure OAuth/JWT backend
   * with salted hash verification and Row Level Security (RLS).
   */
  login(email: string, pass: string): { success: boolean; error?: string; user?: AdminUser } {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = pass.trim();

    if (cleanEmail === DEMO_CREDENTIALS.email.toLowerCase() && cleanPass === DEMO_CREDENTIALS.password) {
      const user: AdminUser = {
        email: DEMO_CREDENTIALS.email,
        name: DEMO_CREDENTIALS.name,
        role: DEMO_CREDENTIALS.role,
        token: `demo-token-${Date.now()}`
      };
      storageService.setAuthSession(user);
      return { success: true, user };
    }

    return {
      success: false,
      error: 'Invalid credentials. Please use demo credentials: admin@amproperty.demo / Demo@12345'
    };
  },

  getCurrentUser(): AdminUser | null {
    return storageService.getAuthSession();
  },

  isAuthenticated(): boolean {
    return storageService.getAuthSession() !== null;
  },

  logout(): void {
    storageService.clearAuthSession();
  }
};
