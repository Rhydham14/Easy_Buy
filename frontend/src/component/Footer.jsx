import React from "react";
import { Container, Grid, Link, Typography, Box, Divider } from "@mui/material";
import "../css/Footer.css";
export default function Footer() {
  return (
    <Box component="footer" sx={{ color: "white", py: 5 }} id="boxfooter">
      <Container>
        <Typography variant="body1" align="center" sx={{ mb: 4 }}>
          Welcome to easyBuy, your one-stop shop for all your shopping needs.
          Discover a wide range of products and enjoy seamless shopping with us.
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Customer Service
            </Typography>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              <li>
                <Link href="#!" color="inherit" underline="hover">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#!" color="inherit" underline="hover">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="#!" color="inherit" underline="hover">
                  Shipping
                </Link>
              </li>
              <li>
                <Link href="#!" color="inherit" underline="hover">
                  Order Status
                </Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Company
            </Typography>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              <li>
                <Link href="#!" color="inherit" underline="hover">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#!" color="inherit" underline="hover">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#!" color="inherit" underline="hover">
                  Press
                </Link>
              </li>
              <li>
                <Link href="#!" color="inherit" underline="hover">
                  Affiliates
                </Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              <li>
                <Link href="#!" color="inherit" underline="hover">
                  Facebook
                </Link>
              </li>
              <li>
                <Link href="#!" color="inherit" underline="hover">
                  Twitter
                </Link>
              </li>
              <li>
                <Link href="#!" color="inherit" underline="hover">
                  Instagram
                </Link>
              </li>
              <li>
                <Link href="#!" color="inherit" underline="hover">
                  LinkedIn
                </Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Legal
            </Typography>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              <li>
                <Link href="#!" color="inherit" underline="hover">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#!" color="inherit" underline="hover">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#!" color="inherit" underline="hover">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="#!" color="inherit" underline="hover">
                  Accessibility
                </Link>
              </li>
            </ul>
          </Grid>
        </Grid>
      </Container>
      <Divider sx={{ my: 4 }} />
      <Box textAlign="center" py={3} sx={{ bgcolor: "black" }}>
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} easyBuy. All rights reserved.
        </Typography>
        <Link href="https://mdbootstrap.com/" color="inherit">
          Developed by Rhydham Bhalodia
        </Link>
      </Box>
    </Box>
  );
}
