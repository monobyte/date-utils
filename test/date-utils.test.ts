import DateUtils from '../src/date-utils';
import { DateRange } from '../src/types';

/**
 * DateUtils Tests
 */
describe('DateUtils', () => {
    describe('doDatesRangesIntersect', () => {
        const jan01ToJan10: DateRange = {
            startDate: new Date('01 Jan 2021'),
            endDate: new Date('10 Jan 2021')
        };
        const jan05ToJan30: DateRange = {
            startDate: new Date('05 Jan 2021'),
            endDate: new Date('31 Jan 2021')
        };
        const jan05ToJan09: DateRange = {
            startDate: new Date('05 Jan 2021'),
            endDate: new Date('09 Jan 2021')
        };
        const feb01toFeb10: DateRange = {
            startDate: new Date('01 Feb 2021'),
            endDate: new Date('10 Feb 2021')
        };
        const missingStartDateToJan30: DateRange = {
            endDate: new Date('30 Jan 2021')
        };
        const fromJan20MissingEndDate: DateRange = {
            startDate: new Date('20 Jan 2021')
        };

        describe('intersecting dates', () => {
            it('is true when date range A overlaps date range B', () => {
                expect(DateUtils.doDatesRangesIntersect(jan01ToJan10, jan05ToJan30)).toBeTruthy();
                expect(DateUtils.doDatesRangesIntersect(jan01ToJan10, jan05ToJan09)).toBeTruthy();
                expect(DateUtils.doDatesRangesIntersect(jan05ToJan09, jan01ToJan10)).toBeTruthy();
                expect(DateUtils.doDatesRangesIntersect(jan05ToJan09, jan01ToJan10)).toBeTruthy();
            });

            it(`is false when range A doesn't overlap range B`, () => {
                // Range A starts first
                expect(DateUtils.doDatesRangesIntersect(jan01ToJan10, feb01toFeb10)).toBeFalsy();
                // Range B starts first
                expect(DateUtils.doDatesRangesIntersect(feb01toFeb10, jan01ToJan10)).toBeFalsy();
            });
        });

        describe('missing start dates', () => {
            it('is true when range B starts before end of range A', () => {
                expect(
                    DateUtils.doDatesRangesIntersect(missingStartDateToJan30, jan01ToJan10)
                ).toBeTruthy();
            });

            it('is true when range B starts before range A and they overlap', () => {
                expect(
                    DateUtils.doDatesRangesIntersect(jan01ToJan10, missingStartDateToJan30)
                ).toBeTruthy();
            });

            it(`is false when range A doesn't overlap range B`, () => {
                expect(
                    DateUtils.doDatesRangesIntersect(missingStartDateToJan30, feb01toFeb10)
                ).toBeFalsy();
            });
        });

        describe('missing end dates', () => {
            it('is true when range B starts within range A', () => {
                expect(
                    DateUtils.doDatesRangesIntersect(fromJan20MissingEndDate, feb01toFeb10)
                ).toBeTruthy();
            });

            it('is true when range A ends after range B starts', () => {
                expect(
                    DateUtils.doDatesRangesIntersect(jan05ToJan30, fromJan20MissingEndDate)
                ).toBeTruthy();
            });

            it(`is false when range A doesn't overlap range B`, () => {
                expect(
                    DateUtils.doDatesRangesIntersect(jan01ToJan10, fromJan20MissingEndDate)
                ).toBeFalsy();
            });
        });
    });
});
