import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import EditPost from "./EditPost";


const cohortName = "2303-ftb-et-web-pt";
const baseUrl = `https://strangers-things.herokuapp.com/api/${cohortName}`;

export const Profile = ({ token, setPostIdNum, postIdNum}) => {
  const [userData, setUserData] = useState(null);
  const [editPost, setEditPost] = useState(false);
  const [postNum, setPostNum] = useState('');
  const history = useHistory();

  const handleClick = (event) => {
    event.preventDefault();
    setPostNum(event.target.id);
    console.log(postNum);
    setEditPost(true);
  };
 
  

  const deletePost = async (postId) => {
    try {
      const response = await fetch(`${baseUrl}/posts/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      console.log(result);
      if (result.success) {
        setUserData((prevUserData) => ({
          ...prevUserData,
          posts: prevUserData.posts.filter((post) => post._id !== postId),
        }));
        const updatedUserData = {
          ...userData,
          posts: userData.posts.filter((post) => post._id !== postId),
        };
        localStorage.setItem("userData", JSON.stringify(updatedUserData));
      }
      return result;
    } catch (err) {
      console.error(err);
    }
  };

  const myData = async () => {
    try {
        const response = await fetch(`${baseUrl}/users/me`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response);
        const result = await response.json();
        console.log(result);
        setUserData(result.data);
        return result;
      } catch (err) {
        console.error(err);
      }
    };

    useEffect(() => {
      if (token) {
        myData();
      } else {
        setUserData(null);
      }
    }, [!token]);
  
    useEffect(() => {
      if (userData) {
        localStorage.setItem("userData", JSON.stringify(userData));
      }
    }, [userData]);
  


  return (
    <>
      {!token && (
        <div>
          <h1>Please login or create an account for access.</h1>
        </div>
      )}

      {userData && (
        <div>
          <div key={userData._id}>
            <h1>Welcome back {`${userData.username}`}!</h1>
            <h2>{userData.username}</h2>

            <div className="profile-content">
              {userData.messages && userData.messages.length ? (
                <div>
                  <div id="index-span">
                    <h3 id="inbox"> Inbox ({userData.messages.length})</h3>
                    {userData.messages.map((message) => {
                      return (
                        <div id="message" key={message._id}>
                          <label id="sender">{message.fromUser.username}</label>
                          <p id="message-content">{message.content}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <h3>You haven't received any messages yet.</h3>
              )}


              {userData.posts && userData.posts.length > 0 && (
                <div>
                  <h3>Your Posts</h3>
                  {userData.posts.map((data) => (
                    <div key={data._id}>
                      <h3>{data.title}</h3>
                      <h4>{data.author.username}</h4>
                      <p>{data.description}</p>
                      <p>{data.price}</p>
                      <p>{data.location}</p>
                      <p>{data.willDeliver}</p>
                      <button
                        id={`${data._id}`}
                        onClick={handleClick}
                      >
                        Edit
                      </button>
                      {editPost === true && (
                          <EditPost token={token} userData={userData} postNum={postNum}/>
                        )}
                      <button
                        id={`${data._id}`}
                        onClick={() => deletePost(data._id)}
                      >
                        DELETE
                      </button>
                  </div>
                ))}
              </div>
            )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
