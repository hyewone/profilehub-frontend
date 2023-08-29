import {
    Skeleton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
// kakao map
import { Map, MapMarker } from "react-kakao-maps-sdk";


// ----------------------------------------------------------------------

KakaoMap.propTypes = {
    mapWidth: PropTypes.string,
};

const StyledMap = styled(Map)(({ mapWidth }) => ({
    width: mapWidth,
    height: "500px",
}));

export default function KakaoMap({ mapWidth }) {

    const defaultLocation = { lat: 37.555008, lng: 126.971672 }
    const [isLoading, setIsLoading] = useState(true);
    const [userLocation, setUserLocation] = useState(defaultLocation);
    const [location, setLocation] = useState(userLocation);
    const KAKAO_API_KEY = process.env.REACT_APP_OAUTH_CLIENT_ID_KAKAO
  

    const getUserLocation = () => {
        console.log('getUserLocation')
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ lat: latitude, lng: longitude });
                    setLocation({ lat: latitude, lng: longitude });
                },
                (error) => {
                    console.error('Error getting user location:', error);
                    setUserLocation(defaultLocation);
                    setLocation(defaultLocation);
                }
            );
        } else {
            console.error('Geolocation not available');
            // 위치 정보를 지원하지 않는 브라우저의 경우 기본 위치를 설정
            setUserLocation(defaultLocation);
            setLocation(defaultLocation);
        }
    };

//     // 주소를 이용하여 위도와 경도를 가져오는 함수
//     async function getLatLngFromAddress(address) {
//     const apiUrl = `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(
//       address
//     )}`;
    
//     try {
//       const response = await fetch(apiUrl, {
//         headers: {
//           Authorization: `KakaoAK ${KAKAO_API_KEY}`,
//         },
//       });
//       const data = await response.json();
      
//       // 첫 번째 결과의 위도와 경도를 반환합니다.
//       if (data.documents.length > 0) {
//         const { x: lng, y: lat } = data.documents[0].address;
//         return { lat, lng };
//       } 
//     //   else {
//     //     throw new Error('Address not found');
//     //   }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       return null;
//     }
//   }

    useEffect(() => {
        getUserLocation();
        const loadingTimeout = setTimeout(() => {
            setIsLoading(false);
        }, 1500);
        return () => clearTimeout(loadingTimeout); 
    }, []);

    return (
        <>
            {
                isLoading ? (
                    <Skeleton sx={{ height: 500 }} animation="wave" variant="rectangular" />
                ) : (
                    <StyledMap center={location} mapWidth={mapWidth}>
                        <MapMarker position={location} />
                        {/* <div style={{ color: "#000" }}>Hello World!</div> */}
                    </StyledMap>
                )
            }
        </>
    );
}

