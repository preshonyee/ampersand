import { Avatar, Button } from "antd";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  .profile {
    display: flex;
    align-items: flex-start;
  }

  .profile div:last-child {
    margin-left: 1rem;
    p {
      margin: 0;
    }
    button {
      padding: 0;
    }
  }

  h1 {
    text-transform: capitalize;
  }
`;

interface IUserCard {
  isEmpty: boolean;
}

const UserCard: React.FC<IUserCard> = ({ isEmpty }) => {
  const history = useHistory();
  const { user } = useSelector((state: any) => state.user);

  console.log({ user });

  return (
    <Wrapper>
      <div className="profile">
        <Avatar size={80} src={user.profilePicture} />
        <div>
          <h1>
            {user.firstName} {user.lastName}
          </h1>
          <p>{user.email}</p>
          <Button type="link">Edit Profile</Button>
        </div>
      </div>
      <p></p>
      <Button block onClick={() => history.push("/editor")}>
        {isEmpty ? "Create Resume" : "Update Resume"}
      </Button>
    </Wrapper>
  );
};

export default UserCard;
