import { useEffect, useState } from "react";
import Youtube from "react-youtube";
import { Container, Row } from "react-bootstrap";
import { API_KEY, imageUrl } from "../../constants/constants";
import "./RowPost.css";
import axios from "../../axios";

const RowPost = (props) => {
  const [movie, setMovie] = useState([]);
  const [urlid, setUrlId] = useState("");
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    axios.get(props.url).then((response) => {
      setMovie(response.data.results);
      setShowVideo(true);
    });
  }, []);

  useEffect(() => {
    document.body.addEventListener("click", handleDoumentClick);
    return () => {
      document.body.removeEventListener("click", handleDoumentClick);
    };
  }, []);
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      controls: 0,
      autoplay: 1,
    },
  };
  const handleMovie = (id) => {
    console.log(id);
    axios
      .get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
      .then((response) => {
        if (response.data.results.length !== 0) {
          setUrlId(response.data.results[0]);
          setShowVideo(true);
        }
      });
  };
  const handleDoumentClick = () => {
    setUrlId("");
    setShowVideo(false);
  };
  const handleVideoClick = (event) => {
    event.stopPropagation();
  };

  return (
    <Container fluid>
      <Row>
        <div className="row">
          <h2>{props.title}</h2>
          <div className="posters">
            {movie.map((obj) => (
              <div className="poster-container">
                <img
                  onClick={() => handleMovie(obj.id)}
                  className={props.isSmall ? "smallPoster" : "poster"}
                  src={`${imageUrl + obj.backdrop_path}`}
                  alt="poster"
                />
              </div>
            ))}
          </div>
          {showVideo && urlid && (
            <div onClick={handleVideoClick}>
              {" "}
              <Youtube opts={opts} videoId={urlid.key} />
            </div>
          )}
        </div>
      </Row>
    </Container>
  );
};

export default RowPost;
