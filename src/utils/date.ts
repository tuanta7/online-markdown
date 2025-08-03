export function formatDateToISO(date: string) {
    if (!date) return '';

    if (date.includes('T')) return date;
    return new Date(date).toISOString();
}
