package webcloud;

import java.util.List;

import javax.inject.Named;
import javax.jdo.PersistenceManager;
import javax.jdo.Query;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.appengine.api.datastore.KeyFactory;


@Api(name = "users",version="v1")
public class ApiBackEnd {
	
	
	@ApiMethod(name="addUser",httpMethod="POST",path="users")
	public User addUser(User us1){
		PersistenceManager pm = getPersistenceManager();
		User userAdded = pm.makePersistent(us1);
		//User temp = addFollow(userAdded.getKey().getId(),userAdded.getKey().getId());
		return userAdded;
	}
	
	@ApiMethod(name="addFollower",httpMethod="POST",path="users/{idUser}/addFollower")
	public User addFollow(@Named("idUser") Long userId,@Named("aSuivre") Long user){
		User usr,usrAsuivre;
		try {
			PersistenceManager pm = getPersistenceManager();
			usr = (User) pm.getObjectById(User.class,
					KeyFactory.createKey(User.class.getSimpleName(), userId));
			usrAsuivre = (User) pm.getObjectById(User.class,
					KeyFactory.createKey(User.class.getSimpleName(), user)); 
			usr.ajoutLesGensQueJeSuit(user);
			usrAsuivre.ajoutLesGensQuiMeFollow(userId);
			
			Query query = pm.newQuery(MessageIndex.class);
			query.setFilter("userId ==" + user);
			@SuppressWarnings("unchecked")
			List<MessageIndex> listMI = (List<MessageIndex>) query.execute();
			for (MessageIndex mi : listMI){
				mi.getReceivers().add(userId);
			}
		}
		finally
		{
			getPersistenceManager().close();
		}
		return usrAsuivre;
	}
	
	@SuppressWarnings("unchecked")
	@ApiMethod(name="listUsers",httpMethod="get",path="users")
	public List<User> listUsers(){
		PersistenceManager pm = getPersistenceManager();
	    Query query = pm.newQuery(User.class);
	    return (List<User>) query.execute();
	}
	
	/*
	 * il rajout a userID nb de limit folower
	 */
	@ApiMethod(name="genereFollower",httpMethod="post",path="users/addFollowerTo/{idUser}")
	public User genereFollower(@Named("idUser") Long userID,@Named("limit") Long limit)
	{
		PersistenceManager pm = getPersistenceManager();
		Query query = pm.newQuery(User.class);
		query.setRange(0,limit+1);
		query.setOrdering("name asc");
		User userToFollow = pm.getObjectById(User.class,KeyFactory.createKey(User.class.getSimpleName(), userID));
	    @SuppressWarnings("unchecked")
		List<User> listUsers = (List<User>) query.execute();
	    for (User temp : listUsers){
	    	temp.ajoutLesGensQueJeSuit(userID);
	    	userToFollow.ajoutLesGensQuiMeFollow(temp.getKey().getId());	    	
	    }
		return (User) pm.getObjectById(User.class,KeyFactory.createKey(User.class.getSimpleName(), userID));
		
	}
	
	/*
	 * il rajout a userID nb entre limit min et max follower
	 */
	@ApiMethod(name="ajoutPersonneFollower",httpMethod="post",path="users/{idUser}/usersTofollowRange")
	public User ajoutPersonneFollower(@Named("idUser") Long userID,@Named("limitMin") Long limitMin,@Named("limitMax") Long limitMax)
	{
		PersistenceManager pm = getPersistenceManager();
		Query query = pm.newQuery(User.class);
		query.setRange(limitMin,limitMax);
		query.setOrdering("name asc");
		User userToFollow = pm.getObjectById(User.class,KeyFactory.createKey(User.class.getSimpleName(), userID));
	    @SuppressWarnings("unchecked")
		List<User> listUsers = (List<User>) query.execute();
	    for (User temp : listUsers){
	    	userToFollow.ajoutLesGensQuiMeFollow(temp.getKey().getId());
	    	temp.ajoutLesGensQueJeSuit(userID);	    	
	    }
		return (User) pm.getObjectById(User.class,KeyFactory.createKey(User.class.getSimpleName(), userID));
		
	}
	
	/**
	 * Ajoute aux userId des abonnes/abonnements
	 * @param userID
	 * @param limit
	 * @return
	 */
	@ApiMethod(name="ajoutMoiAbonne",httpMethod="post",path="users/{idUser}/usersTofollow")
	public User addNFollow(@Named("idUser") Long userID,@Named("limit") Long limit)
	{
		PersistenceManager pm = getPersistenceManager();
		Query query = pm.newQuery(User.class);
		query.setRange(0,limit+1);
		query.setOrdering("name asc");
		User moi = pm.getObjectById(User.class,KeyFactory.createKey(User.class.getSimpleName(), userID));
	    @SuppressWarnings("unchecked")
		List<User> listUsers = (List<User>) query.execute();
	    for (User temp : listUsers){
	    	moi.ajoutLesGensQueJeSuit(temp.getKey().getId());
	    	temp.ajoutLesGensQuiMeFollow(userID);
	    }
		return moi;
		
	}	
	
	/**
	 * Ajoute aux userId des abonnes/abonnements entre min et max
	 * @param userID
	 * @param limit
	 * @return
	 */
	@ApiMethod(name="ajoutMoiAbonneRange",httpMethod="post",path="users/{idUser}/usersTofollow/min/{Min}/max/{Max}")
	public User addNFollowRange(@Named("idUser") Long userID,@Named("Min") Long min,@Named("Max") Long max)
	{
		PersistenceManager pm = getPersistenceManager();
		Query query = pm.newQuery(User.class);
		query.setRange(min,max+1);
		query.setOrdering("name asc");
		User moi = pm.getObjectById(User.class,KeyFactory.createKey(User.class.getSimpleName(), userID));
	    @SuppressWarnings("unchecked")
		List<User> listUsers = (List<User>) query.execute();
	    for (User temp : listUsers){
	    	moi.ajoutLesGensQueJeSuit(temp.getKey().getId());
	    	temp.ajoutLesGensQuiMeFollow(userID);
	    }
		return moi;
		
	}	
	
	@ApiMethod(name="getUser",httpMethod="get",path="users/{iduser}")
	public User getUser(@Named("iduser") Long id){
		PersistenceManager pm = getPersistenceManager();
		return (User) pm.getObjectById(User.class,KeyFactory.createKey(User.class.getSimpleName(), id));
	}
	
	@SuppressWarnings("unchecked")
	@ApiMethod(name="getUserSuggestions",httpMethod="get",path="users/{userId}/getSuggestions/min/{Min}/max/{Max}")
	public List<User> getUserSuggestions(@Named("userId") Long userId,@Named("Min") Long min,@Named("Max") Long max){
		PersistenceManager pm = getPersistenceManager();
		//User temp = (User) pm.getObjectById(User.class,KeyFactory.createKey(User.class.getSimpleName(),userId));
		Query query = pm.newQuery(User.class);
		query.setRange(min,max);
		query.setFilter("lesGensQuiMeSuit != "+userId);
		return (List<User>) query.execute();		
	} 
 	
	private static PersistenceManager getPersistenceManager() {
		return PMF.get().getPersistenceManager();
	}
	
	
}
