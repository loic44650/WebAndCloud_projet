# WebAndCloud_projet
Ce qu'il faudra pas oublier :

Un summary de l'API avec un lien vers
Résumé des tests avec des liens vers
Détails d'implémentations :   pourquoi message est comme ça, pourquoi messageIndex, user, expliquer ce qui est chiant avec la rétroactivité


# Projet Web & Cloud

Ceci est le dépot github associé à notre projet de web and cloud.

Jehanno Clément<br/>
Phalavandishivli (dsl deme) Demetre <br/>
Duclos Romain<br/>
Mahier Loïc<br/>

M1-ALMA 2017-2018<br/>

# Plan

* [Présentation du sujet](#presentation)
* [Détails d'implémentation](#details)
  * [User](#user)
  * [Message](#message)
  * [MessageIndex](#messageIndex)
* [API](#API)
* [Scalability](#scale)
* [Conclusion](#conclusion)


## Présentation du sujet

Le sujet est disponible [ici](https://docs.google.com/document/d/1wVf1dWzbmxp5wtJd_I9kAHpke29FpPqe8mPOCv3J1mM/edit#).


## Détails d'implémentation

Dans cette section nous allons expliquer certaines de nos classes ainsi que quelques décisions que nous avons prises qui ont donc influencé la construction du code.

### La classe User

Avant d'aller plus loin il faut que nous expliquions comment la classe User est définie


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
Dans l'idée on pourrait aussi rajouter une photo de profil, une description, etc. Tout ce qui est relatif à l'utilisateur en lui-même.<br/>
Les champs "lesGensQueJeSuit" et "lesGensQuiMeSuit" sont importants. Au premier abord on pourrait penser que uniquement le fait de suivre quelqu'un est suffisant. Ainsi on aurait juste un champ "lesGensQueJeSuit". Se pose ensuite la question de savoir "A qui je dois envoyer un messsage quand je poste ?". <br/>
La première idée implique que nous parcourions **tous** les utilisateurs de la base pour aller regarder dans leur liste de follows si il faut envoyer à cet utilisateur ou non. Sur l'exemple de twitter, Rihanna a 84M d'abonnés, twitter recense 330M d'utilisateurs aux dernières nouvelles. <br/>
Avec notre implémentation nous estimons qu'il vaut mieux avoir une liste de 84M d'abonnés qu'en parcourir 330M a **chaque** fois, car la personne qui n'a "que" 1M de follower, on va parcourir 1M au lieu de 330M. Encore une fois il s'agit de perdre en taille pour gagner en temps d’exécution. <br/>


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

Fondamentalement un message va contenir une clé comme identifiant unique ainsi que l'id de l'User qui posté ce message.
La classe message ne sert que à envoyer du texte, on pourrait très bien y ajouter des photos, des gifs, des vidéos, etc. Qu'importe.
Cependant ce qui nous importe c'est ce que nous avons vu dans la classe User : lorsqu'un utilisateur poste un message il faut savoir à qui l'envoyer, hors l'information n'est pas définie ici. Nous avons crée une classe messageIndex sur laquelle nous allons revenir car c'est elle qui importe.

### La classe Message Index


    @PersistenceCapable(identityType=IdentityType.APPLICATION)
    public class MessageIndex{
    	@PrimaryKey
    	@Persistent(valueStrategy=IdGeneratorStrategy.IDENTITY)
    	Key k;
    
    	@Persistent
    	Message msg;
    
    	@Persistent
    	long timestamp;
    
    	@Persistent
        Set<Long> receivers = new HashSet<Long>();
    }

La classe messageIndex est primordiale pour scale. <br/>
Nous avons vu en cours que ce qui nous importe c'est que nos requêtes soient rapides et pour se faire il ne faut pas déseraliser et sérialiser l'intégralité du message (body, photos, etc.) si vous êtes novices vous trouverez des informations complémentaires [ici](https://www.youtube.com/watch?v=AgaL6NGpkB8). <br/>
Donc il nous faut scale. C'est pourquoi nous avons la classe messageIndex. Sauf que nous avons quelques petits détails supplémentaires, c'est ce sur quoi nous allons revenir dans cette section. <br/>
La clé est l'identificateur unique ici. Le message quand à lui peut surprendre ici. En fait la relation de "parenté" dans le cloud définie par les entity groups (comme expliqué dans la vidéo plus haut) est gérée automatiquement par le JDO de cette manière. Une autre option consistait à définir deux entitées message et messageIndex puis les push en spécifiant que message est le parent de messageIndex, mais le JDO le fait et c'est plus simple. <br/>
Le timestamp nous permet juste de pouvoir faire les requêtes demandées quand on nous demande d'afficher les 10 **derniers** messages il faut bien savoir quels sont ces 10 derniers donc on rajoute un long qui est géré à la création du message (cf code). <br/>
Les receivers sont les personnes à qui sont destinés le message, c'est pour ça qu'on a besoin de la liste de qui nous follow dans User. Donc on se base sur ça et on n'oublie pas de se rajouter afin de voir nos propores tweets (eh oui). <br/>
Un autre petit détail : ici quand on parle du timestamp on met sous tapis le fait que en l'état la requête ne fonctionne pas comme ça : pour savoir quels sont les 10 derniers messages d'un utilisateur il faut bien 2 choses : les 10 **derniers** destiné à **l'utilisateur** donc pour faire cette requête on a besoin d'un index multivalué sur ces deux champs. <br/>

## API




## Scalability

#### Est-ce qu'on scale ? 
C'est la question qu'on se pose.
La réponse est oui, clairement.
Nos messages vont scales grâce à messageIndex en fait c'est tout l'intérêt de faire ça. Dans les faits il est possible de faire pareil pour nos users mais ici ce n'est pas utile car notre utilisateur n'a "que" un nom, si il avait une photo de profil, une description, une bannière, un site, etc. Il serait ~~intéressant~~ nécessaire de faire la même chose pour scale correctement.
# WebAndCloud_projet
