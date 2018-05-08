## jose-simple

Sound encryption ought to be simple, and widespread.

Jose-Simple allows the encryption and decryption of data using the JOSE (JSON Object Signing and Encryption) standard.

It depends on [`node-jose`](https://github.com/cisco/node-jose) by Cisco.

Requires Node 8 or better.

Note the devDependency [`generate-rsa-keypair`](https://github.com/LinusU/node-generate-rsa-keypair) does not install under Node 10.

See https://github.com/LinusU/node-generate-rsa-keypair/issues/4 for more.

* `develop` - [![CircleCI](https://circleci.com/gh/davesag/jose-simple/tree/develop.svg?style=svg)](https://circleci.com/gh/davesag/jose-simple/tree/develop) [![codecov](https://codecov.io/gh/davesag/jose-simple/branch/develop/graph/badge.svg)](https://codecov.io/gh/davesag/jose-simple)
* `master` - [![CircleCI](https://circleci.com/gh/davesag/jose-simple/tree/master.svg?style=svg)](https://circleci.com/gh/davesag/jose-simple/tree/master) [![codecov](https://codecov.io/gh/davesag/jose-simple/branch/master/graph/badge.svg)](https://codecov.io/gh/davesag/jose-simple)

## Installation

    npm install jose-simple

## Useage

    const jose = require('jose-simple')
    // You need a private / public JWE key pair.
    // Either load them from `.pem` files, create them, or somehow acquire them.

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

## Development

### Prerequisites

* [NodeJS](https://nodejs.org) — `brew install nvm` then `nvm use 9.11.1`

### Test it

* `npm test` — runs the unit tests.  The tests give an example of how to create key pairs too.

### Lint it

```
npm run lint
```

### Contributing

Contributions are welcome. Please see [CONTRIBUTING](CONTRIBUTING.md) for more details.
