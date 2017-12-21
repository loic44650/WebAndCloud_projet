package webcloud;

import javax.jdo.annotations.*;

@PersistenceCapable(identityType=IdentityType.APPLICATION)
public class Auth {
	
	@PrimaryKey
	@Persistent(valueStrategy=IdGeneratorStrategy.NATIVE)
	String token;
	
	Long timestamp;
	
	Long expiresIn;
	
	public Auth(){
		this.timestamp = System.currentTimeMillis();
		this.expiresIn = (long) 30000;
	}

	/**
	 * @return the key
	 */
	public String getKey() {
		return token;
	}

	/**
	 * @param key the key to set
	 */
	public void setKey(String key) {
		this.token = key;
	}

	/**
	 * @return the timestamp
	 */
	public Long getTimestamp() {
		return timestamp;
	}

	/**
	 * @param timestamp the timestamp to set
	 */
	public void setTimestamp(Long timestamp) {
		this.timestamp = timestamp;
	}
	
	
	
}
