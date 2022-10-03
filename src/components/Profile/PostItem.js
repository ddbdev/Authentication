import classes from "./PostItem.module.css";

const PostItem = (props) => {
  const posts = props.object;
  console.log(posts);
  return (
    <div className={classes["post-list"]}>
      {posts.map((element) => (
        <div key={element.id} className={classes.post}>
          <h2 className={classes.heading}>{element.title}</h2>
          <h3>{element.description}</h3>
          <div className={classes.info}>
            <h3>Written by: {element.user}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostItem;
