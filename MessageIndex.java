package webcloud;

//import java.util.List;

import java.util.List;

import javax.jdo.annotations.*;

import com.google.appengine.api.datastore.Key;


@PersistenceCapable(identityType=IdentityType.APPLICATION)
public class MessageIndex{
	@PrimaryKey
	@Persistent(valueStrategy=IdGeneratorStrategy.IDENTITY)
	Key k;
	
	@Persistent
	Message msg;
	
	@Persistent
	List<Long> receivers;
	
	

	public MessageIndex(Message msg, List<Long> list) {
		this.msg = msg;
		this.receivers = list;
	}

	/**
	 * @return the msg
	 */
	public Message getMsg() {
		return msg;
	}

	/**
	 * @param msg the msg to set
	 */
	public void setMsg(Message msg) {
		this.msg = msg;
	}

	/**
	 * @return the receivers
	 */
	public List<Long> getReceivers() {
		return receivers;
	}

	/**
	 * @param receivers the receivers to set
	 */
	public void setReceivers(List<Long> receivers) {
		this.receivers = receivers;
	}

	public boolean contains(Long id) {
		return this.receivers.contains(id);
	}
	
	public Message getMessage(){
		return this.msg;
	}
	
	 
	
}
