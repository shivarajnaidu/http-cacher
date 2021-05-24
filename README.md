# http-cacher
Simple HTTP cache middleware for express js applications

## Usage 

***If you want to apply for all requests...***
```js
const httpCacher = require('http-cacher');
app.use(httpCacher({ maxAge: 300})); // 300 seconds
```

***You can also write the above example like this..***
```js
const httpCacher = require('http-cacher');
app.use(httpCacher({ maxAge: '300s'})); // 300 seconds
```

***If you want to apply for specific end-point...***
```js
const httpCacher = require('http-cacher');
app.use('/api/v1', httpCacher({ maxAge: '1d'}));
```

***If you want to apply for specific http method***

```js
const httpCacher = require('http-cacher');
app.get('/api/v1/books', httpCacher({ maxAge: '1d'}), (req, res, next) => {
    res.json({
        books: [
            'Eloquent JavaScript: A Modern Introduction to Programming',
            'JavaScript: The Good Parts',
            'JavaScript for Kids: A Playful Introduction to Programming'
        ]
    });
});
```

***If you want to apply headers conditionally... (You can pass custom function as second argument)***

```js
const httpCacher = require('http-cacher');
const zeroCacheAdmin = (req) => {
  if (req.tokenData?.role === ADMIN) {
    return false;
  }

  return true;
};

app.use(httpCacher({ maxAge: '1d'}, zeroCacheAdmin));
```


***If you want to apply set cache as private***
```js
const httpCacher = require('http-cacher');
app.use(httpCacher({ maxAge: '1m', isPrivate: true})); // 1 minute
```