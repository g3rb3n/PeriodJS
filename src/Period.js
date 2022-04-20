
export class Period {
  constructor(from, till) {
    this.from = from;
    this.till = till;
  }
  overlaps(that) {
    return (this.from >= that.from && this.from < that.till) ||
      (that.from >= this.from && that.from < this.till) ||
      (this.till <= that.till && this.till > that.from) ||
      (that.till <= this.till && that.till > this.from);
  }
  overlap(that) {
    if (!this.overlaps(that)) throw new Error(`${this} does not overlap ${that}`);
    let from = (this.from > that.from) ? this.from : that.from;
    let till = (this.till < that.till) ? this.till : that.till;
    return new Period(from, till);
  }
  isConsecutive(that) {
    return this.till.getTime() == that.from.getTime();
  }
  join(that) {
    if (!this.isConsecutive(that)) throw new Error(`${this} is not followed by ${that}`);
    return new Period(this.from, that.till);
  }
  equals(that) {
    return this.from.getTime() == that.from.getTime() &&
      this.till.getTime() == that.till.getTime();
  }
  toString() {
    return `${this.from.toISOString()} - ${this.till.toISOString()}`;
  }
  toDays() {
    return this.toMilliseconds() / 86400000;
  }
  toHours() {
    return this.toMilliseconds() / 3600000;
  }
  toMinutes() {
    return this.toMilliseconds() / 60000;
  }
  toSeconds() {
    return this.toMilliseconds() / 1000;
  }
  toMilliseconds() {
    return this.till.getTime() - this.from.getTime();
  }
  getTime() {
    return this.toMilliseconds();
  }
  getDays() {
    return Math.floor(this.toDays());
  }
  getHours() {
    return Math.floor(this.toHours()) % 24;
  }
  getMinutes() {
    return Math.floor(this.toMinutes()) % 60;
  }
  getSeconds() {
    return Math.floor(this.toSeconds()) % 60;
  }
  getMilliseconds() {
    return this.toMilliseconds() % 1000;
  }
  setTillByHoursDelta(hours) {
    return this.setTillByMillisecondsDelta(hours * 3600000);
  }
  setTillByMillisecondsDelta(ms) {
    let till = new Date(this.from);
    till.setMilliseconds(till.getMilliseconds() + ms);
    return new Period(this.from, till);
  }
  static sort(periods) {
    return periods.sort((a,b) => a.from.getTime() - b.from.getTime());
  }
  static merge(periods) {
    Period.sort(periods);
    let ret = [];
    let merged = null;
    for (let period of periods) {
      if (merged == null) {
        merged = period;
        continue;
      }
      if (merged.isConsecutive(period)){
        merged = merged.join(period);
        continue;
      }
      ret.push(merged);
      merged = period;
    }
    ret.push(merged);
    return ret;
  }
}
