import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Styled from "styled-components";
import { NavLink } from "react-router-dom";
const Views = ({ setProgress }) => {
  const [video, setVideo] = useState({});
  const [data, setData] = useState([]);
  const { id } = useParams();
  const getData = async () => {
    let ApiReq = await fetch(
      "https://clone-1211-default-rtdb.firebaseio.com/videosData.json",
      {
        method: "GET"
      }
    );
    let ApiRes = await ApiReq.json();
    let array = [];
    for (let i in ApiRes) {
      if (i == id) {
        setVideo(ApiRes[i]);
      } else {
        let pushData = {
          data: ApiRes[i],
          id: i
        };
        console.log(pushData);
        array.push(pushData);
      }
      setData(array);
    }
  };
  useEffect(() => {
    setProgress(0);
    getData();
    setProgress(100);
  }, [id]);
  return (
    <>
      <div style={{ padding: "1rem" }}>
        <div className="container">
          <VideoWrapper>
            <div className="videoW">
              <Video controls src={video.videoURL}></Video>
              <p>{video.title}</p>
            </div>
            <div>
            {data.map((item, index) => {
              return (
                <VideoCard key={index}>
                  <NavLink to={`/view/${item.id}`}>
                    <img src={item.data.thumbURL} alt={item.data.title} />
                    <p>{item.data.title}</p>
                  </NavLink>
                </VideoCard>
              );
            })}
            </div>
          </VideoWrapper>
        </div>
      </div>
    </>
  );
};

const VideoWrapper = Styled.div`
  display:flex;
  gap:1.5rem;
  @media (max-width:780px){
     flex-direction:column!important;
   }
   .videoW{
  width:60%;
  height:auto;
  @media (max-width:768px){
   width:100%;
  }
   }
  .videoW p{
    margin-top:0.5rem;
    font-size:1.2rem;
    font-weight:bold;
  }
  }
`;

const VideoCard = Styled.div`
  width:40%;
  height:100px;
  padding:0.4rem 0.5rem;
  border-radius:8px;
  @media (max-width:768px){
    width:100%;
    height:auto;
    box-shadow:0px 0px 4px 3px rgba(0,0,0,0.2);
  }
 a{
   display:flex;
   width:100%;
   height:100%;
   gap:1rem;
   text-decoration:none;
   color:black;
   text-transform:capitalize;
   @media (max-width:768px){
     flex-direction:column;
   }
   
 }
  &:hover{
    background:rgba(0,0,0,0.2);
  }
  img{
    width:200px;
    height:100%;
    background:gray;
    border-radius:5px;
    object-fit:cover;
    @media (max-width:768px){
      width:100%;
      height:auto;
      max-height:300px;
    }
  }
  p{
    padding:0.4 0.6rem;
    @media (max-width:768px){
      padding:0.5rem 1rem;
    }
  }
`;

const Video = Styled.video`
  width:100%;
  height:auto;
  max-height:400px;
  object-fit:cover;
  border-radius:8px;
  @media (max-width:768px){
    max-height:300px;
  }
`;

export default Views;
