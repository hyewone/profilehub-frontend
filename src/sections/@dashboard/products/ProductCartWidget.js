import { set, sub } from 'date-fns';
import { noCase } from 'change-case';
import { faker } from '@faker-js/faker';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// import WebSocketClient from 'websocket';
// import WebSocket, { WebSocketServer } from "ws";
// import StompJs from 'stompjs';
// import WebSocket from 'ws';
// @mui
import { styled } from '@mui/material/styles';
import {
  Box,
  List,
  Badge,
  Button,
  Avatar,
  Tooltip,
  Divider,
  Popover,
  Typography,
  IconButton,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton,
  InputBase,
  Paper,
  ListItem,
  Chip,
} from '@mui/material';
import { ArrowBack, Close, Send } from '@mui/icons-material';
import axios from 'axios';
// component
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import { getTokenToSessionStorage } from '../../../reducer/loginComm';


// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  zIndex: 999,
  right: 0,
  display: 'flex',
  cursor: 'pointer',
  position: 'fixed',
  alignItems: 'center',
  top: theme.spacing(16),
  height: theme.spacing(5),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1.25),
  boxShadow: theme.customShadows.z20,
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  borderTopLeftRadius: Number(theme.shape.borderRadius) * 2,
  borderBottomLeftRadius: Number(theme.shape.borderRadius) * 2,
  transition: theme.transitions.create('opacity'),
  '&:hover': { opacity: 0.72 },
}));

// ----------------------------------------------------------------------

const NOTIFICATIONS = [
  {
    id: faker.datatype.uuid(),
    title: 'Your order is placed',
    description: 'waiting for shipping',
    avatar: null,
    type: 'order_placed',
    createdAt: set(new Date(), { hours: 10, minutes: 30 }),
    isUnRead: true,
  },
  {
    id: faker.datatype.uuid(),
    title: faker.name.fullName(),
    description: 'answered to your comment on the Minimal',
    avatar: '/assets/images/avatars/avatar_2.jpg',
    type: 'friend_interactive',
    createdAt: sub(new Date(), { hours: 3, minutes: 30 }),
    isUnRead: true,
  },
  {
    id: faker.datatype.uuid(),
    title: 'You have new message',
    description: '5 unread messages',
    avatar: null,
    type: 'chat_message',
    createdAt: sub(new Date(), { days: 1, hours: 3, minutes: 30 }),
    isUnRead: false,
  },
  {
    id: faker.datatype.uuid(),
    title: 'You have new mail',
    description: 'sent from Guido Padberg',
    avatar: null,
    type: 'mail',
    createdAt: sub(new Date(), { days: 2, hours: 3, minutes: 30 }),
    isUnRead: false,
  },
  {
    id: faker.datatype.uuid(),
    title: 'Delivery processing',
    description: 'Your order is being shipped',
    avatar: null,
    type: 'order_shipped',
    createdAt: sub(new Date(), { days: 3, hours: 3, minutes: 30 }),
    isUnRead: false,
  },
];



