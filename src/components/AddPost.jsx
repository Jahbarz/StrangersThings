import { useState } from "react";
import { useHistory } from "react-router-dom";

const cohortName = "2303-ftb-et-web-pt";
const baseUrl = `https://strangers-things.herokuapp.com/api/${cohortName}`;

export const AddPost = ({ token }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [checked, setChecked] = useState(false);
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    makePost();
    setTitle("");
    setDescription("");
    setPrice("");
    setChecked(false);
    history.push("/Posts");
  };

  const makePost = async () => {
    try {
      const response = await fetch(`${baseUrl}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          post: {
            title: title,
            description: description,
            price: price,
            willDeliver: checked,
          },
        }),
      });
      const result = await response.json();
      console.log(result);
      return result;
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>New Post</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(event) => {
          setTitle(event.target.value);
        }}
      ></input>
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(event) => {
          setDescription(event.target.value);
        }}
      ></input>
      <input
        type="text"
        placeholder="Price"
        value={price}
        onChange={(event) => {
          setPrice(event.target.value);
        }}
      ></input>
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={() => {
            console.log(checked);
            setChecked(!checked);
            console.log(checked);
          }}
        />
        Willing to Deliver?
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddPost;