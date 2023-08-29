
import {
    FormatListBulleted,
    TravelExplore,
} from '@mui/icons-material';
import {
    Button, Divider, List,
    ListItem, ListItemText, Slide, Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { stubFalse } from 'lodash-es';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Sheet from 'react-modal-sheet';

BottomSheet.propTypes = {
    sgList: PropTypes.array.isRequired,
    isDesktop: PropTypes.bool,
    isSideOpen: PropTypes.bool,
    setSideOpen: PropTypes.func,
};

const StyledMoreButton = styled(Button)(() => ({
    borderRadius: '20px',
    backgroundColor: '#FFFFFF',
    position: 'fixed',
    bottom: '60px',
    left: '40%',
    zIndex: 9,
}));

export default function BottomSheet({ sgList, isDesktop, isSideOpen, setSideOpen, ...other }) {

    const [hoveredIndex, setHoveredIndex] = useState(-1);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [isListOpen, setIsListOpen] = useState(false);
    const [sgDetail, setSgDetail] = useState({});
    const [sgDayList, setSgDayList] = useState([]);
    const [isThroughList, setIsThroughList] = useState(false);

    // const handleDetailMoreButtonClick = () => {
    //     setIsDetailOpen(true)
    // }

    const handleOnCloseDetail = () => {
        setIsDetailOpen(false)
        if (isThroughList) {
            setIsListOpen(true)
            setIsThroughList(false);
        }
    }

    const handleListMoreButtonClick = () => {
        setIsListOpen(true)
    }

    const handleOnCloseList = () => {
        setIsListOpen(false)
    }

    const handleListRowClick = (item, index) => {
        console.log("handleListRowClick")
        const movieDetails = {}
        setSgDetail(movieDetails);
        setIsListOpen(false);
        setIsDetailOpen(true);
        setIsThroughList(true);
    }

    return (
        <>
            {!isDesktop && (
                <>
                    {/* <Slide direction="up" in={!isDetailOpen}>
                        <StyledMoreButton variant="outlined" color="primary"
                            startIcon={<FormatListBulleted />} onClick={handleDetailMoreButtonClick}
                            sx={{
                            }}>
                            상세보기
                        </StyledMoreButton>
                    </Slide> */}

                    <Slide direction="up" in={!isListOpen}>
                        <StyledMoreButton variant="outlined" color="primary"
                            startIcon={<FormatListBulleted />} onClick={handleListMoreButtonClick}
                            sx={{
                            }}>
                            목록보기
                        </StyledMoreButton>
                    </Slide>

                    <Sheet isOpen={isDetailOpen} onClose={() => handleOnCloseDetail()} detent="content-height">
                        <Sheet.Container>
                            <Sheet.Header />
                            <Sheet.Content>
                                This is Detail Sheet
                            </Sheet.Content>
                        </Sheet.Container>
                        <Sheet.Backdrop overlay={false} />
                    </Sheet>

                    <Sheet isOpen={isListOpen} onClose={() => handleOnCloseList()} detent="content-height">
                        <Sheet.Container>
                            <Sheet.Header />
                            <Sheet.Content>
                                {sgList.length === 0 && isSideOpen ? (
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            height: '100%',
                                            marginTop: '20%',
                                            marginBottom: '20%',
                                        }}
                                    >
                                        <TravelExplore fontSize="large" sx={{ marginRight: '8px', color: 'gray' }} />
                                        <Typography variant="body2" sx={{ fontWeight: 'bold', textAlign: 'right', color: 'gray' }}>
                                            해당 지역에 무대인사가<br />존재하지 않습니다.
                                        </Typography>
                                    </div>
                                ) : (
                                    <List sx={{ width: '100%', bgcolor: 'background.paper', overflow: 'auto' }}>
                                        {sgList.map((item, index) => (
                                            <>
                                                {/* <div key={index} onClick={() => handleRowClick(item)} > */}
                                                <ListItem alignItems="flex-start"
                                                    onClick={() => handleListRowClick(item, index)}
                                                    onMouseOver={() => setHoveredIndex(index)}
                                                    onMouseOut={() => setHoveredIndex(-1)}
                                                    style={{
                                                        cursor: 'pointer',
                                                        backgroundColor: hoveredIndex === index ? 'whitesmoke' : 'transparent', // 마우스 오버 시 배경색 변경
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
                                )}
                            </Sheet.Content>
                        </Sheet.Container>
                        <Sheet.Backdrop overlay={false} />
                    </Sheet>
                </>
            )}
        </>
    )
}