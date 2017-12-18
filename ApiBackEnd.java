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
		User userAdded = getPersistenceManager().makePersistent(us1);
		return userAdded;
	}
	
	@ApiMethod(name="addFollower",httpMethod="POST",path="users/{idUser}")
	public User addFollow(@Named("idUser") Long userId,@Named("followToAdd") Long us1){
		User usr,usr1;
		try {
			usr = (User) getPersistenceManager().getObjectById(User.class,
					KeyFactory.createKey(User.class.getSimpleName(), userId));
			usr1 = (User) getPersistenceManager().getObjectById(User.class,
					KeyFactory.createKey(User.class.getSimpleName(), us1)); 
			usr1.addFollow(userId);
			usr.ajoutMesFollow(us1);
		}
		finally
		{
			getPersistenceManager().close();
		}
		return usr;
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
