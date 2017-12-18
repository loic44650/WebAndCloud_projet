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
	List<Long> lesfollows;// les gens qui me follow
	
	@Persistent
	List<Long> mesfollow;
	
	/**
	 * @return the mesfollow
	 */
	public List<Long> getMesfollow() {
		return mesfollow;
	}

	/**
	 * @param mesfollow the mesfollow to set
	 */
	public void setMesfollow(List<Long> mesfollow) {
		this.mesfollow = mesfollow;
	}

	public void ajoutMesFollow(Long e)
	{
		this.mesfollow.add(e);
	}

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
	public List<Long> getLesfollows() {
		return lesfollows;
	}

	/**
	 * @param lesfollows the lesfollows to set
	 */
	public void setLesfollows(List<Long> lesfollows) {
		this.lesfollows = lesfollows;
	}
	
	public void addFollow(Long e){
		this.lesfollows.add(e);
	}
	
	
}
