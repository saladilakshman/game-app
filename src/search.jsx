import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Appcontext } from "./App";
import debounce from "debounce";
import { API_KEY } from "./key";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import empty from "./assets/empty.jpg";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  Stack,
  Divider,
  TextField,
  Typography,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  InputAdornment,
  Rating,
} from "@mui/material";
const Searchbar = () => {
  const { state, dispatch } = useContext(Appcontext);
  const [searchquery, setSearchquery] = useState("");
  const [queryresults, setQueryresults] = useState([]);
  const [queryerror, setQueryerror] = useState(false);
  const navigate = useNavigate();
  useEffect(
    () =>
      debounce(() => {
        axios
          .get(
            `https://api.rawg.io/api/games?key=${API_KEY}&search_precise&search=${searchquery}`
          )
          .then((res) => {
            if (res.data.results == []) {
              setQueryerror(true);
            } else {
              setQueryresults(res.data.results);
            }
          })
          .catch((err) => console.log(err.message));
      }, 200),
    [searchquery]
  );
  return (
    <>
      <Dialog fullScreen open={state.isSearchbarOpen}>
        <DialogContent>
          <TextField
            variant="outlined"
            fullWidth
            type="search"
            size="small"
            placeholder="Search"
            InputProps={{
              startAdornment: (
                <InputAdornment
                  position="start"
                  onClick={() => {
                    dispatch({ type: "open-search-bar" });
                  }}
                >
                  <ArrowBackIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              flex: 1,
              boxShadow: 4,
              outline: "none",
              border: "none",
            }}
            onChange={(e) => setSearchquery(e.target.value)}
          />
          <Divider
            sx={{
              mt: 1,
              width: "100%",
            }}
          />
          {queryresults.map((queryresult, index) => {
            const { id, name, background_image, rating } = queryresult;
            return (
              <ListItem
                onClick={() =>
                  document.startViewTransition(() => navigate(`/${id}`))
                }
                key={index}
                secondaryAction={
                  <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={0.8}
                  >
                    <Typography variant="body2">{rating}</Typography>
                    <Rating readOnly max={1} size="small" value={rating} />
                  </Stack>
                }
                sx={{
                  paddingInline: 1,
                }}
              >
                <ListItemAvatar>
                  <LazyLoadImage
                    src={background_image}
                    alt=""
                    height={42}
                    width={42}
                    style={{
                      borderRadius: "1.8rem",
                      objectFit: "cover",
                    }}
                  />
                </ListItemAvatar>
                <ListItemText>
                  <Typography variant="body1">{name}</Typography>
                </ListItemText>
                <Divider />
              </ListItem>
            );
          })}
          {queryerror && (
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <LazyLoadImage src={empty} height="200px" width="200px" alt="" />
              <Typography variant="body2">No results found</Typography>
            </Stack>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
export default Searchbar;
