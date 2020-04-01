<div align="center">
  <h3>:asterisk:</h3>
  <h1>masky</h1>
  <p>
    <b>mask sensitive data</b>
  </p>
  <br>
  <br>
</div>

**masky** is a simple, no-fuss, value masker.

**masky** automatically masks all values in an object, recursively.

**masky** allows you to omit "safe" values and even caters for emails.

**masky** doesn't offer much in the way of customisations, it's content being what it is.

<br>
<br>

```js
const masky = require("masky");

const mySecrets = {
  name: "Superman",
  alias: "Clarke Kent",
  contact: {
    phone: "0123999911",
    email: "clarke.kent@fortressofsolitude.com"
  }
};

const safeSecrets = masky.mask(mySecrets, ["name"]);

console.log(safeSecrets);
```

```json
{
  "name": "Superman",
  "alias": "C********t",
  "contact": {
    "phone": "0*******1",
    "email": "c********t@fortressofsolitude.com"
  }
}
```

or mask a single value:

```js
masky.maskString("04fad440-aae2-4596-b9cc-800204eaf8ac");
```

```plaintext
"04fad4e***********************af8ac"
```
