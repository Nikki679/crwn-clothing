import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { signOutUser } from "../../utils/firebase.utils";
import CartIcon from "../../component/cart-icon/cart-icon.component";
import CartDropdown from "../../component/cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../contexts/cart.context";
import { NavigationContainer,NavLinks,LogoContainer,NavLinksContainer } from "./navigation.styles";
const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const {isCartOpen} = useContext(CartContext)
  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo className="logo" />
        </LogoContainer>
        <NavLinksContainer>
          <NavLinks to="/shop">
            SHOP
          </NavLinks>
          {currentUser ? (
            <NavLinks as='span' onClick={signOutUser}>
              SIGN OUT
            </NavLinks>
          ) : (
            <NavLinks to="/auth">
              SIGN IN
            </NavLinks>
          )}
          <CartIcon />
        </NavLinksContainer>
       { isCartOpen && <CartDropdown />} 
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
