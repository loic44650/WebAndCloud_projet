package webcloud;

import java.util.List;
import javax.jdo.annotations.*;
import com.google.appengine.api.datastore.Key;

@PersistenceCapable(identityType=IdentityType.APPLICATION)
public class User {

	@PrimaryKey
	@Persistent(valueStrategy=IdGeneratorStrategy.IDENTITY)
	Key key;
	
	@Persistent
	String name;
	
	@Persistent
	@Element(dependent="true")
	List<User> lesfollows;

	/**
	 * @return the key
	 */
	public Key getKey() {
		return key;
	}

	public long getId(){
		return (key != null) ? key.getId() : -1;
	}
	/**
	 * @param key the key to set
	 */
	public void setKey(Key key) {
		this.key = key;
	}

	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}

	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * @return the lesfollows
	 */
	public List<User> getLesfollows() {
		return lesfollows;
	}

	/**
	 * @param lesfollows the lesfollows to set
	 */
	public void setLesfollows(List<User> lesfollows) {
		this.lesfollows = lesfollows;
	}
	
	public void addFollow(User e){
		this.lesfollows.add(e);
	}
	
	
}
