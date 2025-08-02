import { init, getTracker } from '../index-new';

describe('Basic Test', () => {
  it('should pass basic test', () => {
    expect(1 + 1).toBe(2);
  });

  it('should initialize tracker', () => {
    const tracker = init({ apiKey: 'test' });
    expect(tracker).toBeDefined();
  });
});
