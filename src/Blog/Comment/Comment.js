function Comment({ comment }) {
  return (<p style={{
      padding: "20px",
      borderBottom: "1px solid #000",
      width: "max(85%, 300px)",
      marginLeft: "auto",
      marginRight: "auto"}}>
    { comment }
  </p>);
}
export default Comment;
