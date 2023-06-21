import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";


const cohortName = "2303-ftb-et-web-pt";
const baseUrl = `https://strangers-things.herokuapp.com/api/${cohortName}`;

export const Posts = ({ token }) => {
  const [posts, setPosts] = useState([]);
  const [addPost, setAddPost] = useState(false);
  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);

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
    const searchText = e.target.value;
    setSearch(searchText);
    setSearching(true);
      if (searchText == "") {
        setSearching(false);
      }
  };

   const getSearchPosts = (search, posts) => {
     return posts.filter((post) => post.title.includes(search));
   };
  
   const fileterdPosts = getSearchPosts(search, posts);

  useEffect(() => {
    fetchPosts();
    checkToken();
  }, [token]);

  const formatTime = (timeString) => {
    const formattedTime = format(new Date(timeString), "yyyy-MM-dd");
    return formattedTime;
  };

  return (
    <>
      {addPost === true && <Link to="/Posts/Add">Add Post</Link>}
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={handleSearch}
      />
      {searching === true && (
        <div>
          {fileterdPosts.map((value) => (
            <h1 key={value.title}>{value.title}</h1>
          ))}
        </div>
      )}
      {posts.length > 0 && searching === false &&  (
        <div>
          {posts.map((post) => (
            <div key={post._id}>
              <h3>{post.title}</h3>
              <h4>{post.author.username}</h4>
              <p>{post.description}</p>
              <p>{post.price}</p>
              <p>{post.location}</p>
              <p>{post.willDeliver}</p>
              <p>Posted on: {formatTime(post.createdAt)}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Posts;