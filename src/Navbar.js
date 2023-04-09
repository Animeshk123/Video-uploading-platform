import { NavLink } from "react-router-dom";
import Styled from "styled-components";
const Navbar = () => {
  return (
    <>
      <div className="section navbar">
        <div className="container">
          <Wrapper>
            <Logo>
              <NavLink to="/">Youtube</NavLink>
            </Logo>
            <NavLinks>
              <NavLink to="/upload">
                <img src="/upload.svg" alt="upload" />
              </NavLink>
            </NavLinks>
          </Wrapper>
        </div>
      </div>
    </>
  );
};

const Wrapper = Styled.div`
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:1rem 0;
`;

const Logo = Styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
  a{
    text-decoration:none;
    color:white;
    font-weight:bold;
    font-size:1.2rem;
  }
`;

const NavLinks = Styled.div`
  display:flex;
  align-items:center;
  a{
    color:white;
    font-weight:bold;
    text-decoration:none;
   img{
     width:30px;
     height:30px;
   }
  }
`;

export default Navbar;
