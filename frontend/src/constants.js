import AWS from "aws-sdk";

export const appColor = {
  primary: "#627BF6",
  primaryLight: "#8A9DF8",
  primaryDark: "#5974E9",
  primaryBlack: "#353535",
  primaryWhite: "#ECEDF3",
  white: "#FFFFFF",
  gray: "#666666",
  lighterGray: "#D9D9D9",
  lightGray: "#EEEEEE",
  darkGray: "#909090",
  textGray: "6F6F6F",
};

export const backend = process.env.REACT_APP_BACKEND;
// export const backend = "http://localhost:8080/";

export const frontend = process.env.REACT_APP_FRONTEND;
// export const frontend = "http://localhost:3000/";

export const awsConfig = new AWS.Config({
  accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
  region: "ca-central-1",
});

export const ticketsColors = {
  0: "#5976E1",
  1: "#4E3340",
  2: "#CF6973",
  3: "#D4D145",
  4: "#ECCC4C",
};
