import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import styled from "styled-components";

const Video = styled(Box)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const HeroMedia = ({ src, mediaType = "video" }) => {
  return (
    <Container
      sx={{
        height: "50vh",
        width: "100vw",
        padding: "0px!important",
      }}
    >
      <Box sx={{ width: "auto", height: "100%", overflow: "hidden" }}>
        <Video component="video" src={src} autoPlay loop controls playsInline />
      </Box>
    </Container>
  );
};

export default HeroMedia;
