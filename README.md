## jose-simple

[![Greenkeeper badge](https://badges.greenkeeper.io/davesag/jose-simple.svg)](https://greenkeeper.io/)

Sound encryption ought to be simple, and widespread.

Jose-Simple allows the encryption and decryption of data using the JOSE (JSON Object Signing and Encryption) standard.

It depends on [`node-jose`](https://github.com/cisco/node-jose) by Cisco.

**Requires Node 10.14.1 (LTS) or better** if you want to run the tests.
Works fine under Node 11.3+, and might run under versions of node going back to 8.x but no further.

| Branch | Status | Coverage | Comment |
| ------ | ------ | -------- | ------- |
| `develop` | [![CircleCI](https://circleci.com/gh/davesag/jose-simple/tree/develop.svg?style=svg)](https://circleci.com/gh/davesag/jose-simple/tree/develop) | [![codecov](https://codecov.io/gh/davesag/jose-simple/branch/develop/graph/badge.svg)](https://codecov.io/gh/davesag/jose-simple) | Work in progress |
| `master` | [![CircleCI](https://circleci.com/gh/davesag/jose-simple/tree/master.svg?style=svg)](https://circleci.com/gh/davesag/jose-simple/tree/master) | [![codecov](https://codecov.io/gh/davesag/jose-simple/branch/master/graph/badge.svg)](https://codecov.io/gh/davesag/jose-simple) | Latest release |

## Installation

    npm install jose-simple

## Useage

    const jose = require('jose-simple')
    // You need a private / public JWE key pair.
    // Either load them from `.pem` files, create them, or somehow acquire them.
    // The private key must not have a passphrase or cypher!
    // see https://github.com/cisco/node-jose/issues/69#issuecomment-236133179

    // TODO: see unit tests for a simple example.

    const { encrypt, decrypt } = jose(privateKey, publicKey)

    const someData = {
      some: 'amazing data',
      you: 'want to keep hidden',
      from: 'prying eyes'
    }

    encrypt(someData).then((encrypted) => {
      console.log('encrypted', encrypted)
      decrypt(encrypted).then((decrypted) => {
        console.log('decrypted', decrypted)
        // decrypted will be the same as someData
      })
    })

## Issues

Cisco's [node-jose](https://github.com/cisco/node-jose/issues) library has issues with **private keys with a passphrase** and cypher set. See [add support for passphrase in pem certificate](https://github.com/cisco/node-jose/issues/234).

## Development

### Prerequisites

* [NodeJS](https://nodejs.org) — `brew install nvm` then `nvm use 10.14.1` or better.

### Test it

* `npm test` — runs the unit tests.  The tests give an example of how to create key pairs too. (Leverages [the new crypto.generateKeyPair](https://nodejs.org/dist/latest-v10.x/docs/api/crypto.html#crypto_crypto_generatekeypair_type_options_callback) libraries and so no-longer needs a 3rd party keypair generator.)

### Lint it

```
npm run lint
```

### Contributing

Contributions are welcome. Please see [CONTRIBUTING](CONTRIBUTING.md) for more details.
