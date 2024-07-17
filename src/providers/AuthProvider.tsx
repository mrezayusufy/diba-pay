"use client";
import React from "react";
 
export const AuthContext = React.createContext("")
export const AuthProvider: React.FC<{ token: string, children: React.ReactNode }> = ({ token, children }) => {
  return <AuthContext.Provider value={token}>{children}</AuthContext.Provider>;
};