export default function CartWidget({ openChatRoom, setIsChatRoomOpen, openChat, setIsChatOpen, chatRoomInfo, setChatRoomInfo }) {

  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [chatRooms, setChatRooms] = useState([]);
  const [chats, setChats] = useState([]);
  const [roomEs, setRoomEs] = useState(null);
  const [chatEs, setChatEs] = useState(null);
  const [chatInputVal, setChatInputVal] = useState("");
  const { isLogin, userInfo } = useSelector((state) => state);


  useEffect(() => {
  }, []);

  useEffect(() => {
    if (openChatRoom) {
      getChatRoom();
    } else if (!openChatRoom && roomEs) {
      setChatRooms([]);
      roomEs.close();
    } else if (!openChatRoom) {
      setChatRooms([]);
    }
  }, [openChatRoom]);

  useEffect(() => {
    if (!openChat && chatEs) {
      setChatRoomInfo({});
      setChats([]);
      chatEs.close();
    }
  }, [openChat]);

  useEffect(() => {
    if (chatRoomInfo.id) {
      getChat();
    }
  }, [chatRoomInfo]);

  const getChatRoom = () => {
    console.log("getChatRoom")
    const token = getTokenToSessionStorage();
    const eventSource = new EventSource(`http://localhost:7003/v1/chat/rooms?token=${token}`,
      {
        withCredentials: true
      }
    );

    eventSource.onconnect = (event) => {
      console.log("onconnect")
      setRoomEs(eventSource);
    }

    eventSource.onmessage = (event) => {
      console.log("onmessage")
      const eventData = JSON.parse(event.data); // 데이터 파싱
      console.log(eventData)
      setChatRooms((prevChatRooms) => [...prevChatRooms, eventData]);
    };

    eventSource.onerror = (error) => {
      console.log("error")
      console.error('EventSource failed:', error);
      eventSource.close();
      setChatRooms([]);
    };
  };

  const getChat = () => {
    const token = getTokenToSessionStorage();
    const eventSource = new EventSource(`http://localhost:7003/v1/chat/message/${chatRoomInfo.id}?token=${token}`,
      {
        withCredentials: true
      }
    );

    eventSource.onconnect = (event) => {
      setChatEs(eventSource);
    }

    eventSource.onmessage = (event) => {
      const eventData = JSON.parse(event.data); // 데이터 파싱
      console.log(eventData)
      setChats((prevChats) => [...prevChats, eventData]);
    };

    eventSource.onerror = (error) => {
      console.error('EventSource failed:', error);
      eventSource.close();
      setChats([]);
    };
  };

  const openModal = () => {
    setIsChatRoomOpen(true);
  };

  const closeModal = () => {
    setIsChatRoomOpen(false);
  };

  const openChatModal = () => {
    setIsChatOpen(true);
  };

  const closeChatModal = () => {
    setIsChatOpen(false);
  };

  const onClickCloseButton = () => {
    setIsChatRoomOpen(false);
    setIsChatOpen(false);
  }
  const onClickChatBackButton = () => {
    setIsChatRoomOpen(true);
    setIsChatOpen(false);
  }

  const handleListRowClick = (item, index) => {
    setChatRoomInfo(item);
    setChats([]);
    setIsChatOpen(true);
    setIsChatRoomOpen(false);
  }

  const sendChat = async () => {

    const receiverId = chatRoomInfo.attendeeIdList
      .filter(memberId => memberId !== String(userInfo.memberId))
      .join(', ');
    const token = getTokenToSessionStorage();
    const chatData = {
      chatRoomId: chatRoomInfo.id,
      senderId: userInfo.memberId,
      receiverId,
      message: chatInputVal,
    }
    setChatInputVal("");

    const response = await axios.post(`http://localhost:7003/v1/chat/message?token=${token}`, chatData);
    console.log('채팅 전송', response.data);
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendChat();
    }
  };

  return (
    <>
      <Box>
        <StyledRoot onClick={openModal} >
          {/* <Badge color="error" max={99}> showZero badgeContent={0} */}
            <Iconify icon="eva:message-square-outline" width={24} height={24} />
          {/* </Badge> */}
        </StyledRoot>

        <Popover
          open={Boolean(openChatRoom)}
          anchorEl={openChatRoom}
          onClose={closeModal}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          PaperProps={{
            sx: {
              mt: 1.5,
              ml: 0.75,
              width: 360,
            },
          }}
        >

          <Box sx={{ display: 'flex', alignItems: 'center', py: 1, px: 2.5 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle1">채팅 목록</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {/* You have {totalUnRead} unread messages */}
              </Typography>
            </Box>
            <IconButton onClick={onClickCloseButton}>
              <Close />
            </IconButton>
          </Box>

          <Divider sx={{ borderStyle: 'dashed' }} />

          <Scrollbar sx={{ height: { xs: 340, sm: 700 } }}>
            <List sx={{ width: '100%', bgcolor: 'background.paper', overflow: 'auto' }}>
              {chatRooms.slice().reverse().map((item, index) => (
                <>
                  <ListItem alignItems="flex-start"
                    onClick={() => handleListRowClick(item, index)}
                    onMouseOver={() => setHoveredIndex(index)}
                    onMouseOut={() => setHoveredIndex(-1)}
                    style={{
                      cursor: 'pointer',
                      backgroundColor: hoveredIndex === index ? 'whitesmoke' : 'transparent', // 마우스 오버 시 배경색 변경
                    }}
                  >
                    <ListItemText
                      primary={item.title}
                      secondary={
                        <>
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {item.title}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                  {index !== chatRooms.length - 1 &&
                    <Divider
                      variant="inset"
                      component="li"
                      sx={{ marginLeft: '16px', marginRight: '16px' }} // 스타일 추가
                    />
                  }
                </>
              ))}
            </List>
          </Scrollbar>
        </Popover>
        <Popover
          open={Boolean(openChat)}
          anchorEl={openChat}
          onClose={closeChatModal}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          PaperProps={{
            sx: {
              mt: 1.5,
              ml: 0.75,
              width: 360,
            },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', py: 1, px: 2.5 }}>
            <IconButton onClick={onClickChatBackButton} sx={{ marginRight: 1 }}>
              <ArrowBack />
            </IconButton>
            <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
              <Typography variant="subtitle1">{chatRoomInfo.title}</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {/* You have {totalUnRead} unread messages */}
              </Typography>
            </Box>
            <IconButton onClick={onClickCloseButton}>
              <Close />
            </IconButton>
          </Box>

          <Divider sx={{ borderStyle: 'dashed' }} />

          <Scrollbar sx={{ height: { xs: 340, sm: 400 } }}>
            <List sx={{ width: '100%', bgcolor: 'background.paper', overflow: 'auto' }}>
              {chats.map((item, index) => (
                <>
                  <ListItem key={index}>
                    <ListItemText
                      primary=""
                      style={{ display: 'flex', justifyContent: parseInt(item.senderId, 10) === userInfo.memberId ? 'flex-end' : 'flex-start' }}
                      secondary={
                        <>
                          <Chip color={parseInt(item.senderId, 10) === userInfo.memberId ? "primary" : "default"} label={item.message} />
                        </>
                      }
                    />
                  </ListItem>
                </>
              ))}
            </List>
          </Scrollbar>

          <Divider sx={{ borderStyle: 'dashed' }} />

          <Box sx={{ display: 'flex', alignItems: 'center', py: 1, px: 2.5 }}>
            <InputBase
              fullWidth
              placeholder="메시지 입력..."
              inputProps={{ 'aria-label': '메시지 입력' }}
              value={chatInputVal}
              onChange={(e) => setChatInputVal(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <IconButton
              type="submit"
              sx={{ p: '10px' }}
              aria-label="send"
              onClick={sendChat}
            >
              <Send />
            </IconButton>
          </Box>
        </Popover>
      </Box>
    </>
  );
}

function NotificationItem({ chatRoom }) {
  // const { avatar, title } = renderContent(notification);

  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        // ...(notification.isUnRead && {
        //   bgcolor: 'action.selected',
        // }),
      }}
    >
      {/* <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
      </ListItemAvatar> */}
      <ListItemText
        // primary={title}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: 'flex',
              alignItems: 'center',
              color: 'text.disabled',
            }}
          >
            <Iconify icon="eva:clock-outline" sx={{ mr: 0.5, width: 16, height: 16 }} />
            {/* {fToNow(notification.createdAt)} */}
          </Typography>
        }
      />
    </ListItemButton>
  );
}
