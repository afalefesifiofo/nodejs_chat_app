# TD4

L'objectif de ce TD est d'améliorer votre client/serveur de `tchat`. En particulier, vos clients et serveurs doivent **TOUS ETRE INTEROPERABLES** ! C'est à dire que n'importe quel client doit pouvoir intéragir avec n'importe quel serveur. ;-)

## Indications particulières

> Dans votre répertoire racine de votre dépot, vous devez: 
> -  Fournir un fichier `td3-Nom1-Nom2.pdf` qui contient le rapport du **TD** et l'explication du code que vous avez produit (Le nom fichier doit contenir vos prénoms et noms)!. 
> - Créer un sous répertoire `src` qui va contenir le code source de votre projet. 
> - Créer deux sous répertoire `src/client`et `src/server`pour contenir le code du client et du serveur respectivement. 

## Extension de votre application de tchat

1. Ajouter la gestion des groupes.

|commande| Message  | Format du message | commentaires
| :------------| :------------ |:---------------:|:---------------:|
|cg;wob | create groupe     |       ``` {sender: sender_name, group: group_name ,action:'cgroupe'}```      |  `sender_name` crée le groupe `group_name`|
|j;wob | join     |       ``` {sender: sender_name, group: group_name ,action:'join'}```      |  `sender_name` joint le groupe `group_name`|
|bg;wob;`hello` | broadcast group     |       ``` {sender: sender_name ,group: group_name, msg: message_content ,action:'gbroadcast'}```      |  `sender_name` diffuse le message `message_content` au groupe `group_name`|
|members;wob| list   |       ``` {sender: sender_name ,group: 'group_name', action:'members'}```       |   `sender_name` liste les clients présents dans le groupe `group_name`
|messages;wob| list messages   |       ``` {sender: sender_name ,group: 'group_name', action:'msgs'}```       |   `sender_name` liste l'historique des messages du groupe `group_name`
|groups;| group list   |       ``` {name: sender_name ,action:'groups'}```       |   `sender_name` liste les groupes existants
|leave;wob| leave   |        ``` {sender: sender_name,group: 'group_name' ,action:'leave'}``` |    `sender_name` quitte le groupe `group_name`
|invite;[group];dest| invite   |        ``` {sender: sender_name , group: 'group_name', dest: receiver_name, action:'invite'}``` |    `sender_name` invite le user `receiver_name` dans le groupe `group_name`
|kick;[group];dest;reason| kick   |        ``` {sender: sender_name , group: 'group_name', dest: receiver_name, reason: 'reason', action:'kick'}``` |    `sender_name` exclut le user `receiver_name` dans du groupe `group_name` avec la raison `reason`|
|ban;[group];dest;reason| ban   |        ``` {sender: sender_name , group: 'group_name', dest: receiver_name, reason: 'reason', action:'ban'}``` |    `sender_name` exclut définitivement le user `receiver_name` du groupe `group_name` avec la raison `reason`|
|unban;[group];dest| unban   |        ``` {sender: sender_name , group: 'group_name', dest: receiver_name, action:'unban'}``` |    `sender_name` n'exclut plus définitivement le user `receiver_name` dans du groupe `group_name`|
|states;wob| list states   |       ``` {sender: sender_name , group: 'group_name', action:'states'}```       |   `sender_name` liste tous les évènements survenus dans le groupe `group_name`

2. Donner la spécification des messages de réponses. Attention, la spécification doit être un consensus entre vous tous, car tous les clients et serveurs doivent être intéropérable.
