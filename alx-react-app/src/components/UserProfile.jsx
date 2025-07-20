

// UserProfile is a functional component that receives props
function UserProfile(props) {
  return (
    <div>
      {/* Display the user's name from props */}
      <h2>Name: {props.name}</h2>
      {/* Display the user's age from props */}
      <p>Age: {props.age}</p>
      {/* Display the user's bio from props */}
      <p>Bio: {props.bio}</p>
    </div>
  );
}

export default UserProfile;
