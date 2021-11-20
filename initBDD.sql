DROP DATABASE IF EXISTS groupomania;
CREATE DATABASE groupomania CHARACTER SET 'utf8';
USE groupomania;

SET NAMES utf8;

CREATE TABLE IF NOT EXISTS Users (
  id INTEGER NOT NULL AUTO_INCREMENT,
  userName VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL, 
  imageUrl VARCHAR(255) NOT NULL, createdAt DATETIME NOT NULL, updatedAt DATETIME NOT NULL, PRIMARY KEY (id)) ENGINE=InnoDB;

SHOW INDEX FROM Users;

CREATE TABLE IF NOT EXISTS Posts (
  id INTEGER NOT NULL AUTO_INCREMENT, 
  textPost TEXT CHARACTER SET 'utf8',
  imageUrl VARCHAR(255), 
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
  UserId INTEGER, PRIMARY KEY (id),
  FOREIGN KEY (UserId) REFERENCES Users (id) ON DELETE SET NULL ON UPDATE CASCADE)
  ENGINE=InnoDB;

SHOW INDEX FROM Posts;

CREATE TABLE IF NOT EXISTS Comments (
  id INTEGER NOT NULL AUTO_INCREMENT,
  textComment VARCHAR(255),
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
  UserId INTEGER,
  PostId INTEGER,
  PRIMARY KEY (id), 
  FOREIGN KEY (UserId) REFERENCES Users (id) ON DELETE SET NULL ON UPDATE CASCADE,
  FOREIGN KEY (PostId) REFERENCES Posts (id) ON DELETE SET NULL ON UPDATE CASCADE) 
  ENGINE=InnoDB;

SHOW INDEX FROM Comments;

INSERT INTO Users (userName, email, password, imageUrl, createdAt, updatedAt)
VALUES ('groupomania','admin@groupo-mania.fr','ADmin39300','http://localhost:3000/images/icon.png1637333785597.png','2020-11-02 17:12:13','2020-11-02 17:12:13'),
       ('joachim','joachim@groupo-mania.fr','JOachim39300','http://localhost:3000/images/joachim.jpg1637398220114.jpg','2020-11-02 19:25:28','2020-11-02 19:25:28'),
       ('audrey','audrey@groupo-mania.fr','AUdrey39300','http://localhost:3000/images/audrey.jpg1637398459273.jpg','2020-11-02 21:38:43','2020-11-02 21:38:43'),
       ('ines','ines@groupo-mania.fr','INes39300','http://localhost:3000/images/ines.jpg1637398603969.jpg','2020-11-02 23:51:58','2020-11-02 23:51:58'),
       ('Lorenzo','Lorenzo@groupo-mania.fr','LOrenzo39300','http://localhost:3000/images/lorenzo.jpg1637398728091.jpg','2020-11-03 02:05:13','2020-11-03 02:05:13'),
       ('Liam','Liam@groupo-mania.fr','LIam39300','http://localhost:3000/images/liam.jpg1637398810477.jpg','2020-11-03 04:18:28','2020-11-03 04:18:28'),
       ('Assia','Assia@groupo-mania.fr','ASsia39300','http://localhost:3000/images/assia.jpg1637400169361.jpg','2020-11-03 06:31:43','2020-11-03 06:31:43');

