import { getMinutesAndSecondsFromDurationInSeconds } from '../../lib/time'
describe('getMinutesAndSecondsFromDurationInSeconds', () => {
  describe('for duration < 1 min', () => {
    it('works for 30 seconds', () => {
      expect(getMinutesAndSecondsFromDurationInSeconds(30)).toEqual([0, 30])
    })

    it('returns 30 seconds for 30-second duration', () => {
      expect(getMinutesAndSecondsFromDurationInSeconds(30)[1]).toBe(30)
    })

    it('returns 0 minutes for 30-second duration', () => {
      expect(getMinutesAndSecondsFromDurationInSeconds(30)[0]).toBe(0)
    })
  })
  describe('for duration >= 1 min', () => {
    it('returns 2 minutes and 20 seconds for 140 seconds', () => {
      expect(getMinutesAndSecondsFromDurationInSeconds(140)).toEqual([2, 20])
    })
    it('returns 1 minutes for 60-second duration', () => {
      expect(getMinutesAndSecondsFromDurationInSeconds(60)[0]).toBe(1)
    })
  })
})
