package webcloud;

import java.util.List;

import javax.jdo.PersistenceManager;
import javax.jdo.Query;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;

@Api(name = "auth",version="v1")
public class ApiAuth {
	
	@ApiMethod(name="getSession",httpMethod="post",path="session")
	public Auth getSession(User user) throws Exception{
		Auth auth = null;
		PersistenceManager pm = getPersistenceManager();
		Query query = pm.newQuery(User.class);
		query.setFilter("name =="+user.getName());
		query.setOrdering("name asc");
		List<User> lesUsers = (List<User>) query.execute();
		for (User tmp:lesUsers)
		{
			if ((tmp.getName().equals(user.getName())) && (tmp.getPassword().equals(user.getPassword()))){
				auth = new Auth();
			}
		}
		if (auth == null){
			throw new Exception("Object already exists");
		}
		pm.makePersistent(auth);
		return auth;
	}
	
	private static PersistenceManager getPersistenceManager() {
		return PMF.get().getPersistenceManager();
	}
}
