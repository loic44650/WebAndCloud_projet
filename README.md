# Projet Web & Cloud

Ceci est le dépot github associé à notre projet de web and cloud.

Jehanno Clément<br/>
Phalavandishvili Demetre <br/>
Duclos Romain<br/>
Mahier Loïc<br/>

M1-ALMA 2017-2018<br/>

# Plan

* [Présentation du sujet](#presentation)
* [Détails d'implémentation](#details)
  * [User](#user)
  * [Message](#message)
  * [MessageIndex](#messageIndex)
* [Tests](#Tests)
  - [Post d'un tweet](#post_twitt)
  - [Récupération des tweets](#recup_tweet)
* [Scalability](#scale)
* [Conclusion](#conclusion)


## Présentation du sujet

- Le sujet est disponible [ici](https://docs.google.com/document/d/1wVf1dWzbmxp5wtJd_I9kAHpke29FpPqe8mPOCv3J1mM/edit#).
- Lien de l'API : https://apis-explorer.appspot.com/apis-explorer/?base=https://1-dot-webcloud-122127.appspot.com/_ah/api#p/
- Lien de l'application web : http://1-dot-webcloud-122127.appspot.com/
- La partie front du projet est réalisé en Angular 2

## Détails d'implémentation

Dans cette section, nous allons expliquer certaines de nos classes ainsi que quelques décisions prises ayant influencées la construction du code.

### La classe User

Avant d'aller plus loin, il faut que nous expliquions comment la classe User est définie.


    @PersistenceCapable(identityType=IdentityType.APPLICATION)
    public class User {
    
    	@PrimaryKey
    	@Persistent(valueStrategy=IdGeneratorStrategy.IDENTITY)
    	Key key;
    
    	@Persistent
    	String name;
    
    	@Persistent
    	@Element(dependent="true")
    	Set<Long> lesGensQuiMeSuit = new HashSet<Long>();// les gens qui me follow
    
    	@Persistent
    	@Element(dependent="true")
        Set<Long> lesGensQueJeSuit = new HashSet<Long>();
    }

La classe User va contenir un nom d'utilisateur et une clé pour l'identifier de manière unique. <br/>
Dans l'idée, nous pourrions aussi rajouter une photo de profil, une description, etc. Tout ce qui est relatif à l'utilisateur en lui-même.<br/>
Les champs "lesGensQueJeSuit" et "lesGensQuiMeSuit" sont importants. Au premier abord, nous pourrions penser que le seul fait de suivre quelqu'un est suffisant. Ainsi, nous aurions juste un champ "lesGensQueJeSuit". Se pose ensuite la question : "A qui dois-je envoyer un messsage quand je poste ?". <br/>
La première idée implique que nous parcourions **tous** les utilisateurs de la base pour aller regarder dans leur liste de follow si il faut envoyer à cet utilisateur ou non. Sur l'exemple de twitter, Rihanna a 84M d'abonnés, twitter recense 330M d'utilisateurs aux dernières nouvelles. <br/>
Avec notre implémentation nous estimons qu'il vaut mieux avoir une liste de 84M d'abonnés que d'en parcourir 330M a **chaque** fois. Ainsi pour une personne qui n'a "que" 1M de follower, nous allons parcourir 1M de follower au lieu de 330M. Encore une fois, il s'agit de perdre en taille pour gagner en temps d’exécution. <br/>


### La classe Message

Voici comment nous avons organisé notre classe Message :

    public class Message {

        @PrimaryKey
        @Persistent(valueStrategy=IdGeneratorStrategy.IDENTITY)
        private Key msgId;
    
        @Persistent
        private Long userId;
    
        @Persistent
        private String message;
    }

Fondamentalement, un message va contenir une clé comme identifiant unique ainsi que l'id du User qui à posté ce message.
La classe Message ne sert qu'à envoyer du texte, nous pourrions très bien y ajouter des photos, des gifs, des vidéos, etc.
Cependant, ce qui nous importe est ce que nous avons vu dans la classe User : lorsqu'un utilisateur poste un message, il faut savoir à qui l'envoyer. Hors, l'information n'est pas définie ici. Nous avons pour y remedier créé une classe MessageIndex.

### La classe Message Index


    @PersistenceCapable(identityType=IdentityType.APPLICATION)
    public class MessageIndex{
    	@PrimaryKey
    	@Persistent(valueStrategy=IdGeneratorStrategy.IDENTITY)
    	Key k;
    	
    	@Persistent
    	Message msg;
    	
    	@Persistent
    	Long userId;
    	
    	@Persistent
    	long timestamp;
    	
    	@Persistent
    	Set<Long> receivers = new HashSet<Long>();
    }

La classe messageIndex est primordiale pour passer à l'échelle. <br/>
Nous avons vu en cours que nos requêtes doivent être rapides, pour ce faire il ne faut pas déseraliser et sérialiser l'intégralité du message (body, photos, etc.). Si vous êtes novices vous trouverez des informations complémentaires [ici](https://www.youtube.com/watch?v=AgaL6NGpkB8). <br/>
C'est pourquoi nous avons la classe MessageIndex, avec quelques petits details supplémentaires : 
La clé est l'identificateur unique. Le fait que le message soit présent ici peut surprendre. En fait, la relation de "parenté" dans le cloud définie par les Entity Group (comme expliqué dans la vidéo plus haut) est gérée automatiquement par le JDO de cette manière. Une autre option consistait à définir deux entitées Message et MessageIndex puis à les push en spécifiant que Message est le parent de MessageIndex. Cependant, le JDO le fait et c'est plus simple. <br/>

Le userId ici est plus qu'étonnant car il faudrait le laisser dans la classe message. Cependant, nous avons un problème quand il faut gérer la rétroactivité des messages. Si un utilisateur en follow un autre, il faut qu'il puisse voir les anciens tweet de la personne qu'il vient de follow. Pour faire cela, il faut parcourir tous les messages, trouver l'id de la bonne personne (afin de savoir quels sont ses messages) et ajouter à la liste des receiver la personne qui vient de le suivre. Or, si nous laissons le userID dans le message, il va falloir le désérialiser entièrement (y compris le body). Mais nous perdons alors trop de temps, nous avons donc décidé de le descendre dans messageIndex. <br/>

Le timestamp nous permet juste de faire les requêtes demandées. Quand on nous demande d'afficher les 10 derniers messages, il faut pouvoir identifier l'ordre de parution des messages. Nous rajoutons donc un Timestamp qui est instancié à la création du message. <br/>
Les receiver sont les personnes à qui sont destiné le message, c'est pour cela que nous avons besoin de la liste de nos follower dans User. Donc nous nous basons sur cette liste, puis nous nous rajoutons afin de voir nos propores tweets. <br/>
Un autre petit détail : quand nous parlons du timestamp, nous ommettons de dire que cela ne fonctionne pas comme ça. Pour savoir quels sont les 10 derniers messages d'un utilisateur, il faut bien 2 choses : les 10 **derniers** destinés à **l'utilisateur**. Pour faire cette requête, nous avons besoin d'un index multivalué sur ces deux champs. <br/>

## Tests

Désormais il s'agit de mesurer nos temps d'exécution.

Avant toute chose, il était demandé de faire des tests dans des configurations maximales de 5000 followers/abonnements. Hors, afin de pouvoir tester correctement, et au vu des quotas assignés par Google, nous ne pourrons tester que pour des configurations maximales de 2500 personnes. 

Pour rappel, il est attendu que nous mesurions :

_ Pour une personne **suivie par** 100, 1000 et 2500 personnes le temps d'exécution pour poster, en moyenne, 10 tweets.

_ Pour une personne **qui suit** 100, 1000 et 2500 personnes le temps d'exécution moyen pour récupérer ses 10, 50 et 100 derniers messages.

Une interface dynamique pour ces tests est disponible sur l'application web dans l'onglet [Calcul Follow](http://1-dot-webcloud-122127.appspot.com/calcul1) et [Test Messages](http://1-dot-webcloud-122127.appspot.com/testMessages). 

Aussi avant d'aller plus loin, il faut revenir sur un point important : au niveau des temps d'exécutions, les premiers appels sont complètements faussés (démarrage des VM, premier accès plus lent, etc). Avec la monté en charge (de plus en plus de requête), nos résultats sont plus cohérents mais apparraissent aussi des anomalies.

Nous avons donc enlevé ces résultats qui s'éloignent vraiment trop pour nos calculs de moyennes, variances et écart-type.

### Post d'un tweet

Nous avons posté pour chaque configuration 15 messages et nous avons récupéré le temps que cela prenait pour chaque message :

![Image pour récupérer les 15 derniers messages suivant la configuration](https://raw.githubusercontent.com/loic44650/WebAndCloud_projet/master/srcImg/calcul%20post%20tweet.png)

Résultats :

| Nombre de followers |       100       |     1000      |       2500       |
| :-----------------: | :-------------: | :-----------: | :--------------: |
|   Moyenne (en ms)   |      286.2      |      326      |    795,64286     |
|      Variance       | 2942,1598492224 | 3190,60041316 | 16989,0864939961 |
| Ecart type (en ms)  |    54,24168     |    56,4854    |    130,34219     |



### Récupération des tweet

Pour remplir cette section, nous avons écrit 1 message par utilisateur dans la base.

Il faut donc suivant les configurations de follower, récupérer les 10, 50, et 100 derniers messages.

Les tests ne seront effectués que sur 15 mesures pour ne pas atteindre les quotas trop rapidement.

###### Récupérer 10 tweet en fonction du nombre d'abonnements

![Lien de l'image test 10 derniers messages](https://raw.githubusercontent.com/loic44650/WebAndCloud_projet/master/srcImg/Calcul%20recup%2010%20messages.png)

| Nombre d'abonnements |       100        |       1000       |       2500       |
| :------------------: | :--------------: | :--------------: | :--------------: |
|   Moyenne (en ms)    |    508,06667     |    582,16667     |       781        |
|   Variance (en ms)   | 28559,9285500489 | 25732,3049029264 | 29753,8660977481 |
|  Ecart type (en ms)  |    168,99683     |    160,41292     |    172,49309     |

###### Récupérer 50 tweet en fonction du nombre d'abonnements

![Lien de l'image test 50 derniers messages](https://raw.githubusercontent.com/loic44650/WebAndCloud_projet/master/srcImg/Calcul%2050%20messages.png)

| Nombre d'abonnements |       100        |       1000       |      2500      |
| :------------------: | :--------------: | :--------------: | :------------: |
|   Moyenne (en ms)    |       925        |      699.7       |   712,42857    |
|   Variance (en ms)   | 54094,9216639225 | 79206,2108385604 | 61489,81521796 |
|  Ecart type (en ms)  |    232,58315     |    281,43598     |    247,9714    |

###### Récupérer 100 tweet en fonction du nombre d'abonnements

![Lien de l'image test 100 derniers messages](https://raw.githubusercontent.com/loic44650/WebAndCloud_projet/master/srcImg/Calcul%20100%20messages.png)

| Nombre d'abonnements |        100        |       1000        |       2500        |
| :------------------: | :---------------: | :---------------: | :---------------: |
|   Moyenne (en ms)    |    1461,57143     |    1921,36364     |    2172,55556     |
|   Variance (en ms)   | 242634,6721877521 | 183378,7746271504 | 204808,2455505025 |
|  Ecart type (en ms)  |     492,57961     |     428,22748     |     452,55745     |


## Scalability

#### Résumé des performances 

Tout d'abord, il faut noter que nos résultats ne sont que des échantillons et ne sont pas forcément représentatifs. Mais ils suffisent pour exhiber notre scalabilité. 

Aussi, nous avons l'impression que Google bloque parfois les requêtes ou les ralentits fortement. Les serveurs sont également indisponibles de temps en temps. Cela nous semble légitime, nous utilisons un services gratuit ce qui ne nous assure pas d'un fonctionnement 100% optimal.

Résumé des performances pour poster un tweet en fonction des gens qui nous suivent :

![Résumé des performances pour poster un tweet en fonction des gens qui nous suivent](https://raw.githubusercontent.com/loic44650/WebAndCloud_projet/master/srcImg/graphe2.png)

Nous observons que suivant le nombre de personnes qui nous suivent, les temps augmentent rapidement mais reste raisonnables : moins de 1 sec en moyenne pour tweet à 2500 personnes. A priori les temps semblent augmenter, mais même à une échelle supérieur, la scalability fera que la diférence ne sera pas si grande.

Résumé des performances pour la récupération des tweet :

![résumé des performances pour la récupération des tweets ](https://raw.githubusercontent.com/loic44650/WebAndCloud_projet/master/srcImg/graphe.png)

Les résultats de performance que nous obtenons à première vu semblent un peu long, mais en réalité, récupérer 100 tweet avec 2500 abonnements en 2 secondes reste relativement correct. Etant donné qu'il n'y a pas un écart énorme entre une récupération de 100 tweet avec 100, 1000 et 2500 abonnements, nous pouvons dire que l'application passe à l'échelle. Du fait de nos quotas limités, il est difficile de mettre en avant des résultats très satisfaisants. En effet nous n'avons pas pu effectuer autant de test que l'aurions souhaité. Mais nous avons réussi à obtenir des temps de réponse bien meilleur que ceux mesurés dans le rapport.

Finalement, la question est :

#### Est-ce que cela scale ? <br/>

D'après les graphiques qui résument les performances de l'API : oui.

Nos messages vont scale grâce à MessageIndex, en fait c'est tout l'intérêt de cette classe. Dans les faits, il est possible de faire pareil pour nos user, mais ici ce n'est pas utile car notre utilisateur n'a "que" un nom. En effet, si il avait une photo de profil, une description, une bannière, etc,il serait ~~intéressant~~ nécessaire de faire la même chose pour scale correctement.

## Conclusion

Au final, nous pensons avoir deployé une application web qui passe à l'échelle. Nous avons eu quelques difficultés techniques tout au long du projet mais l'épreuve principale était de faire fonctionner nos services pour des milliers d'utilisateurs. Nous avons pu remarquer à quel point vouloir faire une application qui passe à l'échelle peut couter cher pour un datastore (quota rempli en quelques tests). Cela nous donne aussi une idée de la complexité et du coup des applications comme Twitter ou Facebook qui doivent gérer des millions de données.
