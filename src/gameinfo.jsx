import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_KEY } from "./key";
import WestIcon from "@mui/icons-material/West";
import EastIcon from "@mui/icons-material/East";
import {
  Stack,
  Container,
  Typography,
  CircularProgress,
  Box,
  ImageList,
  ImageListItem,
  Dialog,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
const GameInfo = () => {
  const { gameinfo } = useParams();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [gamedetails, setGamedetails] = useState({});
  const [isload, setIsload] = useState(true);
  useEffect(() => {
    axios
      .get(
        `https://api.rawg.io/api/games/${gameinfo}?key=${API_KEY}`
      )
      .then((res) => {
        setGamedetails(res.data);
        setIsload(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [gameinfo]);
  const {
    name,
    description_raw,
    metacritic,
    parent_platforms,
    genres,
    stores,
  } = gamedetails;
  let platform_types = [];
  let genre_names = [];
  let game_images = [];
  let store_images = [];
  parent_platforms?.map((platform) => {
    return platform_types.push(platform.platform.name);
  });
  genres?.map((genre) => {
    genre_names.push(genre.name), game_images.push(genre.image_background);
  });
  stores?.map((store) => {
    store_images.push(store.store.image_background);
  });
  const backgroundImages = [...game_images, ...store_images];
  const [ishidden, setIshidden] = useState(false);
  const [index, setIndex] = useState(null);
  const [src, setSrc] = useState(backgroundImages[index]);
  return (
    <>
      <Dialog open={ishidden} onClose={() => setIshidden(false)}>
        <Box
          component="img"
          src={src}
          alt=""
          sx={{
            width: "100%",
            height: "100%",
            aspectRatio: 3 / 2,
          }}
        />
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            backgroundColor: "black",
          }}
        >
          <IconButton
            sx={{
              color: "white",
            }}
            onClick={() => {
              const newInd =
                index === 0 ? backgroundImages.length - 1 : index - 1;
              setIndex(newInd);
              setSrc(backgroundImages[newInd]);
              console.log(newInd);
            }}
          >
            <WestIcon />
          </IconButton>
          <IconButton
            sx={{
              color: "white",
            }}
            onClick={() => {
              const ind = index === backgroundImages.length - 1 ? 0 : index + 1;
              setIndex(ind);
              setSrc(backgroundImages[ind]);
            }}
          >
            <EastIcon />
          </IconButton>
        </Stack>
      </Dialog>
      <Container
        sx={{
          marginBlockStart: 4,
          marginBlockEnd: 3,
        }}
      >
        {isload ? (
          <CircularProgress
            sx={{
              position: "absolute",
              top: "50%",
              left: mobile ? "45%" : "48%",
            }}
          />
        ) : (
          <Stack
            direction="column-reverse"
            justifyContent={"center"}
            alignItems="baseline"
          >
            <Box>
              <Typography variant="h5">{name}</Typography>
              <Stack
                direction="row"
                flexWrap={true}
                justifyContent="flex-start"
                alignItems="baseline"
                spacing={mobile ? 3 : 12}
                sx={{
                  marginBlockStart: 3,
                }}
              >
                <Stack>
                  <Typography variant="body1" sx={{ color: "grey" }}>
                    Platforms
                  </Typography>
                  <Stack direction="column">
                    {platform_types.map((el, index) => {
                      return (
                        <Typography variant="body2" key={index}>
                          {el}
                        </Typography>
                      );
                    })}
                  </Stack>
                </Stack>
                <Stack>
                  <Typography variant="body1" sx={{ color: "grey" }}>
                    Metascore
                  </Typography>
                  <Box
                    sx={{
                      backgroundColor: "#1C7C54",
                      width: 28,
                      padding: 0.5,
                      borderRadius: 0.8,
                      color: "white",
                    }}
                  >
                    {metacritic}
                  </Box>
                </Stack>
                <Stack>
                  <Typography variant="body1" sx={{ color: "grey" }}>
                    Genres
                  </Typography>
                  <Stack direction="column">
                    {genre_names.map((el, index) => {
                      return (
                        <Typography variant="body2" key={index}>
                          {el}
                        </Typography>
                      );
                    })}
                  </Stack>
                </Stack>
              </Stack>
              <Typography
                variant={mobile ? "body2" : "body1"}
                textAlign="justify"
                sx={{
                  paddingBlockStart: 4,
                  //margin:mobile?0.1:""
                }}
              >
                {description_raw}
              </Typography>
            </Box>
            <ImageList variant="masonry" cols={3} rowHeight={206}>
              {Array.from(backgroundImages, (game_image, index) => {
                return (
                  <ImageListItem
                    key={index}
                    onClick={() => {
                      setIndex(index);
                      setIshidden(true);
                      setSrc(backgroundImages[index]);
                    }}
                  >
                    <img src={game_image} alt="" />
                  </ImageListItem>
                );
              })}
            </ImageList>
          </Stack>
        )}
      </Container>
    </>
  );
};
export default GameInfo;
