import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import { ORDER_DATA } from "../service/service";
import Header from "./Header";
import Footer from "./Footer";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await ORDER_DATA();
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <>
      <Header />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        padding={4}
        sx={{ backgroundColor: "rgba(182, 0, 182, 0.212)" }}
      >
        <Typography variant="h4" gutterBottom style={{ color: "purple" }}>
          Order List
        </Typography>
        <Grid container spacing={2}>
          {orders.map((order) => (
            <Grid item xs={12} sm={6} md={4} key={order._id}>
              <Card>
                <CardContent sx={{ height: 150, overflow: "hidden" }}>
                  <Typography variant="h6" noWrap>
                    {order.title}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Price: {order.price}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Product ID: {order.productId}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Footer />
    </>
  );
};

export default OrderList;
