/**
 * Pakistani Rupee (PKR) Formatter
 * Accurately handles Crores (1 Crore = 10,000,000) and Lakhs (1 Lakh = 100,000)
 */
export function formatPKR(amount: number, isRental = false): string {
  if (isNaN(amount) || amount === 0) return 'Price on Call';

  let formatted = '';
  if (amount >= 10000000) {
    const crores = amount / 10000000;
    formatted = `PKR ${crores % 1 === 0 ? crores : crores.toFixed(2)} Crore`;
  } else if (amount >= 100000) {
    const lakhs = amount / 100000;
    formatted = `PKR ${lakhs % 1 === 0 ? lakhs : lakhs.toFixed(2)} Lakh`;
  } else {
    formatted = `PKR ${amount.toLocaleString('en-PK')}`;
  }

  if (isRental) {
    return `${formatted} / month`;
  }
  return formatted;
}

/**
 * Format Full PKR Number with commas (e.g. PKR 45,000,000)
 */
export function formatFullPKR(amount: number): string {
  if (isNaN(amount)) return 'PKR 0';
  return `PKR ${amount.toLocaleString('en-PK')}`;
}

/**
 * Generate formatted WhatsApp URL with prefilled message
 */
export function getWhatsAppUrl(phone: string, text: string): string {
  // Strip non-numeric characters except +
  let cleanNumber = phone.replace(/[^\d]/g, '');
  if (cleanNumber.startsWith('0')) {
    cleanNumber = '92' + cleanNumber.substring(1);
  } else if (!cleanNumber.startsWith('92')) {
    cleanNumber = '92' + cleanNumber;
  }
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
}

/**
 * Format Date to readable string (e.g. 08 Nov 2026)
 */
export function formatDate(dateString: string): string {
  try {
    const d = new Date(dateString);
    return d.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  } catch {
    return dateString;
  }
}

/**
 * Format time distance (e.g. 2 hours ago, Yesterday)
 */
export function formatRelativeTime(dateString: string): string {
  try {
    const diff = Date.now() - new Date(dateString).getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 5) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days === 1) return 'Yesterday';
    if (days < 30) return `${days}d ago`;
    return formatDate(dateString);
  } catch {
    return 'Recently';
  }
}
