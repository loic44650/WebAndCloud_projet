package webcloud;

import java.util.List;

import javax.jdo.annotations.*;

@PersistenceCapable(identityType=IdentityType.APPLICATION)
public class MessageIndex{
	@Persistent
	private List<Long> receivers;
	
	@Persistent
	Long idMsg;
	
	public MessageIndex(List<Long> receivers) {
		this.receivers = receivers;
	}

	public List<Long> getReceivers() {
		return receivers;
	}

	public void setReceivers(List<Long> receivers) {
		this.receivers = receivers;
	}
	
	public boolean contains(long id)
	{
		return receivers.contains(id);
	}

	public MessageIndex(Long idMsg) {
		this.idMsg = idMsg;
	}

	 
	
}
