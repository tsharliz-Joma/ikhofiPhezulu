import React, { Suspense } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";
import Container from "@mui/material/Container";

const SuspenseComponent = ({ children }) => {
  return (
    <Suspense
      fallback={
        <Box>
          {/* Header Skeleton */}
          <Box sx={{ height: 64, backgroundColor: "background.paper", mb: 2 }} />

          {/* Hero Section Skeleton */}
          <Box
            sx={{
              textAlign: "center",
              py: 5,
              backgroundColor: "background.paper",
            }}
          >
            <Skeleton variant="text" width={300} height={40} sx={{ mx: "auto" }} />
            <Skeleton variant="text" width={400} height={30} sx={{ mx: "auto", mt: 2 }} />
          </Box>

          {/* Categories Skeleton */}
          <Container sx={{ py: 4 }}>
            <Grid container spacing={4}>
              {[...Array(8)].map((_, index) => (
                <Grid item key={index} xs={12} sm={6} md={3}>
                  <Card
                    sx={{
                      backgroundColor: "background.paper",
                      borderRadius: "12px",
                      boxShadow: 3,
                    }}
                  >
                    <Skeleton variant="rectangular" height={160} />
                    <CardContent>
                      <Skeleton variant="text" width="80%" height={20} />
                      <Skeleton variant="text" width="60%" height={15} sx={{ mt: 1 }} />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>

          {/* Footer Skeleton */}
          <Box
            sx={{
              py: 3,
              backgroundColor: "background.paper",
              textAlign: "center",
              borderTop: "0.5px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <Skeleton variant="text" width={200} height={15} sx={{ mx: "auto" }} />
          </Box>
        </Box>
      }
    >
      {children}
    </Suspense>
  );
};

export default SuspenseComponent;
