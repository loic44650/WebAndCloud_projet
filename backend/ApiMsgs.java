package webcloud;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
		PersistenceManager pm = getPersistenceManager();
		try {
			User usr1 = (User) pm.getObjectById(User.class,
					KeyFactory.createKey(User.class.getSimpleName(), msg.getUserId()));
			Set<Long> users = usr1.getLesfollows();
			users.add(msg.getUserId());
			MessageIndex msgIndex = new MessageIndex(msg,users);
			pm.makePersistent(msgIndex);
			return msgIndex.getMessage();
		}
		finally{
			pm.close();
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
		// on recupere tous les MessageIndex
		query.setOrdering("timestamp desc");
		return (List<MessageIndex>) pm.newQuery(query).execute();
	}
	
	
	@SuppressWarnings("unchecked")
	@ApiMethod(name="getMesTwitts",httpMethod="get",path="messagesTwitts/{userID}")
	public List<Message> getMesTwitts(@Named("userID") Long id,@Named("nbTwitt") Long nbLimit){
		PersistenceManager pm = getPersistenceManager();
		List<MessageIndex> msgIndex;
		List<Message> msgs = new ArrayList<>();
		Query query = pm.newQuery(MessageIndex.class);
		// on recupere tous les MessageIndex
		query.setFilter("usersId =="+id	);
		query.setOrdering("timestamp desc");
		query.setRange(0,nbLimit);
		msgIndex = (List<MessageIndex>) query.execute();
		for ( MessageIndex index : msgIndex){
				msgs.add(index.getMessage());
		}
		return msgs;
	}
	
	@SuppressWarnings("unchecked")
	@ApiMethod(name="getMyTimeline",httpMethod="get",path="messagesTimeline/{userID}")
	public List<Message> getMyTimeline(@Named("userID") Long idUser,@Named("nbDeMessages") Long nbMsg)
	{
		PersistenceManager pm = getPersistenceManager();
		List<MessageIndex> msgIndex;
		List<Message> msgs = new ArrayList<>();
		Query query = pm.newQuery(MessageIndex.class);
		// on recupere tous les MessageIndex
		query.setFilter("receivers =="+idUser);
		query.setOrdering("timestamp desc");
		query.setRange(0,nbMsg);
		msgIndex = (List<MessageIndex>) query.execute();
		for ( MessageIndex index : msgIndex){
				msgs.add(index.getMessage());
		}
		return msgs;		
	}
	
	private static PersistenceManager getPersistenceManager() {
		return PMF.get().getPersistenceManager();
	}

}
