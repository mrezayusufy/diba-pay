declare module 'global' {
  interface NumberFormat {
    formatPhone: (phoneNumber: string) => string;
  }
}

declare global {
  interface NumberFormat {
    formatPhone: (phoneNumber: string) => string;
  }
}