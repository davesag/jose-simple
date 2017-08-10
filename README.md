## jose-simple

Sound encryption ought to be simple, and widespread.

Jose-Simple provides a very simple mechaism for encrypting and decrypting data using the JOSE (JSON Object Signing and Encryption) standard.

It depends on [`node-jose`](https://github.com/cisco/node-jose) by Cisco.

Requires Node 8 or better.

## Useage

    const jose = require('jose-simple')
    // You need a private / public JWE key pair.
    // Either load them from `.pem` files, create them, or somehow acquire them.
    // see unit tests for a simple example.

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

* [NodeJS](https://nodejs.org) — `brew install nvm` then `nvm use 8.2.1`

### Test it

* `npm test` — runs the unit tests.  The tests give an example of how to create key pairs too.

### Lint it

```
npm run lint
```

### Contributing

Contributions are welcome. Please see [CONTRIBUTING](CONTRIBUTING.md) for more details.
