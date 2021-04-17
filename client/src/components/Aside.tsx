import styled from "styled-components";
import { Button, Avatar } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import UserCard from "./UserCard";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constants/BaseURL";
import axios, { AxiosResponse } from "axios";
import { TOKEN } from "../constants/Token";
import { ExternalLink } from "react-feather";

const Radar = styled.div`
  width: 100%;
  height: 400px;
  background-color: #fff;
  border-radius: 1rem;
  padding: 1rem;
  .title {
    display: flex;
    justify-content: space-between;
  }
  .list-item {
    display: flex;
    margin: 1.5rem 0;
  }
  .company {
    margin: 0 0.5rem;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-content: space-between;

  @media (min-width: 800px) {
    width: 40%;
  }

  @media (min-width: 1200px) {
    width: 40%;
  }
`;

interface IEntries {
  _id: string;
  avatar: string;
  companyName: string;
  linkToCareersPage: string;
}

const Aside = () => {
  const [loading] = useState(false);
  const [entries, setEntries] = useState<IEntries[]>([]);

  const getRadarEntries = () => {
    axios
      .get(`${BASE_URL}/radar`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((response: AxiosResponse<any>) => {
        setEntries(response.data.result);
      });
  };

  useEffect(() => {
    getRadarEntries();
  }, []);

  return (
    <Wrapper>
      <UserCard />
      <Radar>
        <div className="title">
          <h2>On Your Radar</h2>
          <Button loading={loading} shape="round" icon={<PlusOutlined />}>
            Add company
          </Button>
        </div>
        {entries.map((entry) => (
          <div key={entry._id} className="list-item">
            <Avatar size={48} src={entry.avatar} />
            <div className="company">
              <h3>{entry.companyName}</h3>
              <span>
                <a href={entry.linkToCareersPage}>See openings</a>{" "}
                <ExternalLink color="#ff5a5f" size={14} />
              </span>
            </div>
          </div>
        ))}
      </Radar>
    </Wrapper>
  );
};

export default Aside;
