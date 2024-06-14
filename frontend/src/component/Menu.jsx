import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "react-bootstrap/Nav";
import "../css/Header.css";
import { Link } from "react-router-dom";

const Menu = () => {
    const Categories = [
        { link: "Electric" },
        { link: "Clothing" },
        { link: "Home-Kitchen" },
        { link: "Tv Screens" },
        { link: "Smart Technology" },
        { link: "Laptops Accessories" },
        { link: "Music Instruments" },
        { link: "Books" },
        
      ];

      // console.log("leng",itemsLenght);

      return(
        <>
               <div className="horizontal-scroll-container ">
        <Nav className="horizontal-navbar">
          {Categories.map((category, index) => (
            <Nav.Item key={index}>
              <Nav.Link
                as={Link}
                to={`/pages/${category.link}`}
                id="categoury"
              >
                {category.link}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      </div>
        </>
      )
}

export default Menu;