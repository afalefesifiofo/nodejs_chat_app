# TD6

## PART I - Adding privacy
1. The server should now remember the user history.
Configure an authentication mechanism with passwords. Update the protocol specification to allow users to be authenticated.

  ![Alt text](images/authbasic.png?raw=true "authentification basique")

  -  To authenticate users, use a database such as `sqlite`. In particular, you can use the `sqlite3` module.
  - Passwords should never be stored clearly in a database. Thus, you must use a hash algorithm such as `bcrypt`, and use the module` node.js` named `bcrypt`.
  - See [https://en.wikipedia.org/wiki/Bcrypt](https://en.wikipedia.org/wiki/Bcrypt)  
> **Warning, Authentication does not mean security **.

1. We want to ensure secure communication between clients and servers.

![Alt text](images/secure.png?raw=true "Encrypted Authentication")

To this end, we want to encrypt messages between clients and servers because the communication channel is not safe. Capture the communication traffic between a client and a server to emphasize that the protocol is dangerous. For example, you can use `wirehark` ...

>Note that the client and the server do not know each other in advance. **Theo** wants to interact with the server in a safe manner. In other terms,
**Theo** wants to interact with the server while avoiding
 Max interpreting and reading the exchanged messages. It is possible to encrypt messages by using `symetric encryption`, i.e., by using a key or a password. But how is it possible to exchange a secret without Max intercepting it??

#### Explanations
> To resolve this issue, you should use an asymetric encryption technique. More particularly, we are going to use the algorithm from **Diffie-Hellman** with an elliptic curve (`ECDH`). See [https://en.wikipedia.org/wiki/Diffie–Hellman_key_exchange.](https://en.wikipedia.org/wiki/Diffie–Hellman_key_exchange)
>
>The main objective of 'ECDH' is to setup a secret between two parties throught an unsecured channel and without exchanging the secret. !!
 Both **Théo** and the server generate a key pair public/private with the use of **ECDH**.
The public key can be shared with everybody whereas the private key must remain private and never be exchanged. Thus,
 **Théo** and the server can exchange together the public key. Finally, a shared secret can then be generated at both sides of the communication by combining the private and the public key. Hence, if **Max** is listening the communication, he has probably intercepted the public key from **Theo** and/or from the server. However, he will be unable to compute the same secret without the private keys.
 Once **Théo** and the server have the same shared secret, then they can use a symmetric encryption to exchange their messages without
**Max** being able to decrypt them.

- Setup new messages to enable to secure the messsage exchanges by using **ECDH** between clients and servers. To this end, you can use the `crypto` module from `node.js`. See [https://nodejs.org/api/crypto.html](https://nodejs.org/api/crypto.html)

#### Recommandations

>- To use `ECDH` see the documentation
[https://nodejs.org/api/crypto.html#crypto_class_ecdh](https://nodejs.org/api/crypto.html#crypto_class_ecdh)
>
> - For the symmetric encryption use the
`aes-256-cbc` encryption. See [https://en.wikipedia.org/wiki/Advanced_Encryption_Standard](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard)
>
>- To use `AES` with `node.js`, See the documentation
[https://nodejs.org/api/crypto.html#crypto_class_cipher](https://nodejs.org/api/crypto.html#crypto_class_cipher)
and
[https://nodejs.org/api/crypto.html#crypto_crypto_createcipher_algorithm_password_options](https://nodejs.org/api/crypto.html#crypto_crypto_createcipher_algorithm_password_options)
>
>- It is strongly recommanded to use an initalization vector (`iv`). See
[https://en.wikipedia.org/wiki/Initialization_vector](https://en.wikipedia.org/wiki/Initialization_vector).
>
>- To use a `iv` in `node.js` See the  documentation
[https://nodejs.org/api/crypto.html#crypto_crypto_createcipheriv_algorithm_key_iv_options](https://nodejs.org/api/crypto.html#crypto_crypto_createcipheriv_algorithm_key_iv_options)

1. Now take, you must secure all messages exchanged between the client and the server. Your client and server must both manage secure or non secure messages. A client can switch to encryption on the fly. Gives the speficiations of all new messages. 

1.  From your point of view, all the above improvement is enough secure to be protected from **Max**? If no, suggest a solution.

