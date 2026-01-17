"use client";

import Cookies from 'js-cookie';

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  const token = Cookies.get('token');
  return !!token;
}

export function getToken(): string | undefined {
  return Cookies.get('token');
}
