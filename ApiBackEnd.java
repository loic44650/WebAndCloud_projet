package wecloud;

import javax.inject.Named;
import javax.jdo.PersistenceManager;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.appengine.api.datastore.KeyFactory;


@Api(name = "TinyTwitt",version="v1")
public class ApiBackEnd {
	
	
	@ApiMethod(name="addUser",httpMethod="POST",path="users")
	public User addUser(User us1){
		User userAdded = getPersistenceManager().makePersistent(us1);
		return userAdded;
	}
	
	@ApiMethod(name="addFollower",httpMethod="POST",path="users/{user}")
	public User addFollow(@Named("user") Long roomId, User us1){
		User usr;
		try {
			usr = (User) getPersistenceManager().getObjectById(User.class,
					KeyFactory.createKey(User.class.getSimpleName(), roomId));
			usr.addFollow(us1);
		}
		finally
		{
			getPersistenceManager().close();
		}
		return usr;
	}

	private static PersistenceManager getPersistenceManager() {
		return PMF.get().getPersistenceManager();
	}

}
