const { PrismaClient } = require('@prisma/client')
const main = require('../main.js');

describe('main', () => {
  // When this line exists, yarn jest --detectLeaks says "Your test suite is leaking memory."
  // When this line is commented out, there are no leaks
  // const prisma = new PrismaClient();

  it('has a greeting', () => {
    expect(main.greeting).toEqual('hello, world!');
  });
});
