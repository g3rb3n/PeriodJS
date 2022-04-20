import {Period} from '../src/Period.js';

import assert from 'assert';
//import sinon from 'sinon';
//import { expect } from 'chai';


describe('Period', () => {
  describe('#constructor', () => {
    it('should set from and till', () => {
      const from = new Date('20022-04-18T00:00:00.000Z');
      const till = new Date('20022-04-19T00:00:00Z.000');
      let period = new Period(from, till);
      assert.equal(period.from == from, true);
      assert.equal(period.till == till, true);
    });
  });
  describe('#overlaps()', () => {
    it('should overlap each other', function () {
      let hour = new Period(new Date('2022-04-16T05:00:00.000Z'), new Date('2022-04-16T06:00:00.000Z'));
      let trip = new Period(new Date('2022-04-16T05:00:00.000Z'), new Date('2022-04-16T05:45:00.000Z'));
      assert.equal(hour.overlaps(trip), true);
      assert.equal(trip.overlaps(hour), true);
    });
    it('should not overlap each other', function () {
      let hour = new Period(new Date('2022-04-16T05:00:00.000Z'), new Date('2022-04-16T06:00:00.000Z'));
      let trip = new Period(new Date('2022-04-16T06:00:00.000Z'), new Date('2022-04-16T06:45:00.000Z'));
      assert.equal(hour.overlaps(trip), false);
      assert.equal(trip.overlaps(hour), false);
    });
    it('should not overlap each other', function () {
      let hour = new Period(new Date('2022-04-16T05:00:00.000Z'), new Date('2022-04-16T06:00:00.000Z'));
      let trip = new Period(new Date('2022-04-16T04:00:00.000Z'), new Date('2022-04-16T05:00:00.000Z'));
      assert.equal(hour.overlaps(trip), false);
      assert.equal(trip.overlaps(hour), false);
    });
  });
  describe('#overlap()', () => {
    it('should return proper overlap', function () {
      let a = new Period(new Date('2022-04-16T00:00:00.000Z'), new Date('2022-04-16T01:00:00.000Z'));
      let b = new Period(new Date('2022-04-16T00:59:00.000Z'), new Date('2022-04-16T01:59:00.000Z'));
      let c = new Period(new Date('2022-04-16T00:59:59.000Z'), new Date('2022-04-16T01:59:00.000Z'));
      assert.equal(a.overlap(b).toMilliseconds(), 60000);
      assert.equal(b.overlap(a).toMilliseconds(), 60000);
      assert.equal(a.overlap(c).toMilliseconds(), 1000);
    });
  });
  describe('#overlap() non overlapping', () => {
    it('should thow error if there is no overlap', function () {
      let a = new Period(new Date('2022-04-16T00:00:00.000Z'), new Date('2022-04-16T01:00:00.000Z'));
      let b = new Period(new Date('2022-04-16T04:00:59.000Z'), new Date('2022-04-16T01:59:00.000Z'));
      assert.throws(() => a.overlap(b), Error);
      assert.throws(() => b.overlap(a), Error);
    });
  });
  describe('#isConsequtive()', () => {
    it('should only return true if b follows a', function () {
      let a = new Period(new Date('2022-04-16T00:00:00.000Z'), new Date('2022-04-16T01:00:00.000Z'));
      let b = new Period(new Date('2022-04-16T01:00:00.000Z'), new Date('2022-04-16T02:00:00.000Z'));
      assert.equal(a.isConsequtive(b), true);
      assert.equal(b.isConsequtive(a), false);
    });
  });
  describe('#join()', () => {
    it('should return the joined period', function () {
      let a = new Period(new Date('2022-04-16T00:00:00.000Z'), new Date('2022-04-16T01:00:00.000Z'));
      let b = new Period(new Date('2022-04-16T01:00:00.000Z'), new Date('2022-04-16T02:00:00.000Z'));
      let c = new Period(new Date('2022-04-16T00:00:00.000Z'), new Date('2022-04-16T02:00:00.000Z'));
      assert.equal(a.join(b).toMilliseconds(), c.toMilliseconds());
    });
  });
  describe('#join()', () => {
    it('should not join', function () {
      let a = new Period(new Date('2022-04-16T00:00:00.000Z'), new Date('2022-04-16T01:00:00.000Z'));
      let b = new Period(new Date('2022-04-16T01:00:00.001Z'), new Date('2022-04-16T02:00:00.000Z'));
      assert.throws(() => a.join(b), Error);
    });
  });
  describe('#equals()', () => {
    it('should return true if from and till equals', function () {
      let a = new Period(new Date('2022-04-16T00:00:00.000Z'), new Date('2022-04-16T01:00:00.000Z'));
      let b = new Period(new Date('2022-04-16T01:00:00.000Z'), new Date('2022-04-16T02:00:00.000Z'));
      let c = new Period(new Date('2022-04-16T00:00:00.000Z'), new Date('2022-04-16T02:00:00.000Z'));
      assert.equal(a.join(b).equals(c), true);
      assert.equal(a.equals(b), false);
    });
  });
  describe('#toDays()', () => {
    it('should return the number of days as float', function () {
      let a = new Period(new Date('2022-04-16T00:00:00.000Z'), new Date('2022-04-17T12:00:00.000Z'));
      assert.equal(a.toDays(), 1.5);
    });
  });
  describe('#toHours()', () => {
    it('should return the number of hours as float', function () {
      let a = new Period(new Date('2022-04-16T00:00:00.000Z'), new Date('2022-04-16T01:30:00.000Z'));
      assert.equal(a.toHours(), 1.5);
    });
  });
  describe('#toMinutes()', () => {
    it('should return the number of minutes as float', function () {
      let a = new Period(new Date('2022-04-16T00:00:00.000Z'), new Date('2022-04-16T00:01:30.000Z'));
      assert.equal(a.toMinutes(), 1.5);
    });
  });
  describe('#toSeconds()', () => {
    it('should return the number of seconds as float', function () {
      let a = new Period(new Date('2022-04-16T00:00:00.000Z'), new Date('2022-04-16T00:00:01.5000Z'));
      assert.equal(a.toSeconds(), 1.5);
    });
  });
  describe('#getTime()', () => {
    it('should return the number of milliseconds as float', function () {
      let a = new Period(new Date('2022-04-16T00:00:00.000Z'), new Date('2022-04-16T00:00:01.5000Z'));
      assert.equal(a.getTime(), 1500);
    });
  });
  describe('#getDays()', () => {
    it('should return the number of days as integer', function () {
      let a = new Period(new Date('2022-04-16T00:00:00.000Z'), new Date('2022-04-17T12:00:00.000Z'));
      assert.equal(a.getDays(), 1);
    });
  });
  describe('#getHours()', () => {
    it('should return the number of hours as integer', function () {
      let a = new Period(new Date('2022-04-16T00:00:00.000Z'), new Date('2023-04-16T01:30:00.000Z'));
      assert.equal(a.getHours(), 1);
    });
  });
  describe('#getMinutes()', () => {
    it('should return the number of minutes as integer', function () {
      let a = new Period(new Date('2022-04-16T00:00:00.000Z'), new Date('2023-04-16T00:01:30.000Z'));
      assert.equal(a.getMinutes(), 1);
    });
  });
  describe('#getSeconds()', () => {
    it('should return the number of seconds as integer', function () {
      let a = new Period(new Date('2022-04-16T00:00:00.000Z'), new Date('2023-04-16T00:00:01.5000Z'));
      assert.equal(a.getSeconds(), 1);
    });
  });
  describe('#getMilliseconds()', () => {
    it('should return the number of milliseconds as integer', function () {
      let a = new Period(new Date('2022-04-16T00:00:00.000Z'), new Date('2023-04-16T00:00:01.5000Z'));
      assert.equal(a.getMilliseconds(), 500);
    });
  });
  describe('#setTillByHoursDelta()', () => {
    it('should return the first part of the hour', function () {
      let a = new Period(new Date('2022-04-16T00:00:00.000Z'), new Date('2022-04-16T01:00:00.0000Z'));
      let b = new Period(new Date('2022-04-16T00:00:00.000Z'), new Date('2022-04-16T00:30:00.0000Z'));
      let firstPart = a.setTillByHoursDelta(0.5);
      assert.equal(firstPart.equals(b), true, `${firstPart} != ${b}`);
    });
  });
  describe('#setTillByMillisecondsDelta()', () => {
    it('should return the first part of the hour', function () {
      let a = new Period(new Date('2022-04-16T00:00:00.000Z'), new Date('2022-04-16T01:00:00.0000Z'));
      let b = new Period(new Date('2022-04-16T00:00:00.000Z'), new Date('2022-04-16T00:30:00.0000Z'));
      let firstPart = a.setTillByMillisecondsDelta(1800000);
      assert.equal(firstPart.equals(b), true, `${firstPart} != ${b}`);
    });
  });
  describe('#sort()', () => {
    it('should sort', function () {
      let a = new Period(new Date('2022-04-16T00:00:00.000Z'), new Date('2022-04-16T01:00:00.0000Z'));
      let b = new Period(new Date('2022-04-16T02:00:00.000Z'), new Date('2022-04-16T02:30:00.0000Z'));
      assert.equal(Period.sort([a,b])[0].equals(a), true);
      assert.equal(Period.sort([b,a])[0].equals(a), true);
    });
  });
  describe('#merge()', () => {
    it('should merge', function () {
      let a = new Period(new Date('2022-04-16T00:00:00.000Z'), new Date('2022-04-16T01:00:00.0000Z'));
      let b = new Period(new Date('2022-04-16T01:00:00.000Z'), new Date('2022-04-16T02:30:00.0000Z'));
      let c = new Period(new Date('2022-04-16T00:00:00.000Z'), new Date('2022-04-16T02:30:00.0000Z'));
      assert.equal(Period.merge([a,b])[0].equals(c), true);
      assert.equal(Period.merge([b,a])[0].equals(c), true, Period.merge([b,a]));
    });
  });
  describe('#merge()', () => {
    it('should not merge', function () {
      let a = new Period(new Date('2022-04-16T00:00:00.000Z'), new Date('2022-04-16T01:00:00.0000Z'));
      let b = new Period(new Date('2022-04-16T01:00:00.001Z'), new Date('2022-04-16T02:30:00.0000Z'));
      let c = new Period(new Date('2022-04-16T00:00:00.000Z'), new Date('2022-04-16T02:30:00.0000Z'));
      assert.equal(Period.merge([b,a])[0].equals(c), false, Period.merge([b,a]));
    });
  });
});