INSERT INTO Posts (textPost, imageUrl, createdAt, updatedAt, UserId)
VALUES ("Chers collaborateurs, chères collaboratrices, c'est avec un immense plaisir que nous vous mettons à disposition cette première version du réseau social Groupomania. Vous pourrez créer des posts, les commenter, en veillant à respecter les règles de diffusions de contenu public, sous peine d'interdiction définitive à l'accès au réseau social, et à une sanction disciplinaire. Chaque auteur de post et/ou de commentaire peut les supprimer à tout moment. Nous comptons sur vos retours afin d'ajouter des fonctionnalités et/ou corriger les disfonctionnements. Cordialement, l'équipe Groupomania",'http://localhost:3000/images/img_accueil.jpg1637405291288.jpg','2020-11-04 08:11:13','2020-11-04 08:11:13', 1),
('Bonjour à tous c''est mon anniversaire mardi, j''apporte les croissants, vous êtes tous conviés dans la salle de réunion mardi à 10h00 pour un petit moment de convivialité, merci de me confirmer votre présence avant lundi, amicalement, Ines.','http://localhost:3000/images/anniversaire.jpg1637412199655.jpg','2020-11-07 10:32:12','2020-11-07 10:32:12',4),
('Hello, je propose un petit jogging ce samedi matin, qui est de la partie ?','http://localhost:3000/images/run.jpg1637412620736.jpg','2020-11-11 11:32:45','2020-11-11 11:32:45',6),
('Salut à tous, l''assossiation dont je fais partie, Always Musicos, organise une série de concert ce même samedi, notre groupe joue à 20h25, ça pourait être simpa de vous y voir, venez nombreux !! :)','http://localhost:3000/images/concert.jpg1637413115527.jpg','2020-11-11 11:32:45','2020-11-11 11:32:45',2),
('Bonjour tout le monde, les dates de vacances de Noël sont tombées. Nous serons en congés le vendredi 18/12/2020 et reprendrons le travail le lundi 04/01/2021. Merci de prendre note, cordialement, l''équipe Groupomania.', NULL,'2020-11-25 09:23:10','2020-11-25 09:23:10',1),
('BONNE ANNÉE À TOUS, BONNE SANTÉ, PLEIN DE BONHEUR POUR TOUT LE MONDE :-D','http://localhost:3000/images/nouvelAn.jpg1637413553111.jpg','2021-01-01 00:01:15','2021-01-01 00:01:15',7),
('Retour de la journée de ski, le jura c''est trop beau !! :)','http://localhost:3000/images/jura.jpg1637418275969.jpg','2021-01-02 10:56:20','2021-01-02 10:56:20',3);


INSERT INTO Comments (textComment, createdAt, updatedAt, UserId, PostId)
VALUES ('Trop bien, merci pour cette initiative :)','2020-11-04 10:43:12','2020-11-04 10:43:12',3,1),
('Merci beaucoup, j''espere que ça apportera de la convivialité','2020-11-04 13:26:05','2020-11-04 13:26:05',5,1),
('Une application mobile sera aussi bientôt disponible ?','2020-11-04 15:32:16','2020-11-04 15:32:16',7,1),
('Pour l''instant ce n''est pas prévu, mais sur le long terme pourquoi pas :)','2020-11-04 16:01:45','2020-11-04 16:01:45',1,1),
('Ce sera avec plaisir, je serai présente, merci :)','2020-11-07 11:47:26','2020-11-07 11:47:26',7,2),
('Ça te fais quel Åge ?','2020-11-07 13:24:36','2020-11-07 13:24:36',6,2),
('32 ans, ça passe tellement vite :-D','2020-11-07 13:46:20','2020-11-07 13:46:20',4,2),
('Je suis ok, ça va faire du bien un peu de sport :)','2020-11-11 13:36:12','2020-11-11 13:36:12',2,3),
('Je serai bien venu mais je dois passer une certification OpenClassrooms hihi','2020-11-11 14:25:55','2020-11-11 14:25:55',5,3),
('Trop cool, tu joue de quel instrument ?','2020-11-12 09:32:12','2020-11-12 09:32:12',4,4),
('De la guitare, c''est trop bien :), tu seras présente je suppose ?','2020-11-12 10:02:16','2020-11-12 10:02:16',2,4),
('Oui normalement j''ai rien de prévu :)','2020-11-12 11:15:13','2020-11-12 11:15:13',4,4),
('C''est noté, merci de l''information','2020-11-25 14:32:16','2020-11-25 14:32:16',6,5),
('Quelqu''un est partant pour une journée au ski dans le Jura pendant les vacances ?','2020-11-25 16:10:20','2020-11-25 16:10:20',7,5),
('Mais trop!! On en rediscute :)','2020-11-25 16:54:26','2020-11-25 16:54:26',3,5),
('Merci bonne année a tous :)','2021-01-01 00:01:10','2021-01-01 00:01:10',4,6),
('Bonne année, bonne santé :)','2021-01-01 00:10:16','2021-01-01 00:10:16',2,6),
('Meilleurs veux à tous','2021-01-01 00:15:45','2021-01-01 00:15:45',1,6),
('Bonne année :)','2021-01-01 00:25:36','2021-01-01 00:25:36',5,6),
('C''est trop chouette!! Vous y êtes allé quand du coup ?','2021-01-02 11:25:32','2021-01-02 11:25:32',4,7),
('Le 22 décembre, on a bien profité','2021-01-02 13:45:10','2021-01-02 13:45:10',7,7),
('Ça donne envie d''y aller','2021-01-02 16:15:13','2021-01-02 16:15:13',6,7);

















