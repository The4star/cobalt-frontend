import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// pages
import Homepage from './pages/homepage/Homepage.component'
import ShopPage from './pages/shop/shop.component'
import CheckoutPage from './pages/checkout/checkout.component'

// context 
import CurrentUserContext from './contexts/current-user/current-user.context'

// components
import Header from './components/header/header.component'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'

const Router = ({signOut, getUser}) => {
  const currentUser = useContext(CurrentUserContext)
  return(
    <>
        <Header signOut={signOut}/>
        <Switch>
            <Route exact path='/' component={Homepage} />
            <Route path='/shop' render={({match}) => < ShopPage match={match} /> } />
            <Route exact path='/checkout' component={CheckoutPage} />
            <Route exact path='/signin' render={ () => currentUser ? <Redirect to='/' /> : <SignInAndSignUpPage getUser={getUser}/> }  />
        </Switch>
    </>
  )
    
}

export default Router;