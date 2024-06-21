import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { Container, Grid, Typography, Button, Box, Link } from "@mui/material";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { FETCH_PRODUCT_DETAILS } from "../service/service";
import { useDispatch } from "react-redux";
import { addCart } from "../slice/cartSlice";
import Header from "./Header";
import Footer from "./Footer";
import Spinner from "react-bootstrap/Spinner";
import "../css/Loader.css";
import "../css/ProductDetails.css";

const ProductDetails = () => {
  const { _id } = useParams();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productDetails = await FETCH_PRODUCT_DETAILS(_id);
        setDetails(productDetails);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [_id]);

  const handleCart = (details) => {
    const { _id, title, price, images } = details;
    dispatch(addCart({ _id, title, price, images }));
  };

  if (loading) {
    return (
      <div className="loader-container">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }
  return (
    <>
      <Header />
      <Container
        className="pt-5 h-25"
        maxWidth="xl"
        sx={{ pt: 2, minHeight: "100vh" }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} md={6} className="text-center">
            {details && (
              <>
                <Box
                  component="img"
                  src={details.images}
                  alt={details.title}
                  sx={{ width: "60%", maxWidth: "100%", height: "auto" }}
                />
                <Box>
                  <NavLink
                    as={Link}
                    to={`/buynow/${details.price}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Button
                      variant="contained"
                      startIcon={<LocalMallIcon />}
                      sx={{ m: 1 }}
                      id="buyBtn"
                    >
                      Buy now
                    </Button>
                  </NavLink>
                  <Button
                    variant="contained"
                    startIcon={<ShoppingCartCheckoutIcon />}
                    sx={{ m: 1 }}
                    id="cartBtn"
                    onClick={() => handleCart(details)}
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
