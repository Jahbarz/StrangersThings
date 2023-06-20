import { useEffect, useState } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
//import { format } from "date-fns";

const cohortName = "2303-ftb-et-web-pt";
const baseUrl = `https://strangers-things.herokuapp.com/api/${cohortName}`;

export const Posts = ({ token }) => {
  const [posts, setPosts] = useState([]);
  const [addPost, setAddPost] = useState(false);
  const [search, setSearch] = useState('');

  const checkToken = () => {
    if (token.length > 0) {
      setAddPost(true);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${baseUrl}/posts`);
      const result = await response.json();
      console.log(result);
      setPosts(result.data.posts.reverse());
      console.log(posts);
      return result;
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };
  
  if (search.length > 0) {
      posts.filter((post) => {
      return post.title.match(search);
  });
  }

  useEffect(() => {
    fetchPosts();
    checkToken();
  }, [token]);

  // const formatTime = (timeString) => {
  //   const formattedTime = format(new Date(timeString), "yyyy-MM-dd HH:mm");
  //   return formattedTime;
  // };

  return (
    <>
      {addPost === true && <Link to="/Posts/Add">Add Post</Link>}

      {posts.length > 0 && (
        <div>
           <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={handleSearch}
      ></input>
          {posts.map((post) => (
            <div key={post._id}>
              <h3>{post.title}</h3>
              <h4>{post.author.username}</h4>
              {/* <p>{formatTime(post.createdAt)}</p> */}
              <p>{post.description}</p>
              <p>{post.price}</p>
              <p>{post.location}</p>
              <p>{post.willDeliver}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Posts;
