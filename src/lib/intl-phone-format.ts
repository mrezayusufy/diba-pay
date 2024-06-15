import { _p } from "./utils"
export {}; 
// @ts-ignore
Intl.NumberFormat.prototype.formatPhone = (phoneNumber: string): string =>  _p(phoneNumber.replace(/\D/g, '').replace(/(\d{1,3})(\d{3})(\d{3})(\d{4})/, '$1 ($2) $3-$4'));
