# DylanRousseau_7_04092021

Bonjour et bienvenue sur le réseau social Groupomania,
voici quelques étapes indispensables à réaliser avant de faire tourner l'application.

La premiere étape est optionnelle, elle consiste à créer la base de donner local, et de la remplir
afin de pouvoir directement tester toute les fonctionnalités de l'application.
Si vous ne souhaitez pas passer par l'étape n°1, vous devrez créer vous mêmes des utilisateurs, créer plusieurs posts
ainsi que plusieurs comentaires pour pouvoir vérifier les relations entre les différentes tables.

Avant de commencer, assurez-vous que vos services de server local sont bien activés, sinon cela ne pourra pas fonctionner.

1) À l'aide d'un terminal, ouvrez une session Mysql puis executer le fichier "initBDD.sql" qui se trouve dans ce même dossier.
   Le fichier "initBDD.sql" va créer la base "groupomania", puis les tables "Users", "Posts" et "Comments", puis inserera des données 
   dans les différentes tables pour avoir rapidement un bon contenu de départ.
  
2) Toujour à l'aide d'un terminal, rendez-vous dans le dossier "frontend", puis executez la commance "npm install",
   ceci va installer toutes les dépendances frontend dont l'application à besoin pour fonctionner.
   Une fois l'installation terminée, executez la commande "npm run serve" pour lancer le server frontend, puis entrez l'url local dans votre navigateur.
  
3) Encore à l'aide d'un terminal, rendez-vous dans le dossier "backend", puis executez la même commande "npm install" afin
d'installer les dépendances backend.
Une fois l'installation terminée, executer la commande "nodemon server", puis le server backend se lancera.

L'application est prête à l'utilisation.

Si vous êtes passé par l'étape n°1, Vous avez déjà 7 utilisateurs, 7 posts et plusieurs commentaires par post d'enregistrés.
L'utilisateur n°1 est utilisé par la personne chargée de la modération du réseau.

Les identifiants de connection pour chaque utilisateur utilisent la même architectre, exception faite pour le modérateur:

Utilisateurs de 2 à 6 :

  email: (nom d'utilisateur) + @groupo-mania.fr 
  password: (nom d'utilisateur) avec les deux premières lettres en majuscules + 39300

  exemple avec "simon"
    email: simon@groupo-mania.fr
    password: SImon39300

Utilisateur n°1 (modérateur):

  email: admin@groupo-mania.fr
  password: ADmin39300

Vous pouvez bien entendu créer vos propres utilisateurs avec vos propres identifiants.

