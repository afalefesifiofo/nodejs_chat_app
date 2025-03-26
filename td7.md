# TD7

Faire au choix soit la Partie I ou la Partie II, Q1 et Q2. 

Pour les plus avancés, il est également possible de faire la Partie I et II, et/ou Partie II Q3. 

## Partie I

Pour développer un logiciel, vous devez avoir de bonnes pratiques. Il est fondamental de tester votre logiciel. En particulier, vous devez tester à la fois le côté client et le côté serveur de votre application indépendamment pour chaque fonction mise en œuvre (messages envoyés et reçus). Par exemple, vous devez mettre en œuvre différents cas d'utilisation pour tester si le serveur se comporte de la bonne manière pour les opérations de diffusion, pour les messages privés, pour la gestion des groupes...


1. Mettez en place de bonnes pratiques et développez un banc d'essai pour tester le côté serveur de votre application. Vous pouvez consulter le site [mocha](https://mochajs.org),
[chai](https://www.chaijs.com) à utiliser comme framework de test epour tester le comportement de votre serveur.

2. Testez toutes les fonctionnalités de votre serveur. Utiliser notamment votre client pour tester le serveur. 

A titre d'example,

```javascript
...
import 'chai/register-should.js';
import {Client} from './client.test.js';

describe('Test Server with one client', () => {
    let david;
    before(() => {
          david = new Client('David');
    });

    it('Create 1 client', async () => { 
        await david.connect();
        const msg1=await david.get_message();
        const msg_exp = { from: 'David', msg: 'Hello David', action: server.CONNECT};
        msg1.should.not.have.property('error');
        msg1.should.have.property('from').and.to.be.a('string').and.equals('David');
        msg1.should.have.property('action').and.to.be.a('string').and.equals(server.CONNECT);
        msg1.should.be.deep.equals(msg_exp);
    });
...
```

## PART II -  Utiliser les websocket
Le but principal de cette partie est de reconstruire toute votre application *tchat* avec le protocole *websocket*.

> Vous devez utiliser la bibliothèque node.js nommée
[socket.io](https://socket.io) soit pour le côté client, soit pour le côté serveur.

> Le client et le serveur sont tous deux développés à l'aide de node.js. Notez que le client ne s'exécute pas dans un navigateur Web mais **doit être** une application en ligne de commande.

1. Vous pouvez consulter la [documentation] principale (https://socket.io/docs/) pour obtenir des détails sur la bibliothèque.

1. Dans le répertoire de votre projet, vous devez avoir au moins deux répertoires, un pour le côté client et un autre pour le côté serveur de l'application.

> Dans le répertoire dédié au code du **client**, vous devez installer le côté client de la bibliothèque socket.io. Par exemple : ``npm install socket.io-client``

> Dans le répertoire dédié au code du **serveur**, vous devez installer le côté serveur de la bibliothèque socket.io. Par exemple : ``npm install socket.io``

> Vous pouvez jeter un coup d'oeil au code bootstrap pour avoir une idée de la façon dont vous pouvez intégrer socket.io dans votre application. 
À cette fin, consultez l'exemple de code suivant pour le client [socket.io client](websocket/client), et pour le serveur [socket.io server](websocket/server) ; 

> Les clients et les serveurs doivent être interopérables. A cette fin, réutiliser la totalité de vos spécifications de messages que vous avez été amenées à définir dans les tds précédents. 

3. La dernière étape est d'automatiser le test de votre serveur pour voir si tout fonctionne bien. Pour cela, réutilisez le code de [test example](websocket/test-server.js) et étendez-le. En particulier, ajoutez des procédures de test pour tester toutes les fonctions de votre projet et utilisez l'outil de test assert [assert](https://nodejs.org/api/assert.html) ou bien [chai](https://www.chaijs.com) pour évaluer les résultats attendus.
