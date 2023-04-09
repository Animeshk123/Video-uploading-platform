import { useState, useEffect } from "react";
import { storage } from "./firebase";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  uploadString
} from "firebase/storage";
import Styled from "styled-components";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import v4 from "uuid";

const Upload = ({ setProgress }) => {
  const [video, setVideo] = useState(null);
  const [thumb, setThumb] = useState(null);
  const [title, setTitle] = useState("");
  const [videoProgress, setVideoProgress] = useState(0);
  const [thumbProgress, setThumbProgress] = useState(0);
  const navgate = useNavigate();

  const handleVideo = (e) => {
    if (e.target.files[0] == undefined) {
      setVideo(null);
      toast.error("Please choose a Video");
    } else {
      setVideo(e.target.files[0]);
      toast.success("Video Selected!!");
    }
  };

  const handleThumb = (e) => {
    if (e.target.files[0] == undefined) {
      setThumb(null);
      toast.error("Please choose a Thumbnail Image For Video");
    } else {
      setThumb(e.target.files[0]);
      toast.success("Image Selected!!");
    }
  };
  useEffect(() => {
    setProgress(100);
  }, []);
  return (
    <>
      <Wrapper>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const storageRef = ref(storage, `files/${video.name}`);
            const uploadTask = uploadBytesResumable(storageRef, video);
            toast.promise(uploadTask, {
              pending: "video is Uploading...",
              success: "video Is UPloaded..",
              error: "can't upload video.."
            });
            uploadTask.on(
              "state_changed",
              (snapshot) => {
                const progress = Math.round(
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setVideoProgress(progress);
                console.log(progress);
              },
              (error) => {
                toast.error(error);
              },
              () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  setVideo(null);
                  setVideoProgress(0);
                  let tstorageRef = ref(storage, `files/${thumb.name}`);
                  let tuploadTask = uploadBytesResumable(tstorageRef, thumb);
                  toast.promise(tuploadTask, {
                    pending: "Thumbnail Uploading...",
                    success: "thumbnail uploaded...",
                    error: "thumbnail upload error..."
                  });
                  tuploadTask.on(
                    "state_changed",
                    (snapshot) => {
                      let tprogress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                      );
                      setThumbProgress(tprogress);
                      console.log(tprogress);
                    },
                    (error) => {
                      toast.error(error);
                    },
                    () => {
                      getDownloadURL(tuploadTask.snapshot.ref).then(
                        async (downloadTh) => {
                          setThumb(null);
                          setThumbProgress(0);
                          const data = {
                            videoURL: downloadURL,
                            thumbURL: downloadTh,
                            title: title
                          };
                          let ApiReq = await fetch(
                            "https://clone-1211-default-rtdb.firebaseio.com/videosData.json",
                            {
                              method: "POST",
                              headers: {
                                "Content-Type": "application/json"
                              },
                              body: JSON.stringify(data)
                            }
                          );
                          let ApiRes = await ApiReq.json();
                          toast.success("uploaded...");
                          console.log(ApiRes);
                          setTimeout(() => {
                            navgate("/");
                          }, 6000);
                        }
                      );
                    }
                  );
                });
              }
            );
          }}
        >
          <label htmlFor="video">
            <div>
              <img src="/uploadBlack.svg" alt="upload" />
              <p>Select A video</p>
              {video && <p>{video.name}</p>}
              {videoProgress > 0 && (
                <div style={{ width: `${videoProgress}%` }}></div>
              )}
            </div>
          </label>
          <input
            id="video"
            accept="video/*"
            onChange={handleVideo}
            type="file"
            required={true}
            name="video"
          />
          <label htmlFor="thumb">
            <div>
              <img src="/uploadBlack.svg" alt="upload" />
              <p>Select A thumbnail Image</p>
              {thumb && <p>{thumb.name}</p>}
              {thumbProgress > 0 && (
                <div style={{ width: `${thumbProgress}%` }}></div>
              )}
            </div>
          </label>
          <input
            id="thumb"
            accept="image/*"
            onChange={handleThumb}
            required={true}
            type="file"
            name="thumb"
          />
          <textarea
            id="title"
            type="text"
            placeholder="Enter Video Title.."
            name="Title"
            required={true}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></textarea>

          <input className="button" type="submit" value="submit" />
        </form>
      </Wrapper>
    </>
  );
};

const Wrapper = Styled.div`
 width:100%;
 max-width:1100px;
 display:block;
 margin:0 auto;
 padding:1rem 1rem;
 form{
   max-width:480px;
   width:100%;
   margin:4rem auto;
   background-color:white;
   box-shadow:0px 0px 3px 4px rgba(0,0,0,0.2);
   padding:1.5rem 1rem;
   border-radius:5px;
   label{
     width:80%;
     min-height:140px;
     height:auto;
     border:2px dotted dodgerblue;
     display:block;
     margin:0 auto;
     border-radius:8px;
     display:flex;
     align-items:center;
     justify-content:center;
     margin-top:1rem;
     padding:1rem 0.3rem;
     div{
       width:100%;
       img{
         text-align:center;
         display:block;
         margin:0 auto;
       }
       p{
         margin:1rem 0;
         text-align:center;
       }
       div{
         height:5px;
         background:dodgerblue;
         border-radius:5px;
       }
     }
   }
   #video,#thumb{
    display:none;
   }
   #title{
     display:block;
     width:80%;
     margin:1rem auto;
     padding:0.7rem 1rem;
     border-radius:5px;
     border:2px solid dodgerblue;
     outline:none;
     font-size:1rem;
     line-height:1.5;
   }
   .button{
     display:block;
     margin:2rem auto;
     padding:0.5rem 1rem;
     cursor:pointer;
     text-transform:capitalize;
     background-color:dodgerblue;
     color:white;
     border:none;
     outline:none;
     border-radius:5px;
   }
 }
`;

export default Upload;
