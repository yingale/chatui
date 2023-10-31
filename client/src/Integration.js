// api.js
async function fetchJSONData(url) {
    const response = await fetch(url);
  
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  
    return response.json();
  }
  
  export async function fetchUserData() {
    return fetchJSONData('http://localhost:3005/user');
  }
  
  export async function fetchGroupData() {
    return fetchJSONData('http://localhost:3005/groups');
  }
  
  export async function postUserData(userData) {
    const url = 'http://localhost:3005/user';
  
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Set the content type to JSON
      },
      body: JSON.stringify(userData), // Convert the user data to JSON string
    });
  
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  
    return response.json();
  }

  export async function login(userData) {
    const url = 'http://localhost:3005/auth/login';
  
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Set the content type to JSON
      },
      body: JSON.stringify(userData), // Convert the user data to JSON string
    });
  
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  
    return response.json();
  }
  
  export async function postMessageData(userData) {
    const url = 'http://localhost:3005/messages/create';
  
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Set the content type to JSON
      },
      body: JSON.stringify(userData), // Convert the user data to JSON string
    });
  
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  
    return response.json();
  }

  export async function fetchMessage(senderId,receiverId) {
    return fetchJSONData(`http://localhost:3005/messages/chatByUser/${senderId}/${receiverId}`);
  }
  export async function fetchMessageGroup(groupId) {
    return fetchJSONData(`http://localhost:3005/messages/chatByGroup/${groupId}`);
  }