import classes from "./UserProfile.module.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import PostItem from "./PostItem";
const UserProfile = () => {
  const authenticatedSelector = useSelector((state) => state.Authenticated);
  const authorizationSelector = useSelector((state) => state.Authorization);
  const [posts, fetchPost] = useState([]);
  const [check, setCheck] = useState(false);
  const fetchData = () => {
    let url = "http://localhost:8080/post";
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: authorizationSelector,
        Authenticated: authenticatedSelector,
      },
    }).then(async (res) => {
      if (res.ok) {
        res.json().then((data) => {
          setCheck(true);
          const postRequested = data;
          postRequested.map((el) => [
            {
              id: el.id,
              title: el.title,
              description: el.description,
              author: el.user,
            },
          ]);
          fetchPost(postRequested);
        });
      } else {
        console.log("Problema con il login");
      }
    });
  };
  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <p>Authenticated {authenticatedSelector}</p>
      <p>Authorization {authorizationSelector}</p>
      <button onClick={fetchData}>Fetch</button>
      {check && <PostItem object={posts} />}
    </section>
  );
};

export default UserProfile;
