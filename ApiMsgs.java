package webcloud;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Named;
import javax.jdo.PersistenceManager;
import javax.jdo.Query;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.KeyFactory;


@Api(name = "messages",version="v1")
public class ApiMsgs {
	
	@ApiMethod(name="addMessage",httpMethod="post",path="messages")
	public MessageIndex addMessage(Message msg){
		try {
			//Message msgAdded = getPersistenceManager().makePersistent(msg);
			User usr1 = (User) getPersistenceManager().getObjectById(User.class,
					KeyFactory.createKey(User.class.getSimpleName(), msg.getUserId())); 
			
			MessageIndex msgIndex = new MessageIndex(msg,usr1.getLesfollows());
			getPersistenceManager().makePersistent(msgIndex);
			return msgIndex;
		}
		finally{
			getPersistenceManager().close();
		}
	}
	
	@SuppressWarnings("unchecked")
	@ApiMethod(name="listMessages",httpMethod="get",path="messages")
	public List<Message> listMessages(){
		PersistenceManager pm = getPersistenceManager();
	    Query query = pm.newQuery(Message.class);
	    return (List<Message>) pm.newQuery(query).execute();
	}
	
	@SuppressWarnings("unchecked")
	@ApiMethod(name="listMessagesIndex",httpMethod="get",path="messagesIndex")
	public List<MessageIndex> listMessagesIndex(){
		PersistenceManager pm = getPersistenceManager();
	    Query query = pm.newQuery(MessageIndex.class);
	    return (List<MessageIndex>) pm.newQuery(query).execute();
	}
	
	
	@SuppressWarnings("unchecked")
	@ApiMethod(name="getmytwitts",httpMethod="get",path="messagesIndex/userID")
	public List<Message> getmytwitts(@Named("userID") Long id){
		PersistenceManager pm = getPersistenceManager();
		List<MessageIndex> msgIndex;
		List<Message> msgs = new ArrayList<>();
		Query query = pm.newQuery(MessageIndex.class);
		// on recupere tous les MessageIndex
		msgIndex = (List<MessageIndex>) pm.newQuery(query).execute();
		for ( MessageIndex index : msgIndex){
			if (index.contains(id)) 
				msgs.add(index.getMessage());
		}
		return msgs;
	}
	
	private static PersistenceManager getPersistenceManager() {
		return PMF.get().getPersistenceManager();
	}

}
