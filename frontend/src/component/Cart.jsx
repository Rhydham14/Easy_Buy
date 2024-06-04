import React from "react";
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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, incrementItemQuantity, decrementItemQuantity } from "../slice/cartSlice";
import Header from "./Header";
import Footer from "./Footer";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, NavLink } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.isLogin);

  const handleRemoveItem = (_id) => {
    dispatch(removeFromCart(_id));
  };

  const handleIncrement = (_id) => {
    dispatch(incrementItemQuantity(_id));
  };

  const handleDecrement = (_id) => {
    dispatch(decrementItemQuantity(_id));
  };

  const handleBuyNow = () => {
    console.log("Buying all items in the cart", cartItems);
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

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
              {cartItems.map((item) => (
                <Grid item xs={12} md={6} lg={4} key={item._id}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="140"
                      image={item.images}
                      alt={item.title}
                    />
                    <CardContent>
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
              ))}
            </Grid>
            {cartItems.length > 0 && (
              <Box sx={{ mt: 4, textAlign: "center" }}>
                <Typography variant="h5" component="div" gutterBottom>
                  Total Price: ₹{totalPrice}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<ShoppingCartIcon />}
                  onClick={handleBuyNow}
                >
                  Buy Now
                </Button>
              </Box>
            )}
          </>
        ) : (
          <Container>
            <NavLink to="/login">
              <Button className="btn" style={{ backgroundColor: "purple", color: "white" }}>
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
