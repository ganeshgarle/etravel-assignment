import { useEffect, useMemo, useState } from "react";
import "./SerisePage.css";
import { Container, Row, Col } from "react-bootstrap";
import SearchBar from "../components/SearchBar";
import { useToGetSeriesList } from "../utils";
import ListGroup from "react-bootstrap/ListGroup";
import Loader from "../components/Loader";
import SelectBox from "../components/SelectBox";

function SerisePage() {
  const { data, loading, error } = useToGetSeriesList(
    "https://swapi.dev/api/films/?format=json"
  );
  const [seriesList, setSeriseList] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [searchText, setSearchText] = useState("");
  const [currentEpisodeData, setCurrentEpisodeData] = useState({});

  // Example of handling the search
  const handleSearch = (searchTerm) => {
    setSearchText(searchTerm.trim());
  };
  const handleEpisode = (item) => {
    setCurrentEpisodeData(item);
  };

  useEffect(() => {
    if (!loading && data?.results?.length) {
      setSeriseList(data?.results);
    }
  }, [data, loading]);
  const onSelectCallback = (item) => {
    setSortOption(item);
  };

  const seriesMemoizeOption = useMemo(() => {
    if (sortOption?.length) {
      if (sortOption === "Episode") {
        return seriesList.sort((a, b) => a.episode_id - b.episode_id);
      } else if (sortOption === "Year") {
        return seriesList.sort(
          (a, b) => a.release_date.split("-")[0] - b.release_date.split("-")[0]
        );
      }
    } else {
      return seriesList;
    }
  }, [sortOption, seriesList]);

  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Container>
        <Row className="search_container">
          <Col className="col-1">
            <SelectBox
              option={["Year", "Episode"]}
              onSelectCallback={onSelectCallback}
            />
          </Col>
          <Col className="col-11">
            <SearchBar onSearch={handleSearch} />
          </Col>
        </Row>
        <Row>
          <Col className="col-6">
            <ListGroup>
              {seriesMemoizeOption
                ?.filter((item) =>
                  item.title.toLowerCase().includes(searchText.toLowerCase())
                )
                .map((item) => {
                  return (
                    <ListGroup.Item
                      key={item?.title}
                      className={`d-flex justify-content-between align-items-center ${
                        currentEpisodeData?.episode_id === item?.episode_id
                          ? "active"
                          : ""
                      }`}
                      onClick={() => handleEpisode(item)}
                    >
                      <h5>EPISODE {item?.episode_id}</h5>
                      <h5>{item?.title} </h5>
                      <h5>{item?.release_date}</h5>
                    </ListGroup.Item>
                  );
                })}
            </ListGroup>
          </Col>
          <Col className="col-6 episode_details">
            {currentEpisodeData && !!Object.keys(currentEpisodeData).length ? (
              <div className="d-flex flex-column align-items-baseline">
                <div className="d-flex">
                  <h4 className="mr-3">
                    EPISODE {currentEpisodeData?.episode_id}
                  </h4>
                  -<h4 className="ml-2">{currentEpisodeData?.title} </h4>
                </div>
                <div className="d-flex flex-column align-items-baseline">
                  <p>{currentEpisodeData.opening_crawl}</p>
                  <span>
                    <label>Directed By</label>: {currentEpisodeData.director}
                  </span>
                </div>
              </div>
            ) : (
              <div className="d-flex flex-column align-items-baseline">
                Selected movie information will be display here.
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default SerisePage;
