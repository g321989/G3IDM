
 import dotenv from "dotenv";

 dotenv.config();
 
let  Config = {};

Config.Api_Url = process.env.REACT_APP_API_URL;
Config.Client_Rep_Id = process.env.REACT_APP_CLIENT_REPO_ID;
Config.Project_Rep_Id = process.env.REACT_APP_PROJECT_REPO_ID
Config.Meta_data_Id = process.env.REACT_APP_METADATAID
Config.Facilityid = process.env.REACT_APP_FACILITY_TYPE
export default Config;