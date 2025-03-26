L’objectif de ce TD est de comprendre le fonctionnement basique de **node.js**. En particulier de bien comprendre la notion de processus.

> Dans votre répertoire racine de votre dépot,  vous devez créer un sous-répertoire `src` qui va contenir le code source de votre projet. Par ailleurs, à la racine, vous devrez fournir un fichier `td1-Prenom-Nom.pdf` qui contient le rapport du **TD** et l'explication du code que vous avez produit (Le nom fichier doit contenir votre prénom et nom)!.  

1. Dans le répertoire `src`, initialiser votre projet. 
```console 
npm init -y
```
Un fichier `package.json` sera généré et contiendra toutes les informations relatives à votre projet. Principalement, l'outil `npm` va vous permettre de gérer les dépendances de votre projet.

2. Créer votre premier script `prog1.js`
````javascript
console.log("hello world")
````
Modifier votre fichier `package.json`. 
```json
 "scripts": {
    "start": "node prog1.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

 Cette modification vous permet de spécifier le nom du script à executer lors de l'appel à `npm start`. 

 > Voir [console.log](https://nodejs.org/api/console.html) pour plus d'information sur la `console`.
 Voir [npm start](https://docs.npmjs.com/cli/start.html) pour plus d'information sur `npm`

3.  Ecrire un programme javascript **prog2.js** qui permet
d'afficher à l'écran: 

  - Le PID du processus courant, 
  - Le PID du processus père, 
  - Le chemin courant, 
  - L'OS,
  - L'architecture du processeur, 
  - Le chemin d'execution, 
  - La version de nodejs

> Pour répondre à cette question, voir la documentation de `node.js` sur l'objet global [Process](https://nodejs.org/api/process.html).
Par exemple, voir [pid](https://nodejs.org/api/process.html#process_process_pid) pour obtenir le `pid` du processus courrant. 


2. La communication entre votre `shell` et votre processus `node.js` peut se faire par l'usage de variable d'environnement. Ecrire un programme javascript **prog3.js** qui liste les
variables d'environnements disponible dans votre processus. 

3. La méthode la plus simple pour transmettre des variables à votre programme est de le faire directement en ligne de commande. 
```shell 
PORT=8080 MODE=debug node prog4.js
```
Tester la transmission de ces variables dans un script **prog4.js**


3. Ecrire un programme javascript **prog5.js** qui attend indique `x` milliseconds et qui indique combien de temps il s'est ecoulé.

> Voir en particulier l'usage de [setTimeOut](https://nodejs.org/api/timers.html#timers_settimeout_callback_delay_args).
> Voir également l'usage de [process.hrtime.bigint()](https://nodejs.org/api/process.html#process_process_hrtime_bigint). 
> L'objectif ici est de comprendre l'usage d'un `callback`

4. On souhaite dorénavant créer un nouveau script **prog6.js** qui affiche un message de bienvenue toutes les 10ms. 
> On regardera naturellement la fonction [setTimeOut](https://nodejs.org/api/timers.html#timers_setinterval_callback_delay_args)

Que se passe t'il si l'on interrompt le processus par un
**Ctrl-C** pour quitter prématurément le programme? Résoudre le
problème dans un nouveau programme nommé **prog7.js**
> Pour résoudre ce problème, on regardera la documentation sur les évènements associés aux [processus](https://nodejs.org/api/process.html#process_process_events).

5. Examinons le code suivant:
```javascript
setTimeout(()=>{ 
    console.log('Hey It is me !!');
}, 1000);
console.log('Why am I displayed first?');
```
Indiquez pourquoi le message `Hey It is me` est-il affiché en dernier?

5. Dans un script **prog8.js** Rediriger le flux d'entrée `process.stdin` sur le flux de sortie `process.stdout`.

> On vous rappelle que tout processus dispose de I/O standards tels que [stdin](https://nodejs.org/api/process.html#process_process_stdin) et [stdout](https://nodejs.org/api/process.html#process_process_stdout). `stdin`et `stdout` sont des flux respectivement de lecture et d'écriture. Voir l'usage de [pipe](https://nodejs.org/api/stream.html#stream_readable_pipe_destination_options) pour faire une redirection de l'un sur l'autre.

6. Dans un script **prog9.js** afficher seulement le nombre de caractères saisis.
```console
$ node prog7.js
hello
6
bonjour
8
```

> `stdin` est un flux de type lecture. De fait, voir les évènements `data` générés par ce type de [flux](https://nodejs.org/api/stream.html#stream_event_data)

7. Pour un meilleur contrôle de ligne saisie par l'utilisateur, il est possible d'utiliser une librairie [readline](https://nodejs.org/api/readline.html). Ecrire un script **prog10.js** utilisant `readline`

8. Ecrire un programme javascript **prog11.js** qui permet
de rediriger l'entrée du clavier dans un fichier. 

> Voir la fonction [createWriteStream](https://nodejs.org/api/fs.html#fs_fs_createwritestream_path_options) pour créer un flux d'écriture.

9. Ecrire un programme javascript **prog12.js** qui permet
de copier un fichier.

> Voir la fonction [createReadStream](https://nodejs.org/api/fs.html#fs_fs_createreadstream_path_options) pour créer un flux de lecture.

> Voir également la fonction [pipe](https://nodejs.org/api/stream.html#stream_readable_pipe_destination_options)
> 


