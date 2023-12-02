import {useReducer,createContext} from "react";
import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Home from "./home";
import {HashRouter,Routes,Route} from "react-router-dom";
import GameInfo from "./gameinfo";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
export const Appcontext=createContext();
function App() {
  const AppState={
    ischecked:false,
    isopen:false,
    genre:'action',
    selectedIndex:0,
    genreheader:'Action',
    genredata:[],
    page:1
  }
  const appreducer=(state,action)=>{
    if(action.type==="dark-mode-switch"){
      return{
        ...state,
        ischecked:!state.ischecked
      }
    }
    if(action.type==="drawer-show"){
      return{
        ...state,
        isopen:!state.isopen,

      }
    }
    else{
     return state.loading
    }
   }
  const [state, dispatch] = useReducer(appreducer, AppState);
  const maketheme = createTheme({
    palette: {
      mode:state.ischecked ? "dark" : "light",
    },
  });
 
  return(
    <HashRouter>
      <Appcontext.Provider value={{state,dispatch}}>
      <ThemeProvider theme={maketheme}>
      <CssBaseline/>
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:gameinfo" element={<GameInfo />}/>
            </Routes>
            </ThemeProvider>
            </Appcontext.Provider>
    </HashRouter>
  );
}

export default App;
