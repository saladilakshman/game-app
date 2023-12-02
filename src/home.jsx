import { useState, useEffect, useContext } from "react";
import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import axios from "axios";
import CardLayout from "./skeleton";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import MenuIcon from "@mui/icons-material/Menu";
import { API_KEY } from "./key";
import {
  Typography,
  AppBar,
  Switch,
  Toolbar,
  IconButton,
  Stack,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  useTheme,
  useMediaQuery,
  Drawer,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  Button,
} from "@mui/material";
import { genres } from "./Genres";
import { FaXbox } from "react-icons/fa";
import { IoIosDesktop } from "react-icons/io";
import { FcLinux } from "react-icons/fc";
import { FcAndroidOs } from "react-icons/fc";
import { FaFirefoxBrowser } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { FaPlaystation } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Appcontext } from "./App";
function Home() {
  const { state, dispatch } = useContext(Appcontext);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [genre, setGenre] = useState("action");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [genreheader, setGenreheader] = useState("Action");
  const [genredata, setGenredata] = useState([]);
  const [page, setPage] = useState(1);
  const [copy, setCopy] = useState([]);
  const[showbtn,setShowbtn]=useState(false);
  const mobilelayout = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  };
  useEffect(() => {
    axios
      .get(
        `https://api.rawg.io/api/games?key=${API_KEY}&genres=${genre}&page=${page}`
      )
      .then((res) => {
        setGenredata([...genredata,...res.data.results]);
        setCopy(res.data.results);
        setLoading(false);
        setShowbtn(true)
      })
      .catch((err) => console.log(err));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genre,page]);
  const os_types = [
    { name: "android", Icon: <FcAndroidOs /> },
    { name: "linux", Icon: <FcLinux /> },
    { name: "web", Icon: <FaFirefoxBrowser /> },
    { name: "macos", Icon: <FaApple /> },
    { name: "playstation", Icon: <FaPlaystation /> },
    { name: "xbox", Icon: <FaXbox /> },
    { name: "pc", Icon: <IoIosDesktop /> },
  ];
  return (
    <>
      <AppBar
        sx={
          mobile
            ? { ...mobilelayout, boxShadow: 0 }
            : {
                display: "grid",
                placeItems: "center",
              }
        }
        color="info"
      >
        {mobile && (
          <IconButton
            color="inherit"
            onClick={() => dispatch({ type: "drawer-show" })}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Toolbar>
          <input
            type="search"
            onChange={(e) => {
              setGenredata(
                copy.filter((item) => item.name.includes(e.target.value))
              );
            }}
            placeholder="search games.."
            style={{
              marginInlineStart: mobile ? "0" : "1rem",
              width: mobile ? "100%" : "40rem",
              boxShadow: theme.shadows[4],
              height: mobile ? "2.1rem" : "2.8rem",
              outline: "none",
              border: "0",
              borderRadius: "2rem",
              display: "block",
              margin: "auto",
            }}
          />
          <Stack direction="row" justifyContent="center" alignItems="center">
            <Switch
              color="primary"
              checked={state.ischecked}
              onChange={() => dispatch({ type: "dark-mode-switch" })}
            />
            <BedtimeIcon color="inherit" />
          </Stack>
        </Toolbar>
      </AppBar>
      <Box sx={{ display: "flex" }}>
        <Drawer
          open={state.isopen}
          onClose={() => dispatch({ type: "drawer-show" })}
          variant={mobile ? "temporary" : "permanent"}
          sx={{
            flexShrink: 0,
            width: 220,
          }}
        >
          {genres.map((genre, index) => {
            const { id, name, image_background } = genre;
            return (
              <ListItem key={id} sx={{ width: mobile ? "100%" : 200 }}>
                <ListItemButton
                  selected={index === selectedIndex}
                  onClick={(e) => {
                    setGenre(e.target.textContent.toLowerCase());
                    setGenreheader(e.target.textContent);
                    setLoading(true);
                    setSelectedIndex(index);
                    dispatch({ type: "drawer-show" });
                  }}
                >
                  <ListItemAvatar>
                    <Avatar src={image_background} loading="lazy" />
                  </ListItemAvatar>
                  <ListItemText>
                    <Typography variant="body1">{name}</Typography>
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            );
          })}
        </Drawer>
        <Box
          component="div"
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            overflow: "hidden",
          }}
        ></Box>
      </Box>
      <Box
        sx={{
          marginInlineStart: mobile ? "" : 28,
          marginBlockStart: mobile ? 10 : 12,
        }}
      >
        <Typography
          variant={mobile ? "h6" : "h5"}
          sx={{ paddingInlineStart: 3 }}
        >
          {genreheader} games
        </Typography>
        <Grid
          container
          spacing={mobile ? 2 : 1}
          sx={{
            padding: 1,
          }}
        >

          {genredata?.map((gamedetails, index) => {
            const { id, name, background_image, rating, platforms } =
              gamedetails;
            const selectedPlatforms = os_types.filter((os) => {
              return platforms?.some((platform) => {
                return os.name.includes(platform.platform.slug);
              });
            })
            return loading ? (
              <Grid item xs={6} sm={6} lg={3} key={index}>
                <CardLayout
                  coordinates={{
                    width: mobile ? "100%" : 300,
                    height: mobile ? "100%" : 240,
                  }}
                />
              </Grid>
            ) : (
              <Grid item key={index} xs={6} sm={6} lg={3}>
                <CardActionArea component={Link} to={`/${id}`} key={index}>
                  <Card
                    sx={{
                      width: mobile ? "100%" : 300,
                      height: mobile ? 285 : 240,
                      "&:hover": {
                        boxShadow:state.ischecked?'':4,
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="145"
                      image={background_image}
                      alt=""
                      sx={{
                        objectFit: "fill",
                      }}
                    />
                    <CardContent
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: mobile ? 0.5 : "",
                      }}
                    >
                      <Typography
                        variant={mobile ? "body1" : "h6"}
                        id="game-name"
                        title={name}
                        textAlign="start"
                        sx={{
                          marginLeft: mobile ? -1 : "",
                        }}
                      >
                        {name}
                      </Typography>
                      <Box
                        sx={{
                          backgroundColor: "#35D472",
                          color: "white",
                          padding: 0.3,
                          borderRadius: 1,
                          fontSize: 12,
                        }}
                        title="rating"
                      >
                        {rating}
                      </Box>
                    </CardContent>
                    <Stack
                      direction={mobile ? "column" : "row"}
                      justifyContent="start"
                      alignItems="center"
                      spacing={0.4}
                      sx={{
                        paddingInlineStart: 1,
                      }}
                    >
                      <Typography variant="body1">Available on:</Typography>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "start",
                          alignItems: "center",
                          gap: 0.5,
                        }}
                      >
                        {selectedPlatforms.map((selectedPlatform, index) => {
                          return (
                            <Box key={index} sx={{ fontSize: 25 }}>
                              {selectedPlatform.Icon}
                            </Box>
                          );
                        })}
                      </Box>
                    </Stack>
                  </Card>
                </CardActionArea>
              </Grid>
            );
                      })}
        </Grid>
        { showbtn&&
        <Button
          variant="contained"
          color="primary"
          size={mobile?'small':'medium'}
          sx={{
            display: "block",
            margin:mobile?"auto":'',
            marginLeft:mobile?'':'40%',
            marginBlockStart:3,
            marginBlockEnd:2
          }}
          onClick={() => {
            setLoading(true);
            setPage((page) => page + 1);
          }}
        >
          Load more
        </Button>
}
      </Box>
    </>
  );
}
export default Home;
