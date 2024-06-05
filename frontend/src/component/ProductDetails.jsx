import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
} from "@mui/material";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import {FETCH_PRODUCT_DETAILS} from "../service/service";
import axiosInstance from "../axios/instance";
import { useSelector, useDispatch } from "react-redux";
import { addCart } from "../slice/cartSlice";
import Header from "./Header";
import Footer from "./Footer";

import "../css/ProductDetails.css";

const ProductDetails = () => {
  const { _id } = useParams();
  const [details, setDetails] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productDetails = await FETCH_PRODUCT_DETAILS(_id); // Call the service function and wait for the response
        setDetails(productDetails);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchData();

    // Cleanup function (optional)
    return () => {
      // Any cleanup logic if needed
    };
  }, [_id]);


  const handleCart = (details)=>{
    const {_id, title, price, images} = details;
    dispatch(addCart({_id, title, price,images}));
  }

  return (
    <>
      <Header />
      <Container className="pt-5 h-25" maxWidth="xl" sx={{ pt: 2, minHeight: "100vh" }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6} className="text-center" >
            {details && (
              <>
                <Box
                  component="img"
                  src={details.images}
                  alt={details.title}
                  sx={{ width: "60%", maxWidth: "100%", height: "auto" }}
                />
                <Box>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<LocalMallIcon />}
                    sx={{ m: 1 }}
                    id="buyBtn"
                  >
                    Buy now
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<ShoppingCartCheckoutIcon />}
                    sx={{ m: 1 }}
                    id="cartBtn"
                    onClick={()=>handleCart(details)}
                  >
                    Add to cart
                  </Button>
                </Box>
              </>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            {details && (
              <>
                <Typography variant="h4" component="h2" gutterBottom>
                  {details.title}
                </Typography>
                <Box component="hr" sx={{ mb: 2 }} />
                <Typography variant="h5" component="h5" gutterBottom>
                  Price: ₹{details.price}
                </Typography>
                <Box component="hr" sx={{ mb: 2 }} />
                <Typography variant="body1">
                  <strong>Details:</strong>
                  <br />
                  {details.description}
                </Typography>
              </>
            )}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default ProductDetails;
