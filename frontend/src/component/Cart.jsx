import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  Button,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Box,
  Link,
} from "@mui/material";
import "../css/Loader.css";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  incrementItemQuantity,
  decrementItemQuantity,
} from "../slice/cartSlice";
import Header from "./Header";
import Footer from "./Footer";
import Spinner from "react-bootstrap/Spinner";
import {  ORDER_LIST } from "../service/service";

const Cart = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.auth.isLogin);
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("cartItems carttttttttttttttt", cartItems);
        await ORDER_LIST(cartItems.map(item => ({
          title: item.title,
          id: item.id,
          price: item.price,
        })));      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const handleRemoveItem = (_id) => {
    dispatch(removeFromCart(_id));
  };

  const handleIncrement = (_id) => {  
    dispatch(incrementItemQuantity(_id));
  };

  const handleDecrement = (_id) => {
    dispatch(decrementItemQuantity(_id));
  };

  const totalPrice = cartItems
    ? cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
    : 0;

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
      <Container maxWidth="xl" sx={{ pt: 2, minHeight: "100vh" }}>
        {user ? (
          <>
            <Typography variant="h4" component="h1" gutterBottom>
              Shopping Cart
            </Typography>
            <Grid container spacing={4}>
              {cartItems && cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <Grid item xs={12} md={6} lg={4} key={item._id}>
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="140"
                        image={item.images}
                        alt={item.title}
                        sx={{ objectFit: "cover" }}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="div">
                          {item.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.description}
                        </Typography>
                        <Typography variant="h6" component="div">
                          ₹{item.price}
                        </Typography>
                        <Typography variant="body2" component="div">
                          Quantity: {item.quantity}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <IconButton
                          color="secondary"
                          onClick={() => handleDecrement(item._id)}
                        >
                          <RemoveIcon />
                        </IconButton>
                        <IconButton
                          color="secondary"
                          onClick={() => handleIncrement(item._id)}
                        >
                          <AddIcon />
                        </IconButton>
                        <IconButton
                          color="secondary"
                          onClick={() => handleRemoveItem(item._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </CardActions>
                    </Card>
                  </Grid>
                ))
              ) : (
                <Typography variant="h6" sx={{ mt: 5, ml: 5 }}>
                  No items available
                </Typography>
              )}
            </Grid>
            {cartItems && cartItems.length > 0 && (
              <Box sx={{ mt: 4, textAlign: "center" }}>
                <Typography variant="h5" component="div" gutterBottom>
                  Total Price: ₹{totalPrice}
                </Typography>
                <NavLink
                  as={Link}
                  to={`/buynow/${totalPrice}`}
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: "purple",
                      color: "white",
                      margin: "20px",
                    }}
                  >
                    Buy Now
                  </Button>
                </NavLink>
              </Box>
            )}
          </>
        ) : (
          <Container>
            <NavLink as={Link} to="/login">
              <Button
                className="btn"
                style={{ backgroundColor: "purple", color: "white" }}
              >
                Login Required
              </Button>
            </NavLink>
          </Container>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default Cart;
