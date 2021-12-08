import { Complete, DateRange } from './types';

const MIN_DATE = new Date(-8640000000000000);
const MAX_DATE = new Date(8640000000000000);

const setDefaultDates = (range: DateRange): Complete<DateRange> => ({
    startDate: range.startDate ? range.startDate : MIN_DATE,
    endDate: range.endDate ? range.endDate : MAX_DATE
});

export default class DateUtils {
    public static doDatesRangesIntersect = (r1: DateRange, r2: DateRange) => {
        const range1: Complete<DateRange> = setDefaultDates(r1);
        const range2: Complete<DateRange> = setDefaultDates(r2);

        if (range2.startDate > range1.endDate || range2.endDate < range1.startDate) {
            return false;
        }
        return true;
    };
}
