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
			usr = (User) getPersistenceManager().getObjectById(User.class,
					KeyFactory.createKey(User.class.getSimpleName(), userId));
			usrAsuivre = (User) getPersistenceManager().getObjectById(User.class,
					KeyFactory.createKey(User.class.getSimpleName(), user)); 
			usr.ajoutLesGensQueJeSuit(user);
			usrAsuivre.ajoutLesGensQuiMeFollow(userId);
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
	    return (List<User>) pm.newQuery(query).execute();
	}
	
	
	private static PersistenceManager getPersistenceManager() {
		return PMF.get().getPersistenceManager();
	}
	
	
}
