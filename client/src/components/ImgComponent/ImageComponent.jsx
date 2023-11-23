import React from "react";
import { Grid } from "@mui/material";

const Image = (props) => {
  const { imgSrc } = props;

  const LogoStyles = {
    position: "relative",
    top: "0px",
    maxWidth: "45%",
    height: "auto",
  };

  return (
    <Grid
      container
      // xs={12}
      // xl={12}
      sx={{
        textAlign: "center",
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}>
      <Grid item xs={12} xl={6}>
        <img style={LogoStyles} src={imgSrc} />
      </Grid>
    </Grid>
  );
};

export default Image;
