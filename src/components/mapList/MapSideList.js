import {
  ChevronLeft,
  ChevronRight,
  TravelExplore
} from '@mui/icons-material';
import {
  Button, Divider, List,
  ListItem, ListItemText, Paper, Skeleton, Slide, ToggleButton, ToggleButtonGroup, Typography
} from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

MapSideList.propTypes = {
  sgList: PropTypes.array.isRequired,
  isDesktop: PropTypes.bool,
  isSideOpen: PropTypes.bool,
  setSideOpen: PropTypes.func,
};

export default function MapSideList({ sgList, isDesktop, isSideOpen, setSideOpen, ...other }) {

  console.log(sgList)
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [isDetailOpen, setDetailOpen] = useState(false);
  const [isListOpen, setListOpen] = useState(true);
  const [sgDetail, setSgDetail] = useState({});
  const [sgDayList, setSgDayList] = useState([]);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(loadingTimeout);
  }, []);


  const handleDetailMoreButtonClick = () => {
    setDetailOpen(true)
  }

  const handleListMoreButtonClick = () => {
    setListOpen(true)
  }

  const handleListRowClick = (item, index) => {
    console.log("handleListRowClick")
    // const movieDetails = {}
    // setSgDetail(movieDetails);
    // setIsListOpen(false);
    // setIsDetailOpen(true);
    // setIsThroughList(true);
  }

  return (
    <>
      {isDesktop && (
        <>
          <ToggleButtonGroup
            orientation="vertical"
            exclusive
            onChange={() => setSideOpen((prev) => !prev)}
            sx={{
              zIndex: 9, position: 'absolute', top: 'calc(50% - 35px)',
              left: isSideOpen ? 'calc(100% - (100% * 5 / 12) - 27px)' : 'calc(100% - 27px)',
              transition: 'left 0.01s ease-in-out',
              backgroundColor: '#FFFFFF',
              border: '0.7px solid rgba(0, 0, 0, 0.2)',
            }}
          >
            {isSideOpen ? (
              <ToggleButton value="right" aria-label="right aligned" sx={{ height: '70px', width: '30px' }}>
                <ChevronRight />
              </ToggleButton>
            ) : (
              <ToggleButton value="left" aria-label="left aligned" sx={{ height: '70px', width: '30px' }}>
                <ChevronLeft />
              </ToggleButton>
            )}
          </ToggleButtonGroup>
          <Slide direction="left" in={isSideOpen}>
            <Paper
              style={{
                position: 'absolute',
                top: 0,
                left: 'calc(100% - (100% * 5 / 12))',
                width: isSideOpen ? 'calc(100% * 5 / 12)' : '0',
                height: isSideOpen ? "500px" : "0px",
                zIndex: 10,
                borderLeft: '0.7px solid rgba(0, 0, 0, 0.2)',
              }}
            >

              {isLoading ? (
                <List
                  sx={{
                    width: '100%',
                    bgcolor: 'background.paper',
                    maxHeight: '500px',
                    overflow: 'auto',
                  }}
                >

                  {[...Array(5)].map((_, index) => (
                    <ListItem alignItems="flex-start">
                    <Skeleton animation="wave" />
                      </ListItem>
                  ))}
                </List>
              ) : sgList.length === 0 && isSideOpen ? (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                  }}
                >
                  <TravelExplore fontSize="large" sx={{ marginRight: '8px', color: 'gray' }} />
                  <Typography variant="body2" sx={{ fontWeight: 'bold', textAlign: 'right', color: 'gray' }}>
                    해당 범위에 무대인사가<br />존재하지 않습니다.
                  </Typography>
                </div>
              ) : (


                <List
                  sx={{
                    width: '100%',
                    bgcolor: 'background.paper',
                    maxHeight: '500px',
                    overflow: 'auto',
                  }}
                >
                  {sgList.map((item, index) => (
                    <>
                      {/* <div key={index} onClick={() => handleRowClick(item)} > */}

                      <ListItem alignItems="flex-start"
                        onClick={() => handleListRowClick(item, index)}
                        onMouseOver={() => setHoveredIndex(index)}
                        onMouseOut={() => setHoveredIndex(-1)}
                        style={{
                          cursor: 'pointer',
                          backgroundColor: hoveredIndex === index ? 'whitesmoke' : 'transparent',
                        }}>
                        {/* <ListItemAvatar>
                      <Avatar alt={item.title} src={`/static/images/avatar/${index + 1}.jpg`} />
                    </ListItemAvatar> */}
                        <ListItemText
                          primary={item.Movie.Name}
                          secondary={
                            <>
                              <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                500m | {item.Theater}
                              </Typography>
                              <br />
                              {item.ShowDate} {item.ShowTime}
                              <br />
                              {item.AttendeeName}
                            </>
                          }
                        />
                        {item.RemainingSeats > 0 &&
                          <Button variant="contained" color="primary" style={{ margin: 'auto' }}> {/* 오른쪽으로 붙이기 */}
                            예매하기
                          </Button>
                        }
                      </ListItem>
                      {/* </div> */}
                      {index !== sgList.length - 1 &&
                        <Divider
                          variant="inset"
                          component="li"
                          sx={{ marginLeft: '16px', marginRight: '16px' }} // 스타일 추가
                        />
                      }
                    </>
                  ))}
                </List>
              )
              }
            </Paper>
          </Slide>
        </>
      )}
    </>
  );
}
