import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Styled from "styled-components";
import { toast } from 'react-toastify';


const Home = ({ setProgress }) => {
  const [data, setData] = useState({});
  const getData = async () => {
    
    let ApiReq = await fetch(
      "https://clone-1211-default-rtdb.firebaseio.com/videosData.json",
      {
        method: "GET"
      }
    );
    let ApiRes = await ApiReq.json();
    setData(ApiRes);
  };
  useEffect(() => {
    setProgress(20);
    getData();
    toast.promise(getData, {
              pending: "Loading Videos...",
              success: "",
              error: "Something West Wrong!!!"
            });
    setProgress(100);
  }, []);
  return (
    <>
      <div style={{ padding: "0 1rem" }}>
        <div className="container">
          <VideoWrapper>
            {Object.keys(data).map((item, i) => {
              return (
                <Video key={item}>
                  <NavLink to={`/view/${item}`}>
                    <img src={data[item].thumbURL} alt={data[item].title} />
                    <h1>{data[item].title}</h1>
                  </NavLink>
                </Video>
              );
            })}
          </VideoWrapper>
        </div>
      </div>
    </>
  );
};

const Video = Styled.div`
  width:100%;
  cursor:pointer;
  margin-top:0.8rem;
  box-shadow:0px 0px 4px 3px rgba(0,0,0,0.2);
  border-radius:8px;
  a{
    text-decoration:none;
    color:black;
  }
  img{
    width:100%;
    min-height:200px;
    background:gray;
    height:auto;
    max-height:200px;
    object-fit:cover;
      border-top-right-radius:5px;
      border-top-left-radius:5px;
  }
  h1{
    text-transform:capitalize;
    margin:0.6rem 0.8rem;
    font-size:1rem;
  }
`;

const VideoWrapper = Styled.div`
  display:grid;
  margin-bottom:2rem;
  grid-template-columns:1fr;
  @media (min-width:680px){
    grid-template-columns:1fr 1fr;
    gap:1rem;
  }
  @media (min-width:786px){
    grid-template-columns:1fr 1fr 1fr;
    gap:1rem;
  }
`;

export default Home;
