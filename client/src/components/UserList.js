import { useEffect, useState } from 'react';
import socket from '../Socket';
import { fetchUserData, fetchGroupData } from '../Integration';

function UserList() {
  const [users, setUsers] = useState(null);
  const [groups, setGroups] = useState(null);

  const handleUserClick = (username, uid, type) => {
    const chatUrl = `/chat/${type}/${username}/${uid}`; // Replace with the correct URL
    window.open(chatUrl, '_blank');
  };

  useEffect(() => {
    async function getallusers() {
      let dbUsers = await fetchData();
      setUsers(dbUsers);
    }

    function onNewUser(newUser) {
      let userData = {
        "username":newUser
      }
      setUsers([...users, userData]);
    }

    // New user
    socket.on('new user', onNewUser);
    getallusers();
    return () => {
      socket.off('new user', onNewUser);
    }
  }, []);

    async function fetchData() {
      try {
        const [userData, groupData] = await Promise.all([fetchUserData(), fetchGroupData()]);
        setGroups(groupData);
        return userData;
      } catch (err) {
       // setError(err.message);
      }
    }
  return (
    <div>
      <h2 className="has-text-centered is-size-6">All Connections ({users && users.length})</h2>
      <div style={{ height: "200px", overflow: "scroll" }}>
        <ul>
          {users && users.map((user, index) => (
            <li onClick={() => handleUserClick(user.username, user.id,"user")} style={{cursor:"pointer"}} key={user.id}>{user.username}</li>
          ))}
        </ul>
      </div>
      <h2 style={{ marginTop: "30px" }} className="has-text-centered is-size-6">All Groups ({groups && groups.length})</h2>
      <div style={{ height: "200px", overflow: "scroll" }}>
        <ul>
          {groups && groups.map((group, index) => (
            <li onClick={() => handleUserClick(group.group_name, group.id,"group")} key={group.id}>{group.group_name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default UserList;
