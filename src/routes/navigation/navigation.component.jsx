import { Fragment, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { signOutUser } from "../../utils/firebase.utils";
import CartIcon from "../../component/cart-icon/cart-icon.component";
import CartDropdown from "../../component/cart-dropdown/cart-dropdown.component";
import { NavigationContainer,NavLinks,LogoContainer,NavLinksContainer } from "./navigation.styles";
import {selectCurrentUser} from '../../store/user/user.selector'
import {selectIsCartOpen} from '../../store/cart/cart.selector'
import { signOutStart } from "../../store/user/user.action";

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser)
  const dispatch = useDispatch();
  const signOutUser = () => dispatch(signOutStart())
  const isCartOpen = useSelector(selectIsCartOpen)
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
