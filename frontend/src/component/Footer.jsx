import React from 'react';
import {
  Container,
  Grid,
  Link,
  Typography,
  Box,
  Divider
} from '@mui/material';

export default function Footer() {
  return (
    
    <Box component="footer" sx={{ color: 'white', py: 4 }} style={{backgroundColor:"purple"}}>
      <Container style={{backgroundColor:"purple"}}>
        <Typography variant="body1" align="center" sx={{ mb: 4 }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt distinctio earum repellat quaerat
          voluptatibus placeat nam, commodi optio pariatur est quia magnam eum harum corrupti dicta, aliquam
          sequi voluptate quas.
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {Array.from({ length: 4 }).map((_, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Typography variant="h6" gutterBottom>Links</Typography>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {Array.from({ length: 4 }).map((_, linkIndex) => (
                  <li key={linkIndex}>
                    <Link href="#!" color="inherit" underline="hover">
                      Link {linkIndex + 1}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Divider sx={{ my: 4 }} />
      <Box textAlign="center" py={3} sx={{ bgcolor: 'black' }}>
        <Link href="https://mdbootstrap.com/" color="inherit">
          Develop by Rhydham Bhalodia
        </Link>
      </Box>
    </Box>
    
  );
}
