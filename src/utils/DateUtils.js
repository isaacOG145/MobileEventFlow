// utils/dateUtils.js
import { format, parseISO } from 'date-fns';
// Importación CORRECTA para v3+ (usa el paquete separado de locales)
import { es } from 'date-fns/locale';

/**
 * Formatea fecha a "15 abril 2023"
 * @param {string|Date} date
 */
export const formatDate = (date) => {
  try {
    const parsedDate = typeof date === 'string' ? parseISO(date) : date;
    return format(parsedDate, 'dd MMMM yyyy', { locale: es }); // Usa el locale directamente
  } catch {
    return 'Fecha inválida';
  }
};

/**
 * Formatea hora "14:30" → "2:30pm"
 */
export const formatTime = (timeStr) => {
  if (!timeStr) return '';
  
  try {
    const [hours, minutes] = timeStr.split(':');
    const hourInt = parseInt(hours, 10);
    const suffix = hourInt >= 12 ? 'pm' : 'am';
    const displayHour = hourInt % 12 || 12;
    return `${displayHour}:${minutes.padStart(2, '0')}${suffix}`;
  } catch {
    return timeStr;
  }
};