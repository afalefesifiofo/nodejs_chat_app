# TD2
> Dans votre répertoire racine de votre dépot,  vous devez créer un sous-répertoire `src` qui va contenir le code source de votre projet. Par ailleurs, à la racine, vous devrez fournir un fichier `td1-Prenom-Nom.pdf` qui contient le rapport du **TD** et l'explication du code que vous avez produit (Le nom fichier doit contenir votre prénom et nom)!.  

## Logger les informations

Pour debogger un script `javascript` on utilise souvent à outrance la commande `console.log()` pour afficher dans la console les informations à debogger. Cela devient rapidement illisible dès lors que le programme atteint une taille importante. De plus, lorsque l'on veut déployer le programme en production, on doit alors parcourir l'ensemble des fichiers afin de supprimer les lignes contenant `console.log()`. Puis si l'on veut de nouveau logger les données, on doit de nouveau ajouter des lignes de type `console.log()`et récursivement...

1. Pour éviter d'ajouter/supprimer les lignes de `logging` il serait interessant d'utiliser une variable d'environnement pour indiquer à l'execution du script si oui ou non on souhaite logger les informations. Ecrire un programme **td2-prog1.js** qui affiche les informations de deboggage quand la variable d'environement `DEBUG` est à `true`. Par exemple, 
```console 
$ DEBUG=true node td2-prog1.js
```
activera l'affichage des lignes de `debogging`. 

>Votre programme **td2-prog1.js** définira notamment une fonction `log(flag, ...args)` qui fera appel à `console.log()` si et seulement si la variable flag vaut `true`. 

2. Pourquoi utilise t'on `...args`, que cela signifie t-il?
> Voir par example [console.log()](https://nodejs.org/api/console.html#console_console_log_data_args)

3. Maintenant, on souhaiterait réaliser un logger plus rafiné dans un nouveau programme **td2-prog2.js**. En particulier, on souhaiterait logger seulement certaine partie du code. Par exemple logger tout ce qui est relatif aux `io`, et/ou aux `timeout`. Par exemple, pour indiquer que l'on veut afficher les logs relatifs aux `io` et `timeout`:
```console 
$ env DEBUG=io,timeout node td2-prog2.js
```
Dans cet objectif, vous devez définir deux fonctions: (i) `function logger(flag)` qui renvoie une fonction qui loggue ce qui est relatif à `flag`, et enfin la fonction (ii) `function log(flag, ...args)` qui loggue les infos suivant la valeur de `flag`. 

Ainsi dans l'usage on fera:

```javascript
//On définit les différent loggers
const logio=logger('io');
const logtime=logger('timeout');

...

//Puis plus tard 
logio('Info sur les io');
logtime('Info sur le temps');
```

> Le concept important ici, est le fait qu'en javascript une fonction peut renvoyer une autre fonction (i.e `logger()`).

> Par ailleurs, pour gérer la variable d'environnement `DEBUG`, voir la fonction [split](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String/split)
et la fonction [includes](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/includes).

> Attention votre programme doit être robuste. C'est à dire que si aucune variable d'environnements ne sont définies, il doit tout même fonctionner.

> Si vous êtes sur Windows, vous devez utiliser la commande `set` pour définir une variable. 
Voir la commande [set](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/set_1) 

4. Maintenant que vous avez compris comment fonctionne le deboggage, nous allons utiliser une librairie qui fait à peu près ce que vous avez développer mais avec des fonctionalités supplémentaires. 

  - Installer la librairie `debug`
    ```console
    $ npm install --save-dev debug
    ```
 - Parcourez votre répertoire courrant. Où a été installé votre librairie? 
 - Votre fichier package.json a t-il été altéré? si oui pourquoi? 

 > Voir la documentation sur [npm devDependencies](https://docs.npmjs.com/specifying-dependencies-and-devdependencies-in-a-package-json-file)

  - Créer un nouveau programme **td2-prog3.js** qui réalise les mêmes fonctionalités que votre programme précédent mais qui utilise cette fois ci le module `debug` dans votre programme. 

  > Voir la documentation sur [debug](https://www.npmjs.com/package/debug)

> On ne le mentionnera plus mais dorénavant dès lors que vous devez logger des données une des méthodes ci-dessus devra être utilisée !!

## A la découverte des **Streams**

L'objectif de cette partie est de bien comprendre le fonctionnement des *Streams* d'une part, mais aussi la manipulation de processus d'autres part et ainsi en améliorer sa compréhension. Par ailleurs, on en profitera pour comprendre le passage de paramètres par arguments et découvrir la manupulation de documents *json*.

5.  Réutiliser la fonction **spawn()** pour créer des processus fils et la fonction **pipe()** pour combiner les processus entre eux.
    - Voir la fonction [spawn](https://nodejs.org/api/child_process.html#child_process_child_process) et [pipe](https://nodejs.org/api/stream.html#stream_readable_pipe_destination_options) dans la documentation officielle.
   
  
  - Créer un programme **td2-prog4.js** qui renvoie la liste de fichier du répertoire courant grâce à la commande *shell* **ls**.  
  - Créer un programme **td2-prog5.js** qui renvoie le nombre de fichier dans le répertoire courant 
      en réutilisant les commandes *shell* **ls** et **wc**. 
   ![Alt text](images/pipe.png?raw=true "Streams")
>    - Les commandes *shell* **ls** et **wc** sont disponibles par défaut sous Linux,
>    - Sous macOs installer le package coreutils avec homebrew. 
>    - Sous windows, utiliser **dir** et **find** comme remplacement.
6. Ecrire un programme **td2-prog6.js** qui prend comme argument le type de fichier, et renvoie le nombre de fichier correspondant au type spécifié. 
7. Créer un programme **td2-prog7.js** qui renvoie le nombre de fichier pour chaque type de fichier présent dans le répertoire courant. 
8. On souhaite dorénavant un nouveau programme **td2-prog8.js** qui se comporte comme précédemment mais qui dorénavant écrit le résultat dans le format JSON si ce dernier est éxécuté avec l'argument **json**.
 - Voir les fonction [JSON.parse](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/JSON/parse) et [JSON.stringify](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/JSON/stringify)
 
```javascript
#td2-prog8.js json
{
 txt: 2,
 js: 10,
} 
```
9. On souhaite dorénavant un nouveau programme **td2-prog9.js**  qui se comporte comme **td2-prog4.js**  mais qui dorénavant écrit le résultat dans le format JSON si ce dernier est éxécuté avec l'argument **json**.

```javascript
#td2-prog9.js json
{
 count1.js,
 count2.js,
 count3.js,
 count4.js
} 
```

10. Améliorer les programmes de **td2-prog4.js** à **td2-prog9.js**, pour prendre en charge récusivement les sous-répertoires. Ces derniers seront renommés  **td2-prog4-r.js** à **td2-prog9-r.js** pour indiquer qu'ils sont récursifs. 
