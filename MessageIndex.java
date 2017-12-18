package webcloud;

import java.util.List;
import javax.jdo.annotations.*;
import com.google.appengine.api.datastore.Key;

@PersistenceCapable(identityType=IdentityType.APPLICATION)
public class MessageIndex extends Message {
	@Persistent
	private List<Long> receivers;
	
	
}
