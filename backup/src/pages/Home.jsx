import { BasicPage } from "../components/BasicPage";
import Home from "@mui/icons-material/Home";
import useKeypress from '../hooks/useKeyPress';
import { useNavigate } from "react-router-dom";
import { beforeAuthKeys } from "../constants/KeysConfig";

export const HomePage = () => {
  const navigate = useNavigate();
useKeypress(beforeAuthKeys.LOGIN,()=>{
  navigate('login');
})

  return <BasicPage title="Home Page" icon={<Home />} />;
};
