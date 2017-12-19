package webcloud;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
	Set<Long> lesfollows = new HashSet<Long>();// les gens qui me follow
	
	@Persistent
	Set<Long> mesfollow = new HashSet<Long>();
	
	/**
	 * @return the mesfollow
	 */
	public Set<Long> getMesfollow() {
		return mesfollow;
	}

	/**
	 * @param mesfollow the mesfollow to set
	 */
	public void setMesfollow(Set<Long> mesfollow) {
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
	public Set<Long> getLesfollows() {
		return lesfollows;
	}

	/**
	 * @param lesfollows the lesfollows to set
	 */
	public void setLesfollows(Set<Long> lesfollows) {
		this.lesfollows = lesfollows;
	}
	
	public void addFollow(Long e){
		this.lesfollows.add(e);
	}
	
	
}
