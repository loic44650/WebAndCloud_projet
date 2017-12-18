package webcloud;

import java.util.List;

import javax.inject.Named;
import javax.jdo.PersistenceManager;
import javax.jdo.Query;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.appengine.api.datastore.KeyFactory;


@Api(name = "messages",version="v1")
public class ApiMsgs {
	
	@ApiMethod(name="addMessage",httpMethod="post",path="messages")
	public Message addMessage(Message msg){
		Message msgAdded = getPersistenceManager().makePersistent(msg);
		return msgAdded;	
	}
	
	@SuppressWarnings("unchecked")
	@ApiMethod(name="listMessages",httpMethod="get",path="messages")
	public List<Message> listMessages(){
		PersistenceManager pm = getPersistenceManager();
	    Query query = pm.newQuery(Message.class);
	    //
	    return (List<Message>) pm.newQuery(query).execute();
	}
	
	private static PersistenceManager getPersistenceManager() {
		return PMF.get().getPersistenceManager();
	}

}
