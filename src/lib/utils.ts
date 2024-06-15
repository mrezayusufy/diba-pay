import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))
const __ = (input: string, swap: string, pattern = /:attr/g ) => input.replace(pattern, swap); 
/**
 * convert latin to persian
 * @param i string input persian digits
 * @param p readonly persian digits 
 * @returns latin digits
 */
const _p = (i: string, p = '۰۱۲۳۴۵۶۷۸۹') => i.replace(/\d/g, (c: any) => p[c]) 
/**
 * convert persian to latin
 * @param i string input latin digits 
 * @param p readonly persian digits 
 * @param l readonly latin digits
 * @returns 
 */
const _l = (i: string, p = '۰۱۲۳۴۵۶۷۸۹', l = '0123456789') => i.replace(/[۰-۹]/g, (c: string) => l[p.indexOf(c)]);

export { __, _p, cn, _l }