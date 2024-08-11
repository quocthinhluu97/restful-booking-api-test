export default class DateUtil {
    /**
     * Get the date n days back from today in 'yyyy-mm-dd' format.
     * @param n { number } the number of days to go back.
     * @returns 
     */
    static getNDaysBack(n: number): string {
        const date = new Date();
        date.setDate(date.getDate() - n);

        return DateUtil.formatDate(date);
    }

    /**
     * Formats a Date object to a string in 'yyyy-mm-dd' format.
     * @returns { string } the formatted date string. 
     */
    static formatDate(date: Date): string {
        return date.toISOString().split('T')[0];
    }

    /**
     * Get the current date in 'yyyy-mm-dd' format.
     * @returns { string } the current date string.
     */
    static getToday(): string {
        return DateUtil.formatDate(new Date());
    }
}