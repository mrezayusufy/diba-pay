import { api } from './api';

export const fetchCategories = () => api.url('/categories').get().json();