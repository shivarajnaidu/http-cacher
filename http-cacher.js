'use strict';


const conertMaxAgeToSeconds = (maxAge) => {
  if (typeof maxAge === 'number') {
    return maxAge;
  }

  let ma = maxAge;
  if ((typeof ma === 'string')) {
    const num = parseInt(ma, 10);
    switch (maxAge[maxAge.length - 1]) {
      case 's':
        ma = num;
        break;
      case 'm':
        ma = num * 60;
        break;
      case 'h':
        ma = num * (60 * 60);
        break;
      case 'd':
        ma = num * (60 * 60 * 24);
        break;
      case 'M':
        ma = num * (60 * 60 * 24 * 30);
        break;
      case 'y':
        ma = num * (60 * 60 * 24 * 365);
        break;
      default:
        ma = maxAge;
        break;
    }
  }

  return ma;
}

const httpCacher = (
  { maxAge, isPrivate = true },
  matchers = [],
) => {
  if (typeof matchers === 'function') {
    matchers = [matchers];
  }

  const ma = conertMaxAgeToSeconds(maxAge);

  return (req, res, next) => {
    if (matchers.every(f => f(req)) && ma) {
      res.set('Cache-Control', `${isPrivate ? 'private' : 'public'}, max-age=${ma}`); // in sec
    }

    next();
  };
};


module.exports = {
  httpCacher,
};
