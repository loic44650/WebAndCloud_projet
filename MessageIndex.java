package webcloud;

import java.util.List;
import javax.jdo.annotations.*;
import com.google.appengine.api.datastore.Key;

@PersistenceCapable(identityType=IdentityType.APPLICATION)
public class MessageIndex extends Message {
	@Persistent
	private List<Key> receivers;

	/**
	 * @return the receivers
	 */
	public List<Key> getReceivers() {
		return receivers;
	}

	/**
	 * @param receivers the receivers to set
	 */
	public void setReceivers(List<Key> receivers) {
		this.receivers = receivers;
	}
	
	
}
