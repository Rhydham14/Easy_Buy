import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import video from "../images/OrderPlaced.mp4";

const PaymentSuccess = () => {
  const videoRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 3.0; // Adjust the playback rate as needed
    }

    const timer = setTimeout(() => {
      navigate("/");
    }, 3000); // 3 seconds

    // Cleanup the timeout if the component is unmounted before the time is up
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Typography variant="h4" gutterBottom style={{ color: "purple" }}>
        Payment Successful!
      </Typography>
      <Box
        component="video"
        ref={videoRef}
        src={video}
        autoPlay
        loop
        muted
        style={{ height: "500px", width: "auto" }}
      />
      <Typography variant="body1" gutterBottom>
        Thank you for your purchase. Your payment has been processed
        successfully.
      </Typography>
      <Button
        component={Link}
        to="/"
        variant="contained"
        style={{ backgroundColor: "purple", color: "white" }}
      >
        Back to Home
      </Button>
    </Box>
  );
};

export default PaymentSuccess;
