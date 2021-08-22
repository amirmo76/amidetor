/// <reference types="cypress" />
import { comapreObjects } from './formatters.utils';

describe('compareObjects Function', () => {
  describe('Shallow objects', () => {
    it('should detect two equal objects with the same order', () => {
      const obj1 = {
        key1: 2,
        key2: 'hello',
        key3: true,
      };
      const obj2 = {
        key1: 2,
        key2: 'hello',
        key3: true,
      };
      expect(comapreObjects(obj1, obj2)).to.be.true;
    });

    it('should detect two equal objects with the different order', () => {
      const obj1 = {
        key2: 'hello',
        key1: 2,
        key3: true,
      };
      const obj2 = {
        key1: 2,
        key2: 'hello',
        key3: true,
      };
      expect(comapreObjects(obj1, obj2)).to.be.true;
    });

    it("should detect two not equal objects with one key's value being different", () => {
      const obj1 = {
        key1: 2,
        key2: 'hello',
        key3: true,
      };
      const obj2 = {
        key1: 2,
        key2: 'hellos',
        key3: true,
      };
      expect(comapreObjects(obj1, obj2)).to.be.false;
    });

    it('should detect two not equal objects with one key missing', () => {
      const obj1 = {
        key1: 2,
        key2: 'hello',
        key3: true,
      };
      const obj2 = {
        key1: 2,
        key2: 'hello',
      };
      expect(comapreObjects(obj1, obj2)).to.be.false;
    });

    it('should detect two not equal objects with one extra key', () => {
      const obj1 = {
        key1: 2,
        key2: 'hello',
      };
      const obj2 = {
        key1: 2,
        key2: 'hello',
        key3: true,
      };
      expect(comapreObjects(obj1, obj2)).to.be.false;
    });
  });
});
