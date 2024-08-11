export interface ICurrency {
  success: boolean,
  timestamp: number,
  base: string,
  date: string,
  rates: { 
    USD: number, 
    EUR: number, 
    UAH: number 
  }
}
