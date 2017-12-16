package tinyTwitt;

import java.util.List;

import javax.inject.Named;
import javax.jdo.PersistenceManager;
import javax.jdo.Query;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.appengine.api.datastore.KeyFactory;


@Api(name = "tinytwitt",version="v1")
public class ApiBackEnd {
	
	
	@ApiMethod(name="addUser",httpMethod="POST",path="users")
	public User addUser(User us1){
		User userAdded = getPersistenceManager().makePersistent(us1);
		return userAdded;
	}
	
	@ApiMethod(name="addFollower",httpMethod="POST",path="users/{idUser}")
	public User addFollow(@Named("idUser") Long userId, User us1){
		User usr;
		try {
			usr = (User) getPersistenceManager().getObjectById(User.class,
					KeyFactory.createKey(User.class.getSimpleName(), userId));
			usr.addFollow(us1);
		}
		finally
		{
			getPersistenceManager().close();
		}
		return usr;
	}
	
	@SuppressWarnings("unchecked")
	@ApiMethod(name="listUSers",httpMethod="get",path="users")
	public List<User> listUsers(){
		PersistenceManager pm = getPersistenceManager();
	    Query query = pm.newQuery(User.class);
	    //
	    return (List<User>) pm.newQuery(query).execute();
	}

	private static PersistenceManager getPersistenceManager() {
		return PMF.get().getPersistenceManager();
	}
	
	
}
