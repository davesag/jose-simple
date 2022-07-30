# jose-simple

> Proper encryption ought to be simple, and widespread.

Jose-Simple simplifies the encryption and decryption of data using the JOSE (JSON Object Signing and Encryption) standard.

[![NPM](https://nodei.co/npm/jose-simple.png)](https://nodei.co/npm/jose-simple/)

## Caveats

- The project depends on [`node-jose`](https://github.com/cisco/node-jose) by Cisco.
- `node-jose` [does not allow you to use private keys with passwords](https://github.com/cisco/node-jose/issues/69#issuecomment-236133179), and [they have no intention of changing that](https://github.com/cisco/node-jose/issues/234#issuecomment-457615794).
- **Requires Node 10.12.0 or better** if you want to run the tests. Works fine under Node 12+, and might run under versions of node going back to 8.x but no further.

## Installation

```sh
npm install jose-simple
```

## Links

- [Securing Tokens with help from JOSE](https://codeburst.io/securing-tokens-with-help-from-jose-33d8c31835a1).

## Usage

```js
const jose = require('jose-simple')
// You need a private / public JWE key pair.
// Either load them from `.pem` files, create them, or somehow acquire them.
// The private key must not have a passphrase or cypher!
// see https://github.com/cisco/node-jose/issues/69#issuecomment-236133179
// see also https://github.com/cisco/node-jose/issues/234#issuecomment-457615794
// see unit tests for a simple example.

const { encrypt, decrypt } = jose(privateKey, publicKey)

const someData = {
  some: 'amazing data',
  you: 'want to keep hidden',
  from: 'prying eyes'
}

encrypt(someData).then(encrypted => {
  console.log('encrypted', encrypted)
  decrypt(encrypted).then(decrypted => {
    console.log('decrypted', decrypted)
    // decrypted will be the same as someData
  })
})
```

### Options

See [`encrypt.js#L660-L668`](https://github.com/cisco/node-jose/blob/master/lib/jwe/encrypt.js#L660-L668)

You can add `encrypt` options as follows:

```js
const { encrypt, decrypt } = jose(privateKey, publicKey, {
  format: 'compact'
  protect: true,
  // or any of the encrypt options than can be passed to JWE.createEncrypt.
  // https://github.com/cisco/node-jose/blob/master/lib/jwe/encrypt.js#L660-L668
})
```

## Development

<!-- prettier-ignore -->
| Branch | Status | Coverage | Audit | Comment |
| ------ | ------ | -------- | ----- | ------- |
| `develop` | [![CircleCI](https://circleci.com/gh/davesag/jose-simple/tree/develop.svg?style=svg)](https://circleci.com/gh/davesag/jose-simple/tree/develop) | [![codecov](https://codecov.io/gh/davesag/jose-simple/branch/develop/graph/badge.svg)](https://codecov.io/gh/davesag/jose-simple) | [![Vulnerabilities](https://snyk.io/test/github/davesag/jose-simple/develop/badge.svg)](https://snyk.io/test/github/davesag/jose-simple/develop) | Work in progress |
| `main` | [![CircleCI](https://circleci.com/gh/davesag/jose-simple/tree/main.svg?style=svg)](https://circleci.com/gh/davesag/jose-simple/tree/main) | [![codecov](https://codecov.io/gh/davesag/jose-simple/branch/main/graph/badge.svg)](https://codecov.io/gh/davesag/jose-simple) | [![Vulnerabilities](https://snyk.io/test/github/davesag/jose-simple/main/badge.svg)](https://snyk.io/test/github/davesag/jose-simple/main) | Latest release |

### Prerequisites

- [NodeJS](htps://nodejs.org), I use [`nvm`](https://github.com/creationix/nvm) to manage Node versions — `brew install nvm`.

### Test it

- `npm test` — runs the unit tests. The tests give an example of how to create key pairs too. (Leverages the [`crypto.generateKeyPair`](https://nodejs.org/dist/latest-v10.x/docs/api/crypto.html#crypto_crypto_generatekeypair_type_options_callback) libraries introduced in Node `10.12.0`.)
- `npm run test:unit:cov` — runs the unit tests with code coverage

### Lint it

```sh
npm run lint
```

### Contributing

Contributions are welcome. Please see [CONTRIBUTING](CONTRIBUTING.md) for more details.
