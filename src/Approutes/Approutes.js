import React, { useState } from 'react'
import { Routes,Route } from 'react-router-dom'
import AfterLoginLayout from '../Components/AfterLoginLayout';
import BeforeLoginLayout from '../Components_BL/BeforeLoginLayout';
import { useNavigate, useParams } from 'react-router-dom';

// After Login Imports
import Landing from '../Components/Landing_al';
import PlaceOrder from '../Components/PlaceOrder';
import OrderHistory from '../Components/OrderHistory';
import Gallery_Page from '../Components/Gallery';
import ProfilePage from '../Components/ProfilePage';
import ChangePassordPage from '../Components/ChangePasswordPage';
import HowToPlaceOrder from '../Components/HepPages/HowToPlaceOrders';

// ProductList Imports
import WeddingZone from '../Components/ProductsLists/WeddingCardsCatlog';
import VisitingZone from '../Components/ProductsLists/VisitingCardsCatlog';
import DigitalZone from '../Components/ProductsLists/DigitalCatlog';
import BroucherZone from '../Components/ProductsLists/BrouchersCatlog';
import PosterZone from '../Components/ProductsLists/PostersCatlog';
import InvitationZone from '../Components/ProductsLists/InvitationCardsCatlog';

// Product Detail Page Import Single File each just pass id and Fetch Particular Data
import ProductDetailPage from '../Components/ProductsLists/ProductDetailPage';
import ViewCartPage from '../Components/CartView';

// Gallery Page Routes
import WeddingCardsGallery from '../Components/GalleryPage/WeddingCards';
import DigitalPrintingGallery from "../Components/GalleryPage/DigitalPrintingGallery";
import VisitingCardsGallery from "../Components/GalleryPage/VisitingCardsGallery";
import BrouchersGallery from "../Components/GalleryPage/BrouchersGallery";
import InvitationCardsGallery from "../Components/GalleryPage/InvitationCardsGallery";
import PostersGallery from "../Components/GalleryPage/VisitingCardsGallery";

// Before Login Imports
import Home_BL from '../Components_BL/Home';
import About_BL from '../Components_BL/About';
import Portfolio_BL from '../Components_BL/Porfolio';
import Services_BL from '../Components_BL/Services';
import LoginModal from '../Components_BL/LoginModal';
import RegistrationPage from '../Components_BL/RegisterationPage';
import ResetPassword from '../Components_BL/ResetPassword';


// Import the Google Auth Component
import Callback from '../auth/google/callback';



function BeforeLoginCall({open}) // Calling the Before Login Components by using layouts
{
    return(
        <>
            <BeforeLoginLayout open={open}>
                <Home_BL />
                <Services_BL />
                <Portfolio_BL />
                <About_BL />
            </BeforeLoginLayout>
        </>
    )
};


function AfterLoginCall({logout}) // Calling the After Login Components by Using layouts.
{

    return(
        <>
            <AfterLoginLayout logout={logout}>
                <Landing /> 
            </AfterLoginLayout>
        </>
    )
};


export default function Approutes() {

    const navigate = useNavigate();

    const [login, setLogin] = useState(()=>{
        let val = localStorage.getItem('login');
        return val === 'true';
    });

    function loginSuccessfully()
    {
        localStorage.setItem('login','true'); // local storage stores only string values.
        setLogin(true);
        navigate('/'); // Already Given the BaseName = /PrintNest.
    }

    function logoutSuccessfull()
    {
        localStorage.setItem('login','false'); // local storage stores only string values.
        setLogin(false);
        navigate('/'); // Already Given the BaseName = /PrintNest.
    }

    const [loginModalPage, setLoginModalPage] = useState(false);

    function closeLoginModalPage()
    {
       setLoginModalPage(false);
    }

    function displayLoginModalPage()
    {
        setLoginModalPage(true);
    }

  return (
    <div>
        <Routes>

            {/* For Unknown Address EndPoints */}
            <Route path='*' element={!login ? <BeforeLoginCall open={displayLoginModalPage}/> : <AfterLoginCall logout={logoutSuccessfull}/>} />


            {/* Landing Page Routing Based on the Login Result */}
            <Route path='/' element={!login ? <BeforeLoginCall open={displayLoginModalPage}/> : <AfterLoginCall logout={logoutSuccessfull}/>} />
            
            {/* AFTER LOGIN ROUTES STARTS :-> */}
            {/* After Login Pages Routing for Home */}
            <Route path='/home' element={!login ?
            <BeforeLoginCall /> : 

    <AfterLoginCall logout={logoutSuccessfull} />
            }
             />


            {/* After Login Pages Routing for Place Order */}
            <Route path='/placeOrder' element={!login ?
            <BeforeLoginCall /> : <AfterLoginLayout logout={logoutSuccessfull}><PlaceOrder logoutFunction={logoutSuccessfull} /></AfterLoginLayout>
            } />

            {/* After Login Pages Routing for My Profile */}
            <Route path='/myProfile' element={!login ?
            <BeforeLoginCall /> : <AfterLoginLayout logout={logoutSuccessfull}><ProfilePage /></AfterLoginLayout>
            } />

            {/* After Login Pages Routing for Order History */}
            <Route path='/orderHistory' element={!login ?
            <BeforeLoginCall /> :
            <AfterLoginLayout logout={logoutSuccessfull}>
                <OrderHistory />
            </AfterLoginLayout>} />

            {/* After Login Pages Routing for Gallery */}
            <Route path='/gallery' element={!login ?
                <BeforeLoginCall /> :
                <AfterLoginLayout logout={logoutSuccessfull}>
                <Gallery_Page />
                </AfterLoginLayout>
            }
            />

                {/* After Login Pages Routing for Place Order -> Wedding Cards Zone */}
                <Route path='/:slug' element={!login ?
                <BeforeLoginCall /> :
                <AfterLoginLayout logout={logoutSuccessfull}>
                <WeddingZone />
                </AfterLoginLayout>
            }
            />

                {/* After Login Pages Routing for Place Order -> Visiting Cards Zone */}
             <Route path='/VisitingCardsZone' element={!login ?
             <BeforeLoginCall /> :
            <AfterLoginLayout logout={logoutSuccessfull}>
                <VisitingZone />
             </AfterLoginLayout>
             } />

                {/* After Login Pages Routing for Place Order -> Digital Prints Zone */}
             <Route path='/DititalPrintsZone' element={!login ?
             <BeforeLoginCall /> :
            <AfterLoginLayout logout={logoutSuccessfull}>
                <DigitalZone />
             </AfterLoginLayout>
             } />

                {/* After Login Pages Routing for Place Order -> Brouchers Zone */}
             <Route path='/BrouchersZone' element={!login ?
             <BeforeLoginCall /> :
            <AfterLoginLayout logout={logoutSuccessfull}>
                <BroucherZone />
             </AfterLoginLayout>
             } />

                {/* After Login Pages Routing for Place Order -> Posters Zone */}
             <Route path='/PostersZone' element={!login ?
             <BeforeLoginCall /> :
            <AfterLoginLayout logout={logoutSuccessfull}>
                <PosterZone />
             </AfterLoginLayout>
             } />

                {/* After Login Pages Routing for Place Order -> Invitation Cards Zone */}
             <Route path='/InvitationCardsZone' element={!login ?
             <BeforeLoginCall /> :
            <AfterLoginLayout logout={logoutSuccessfull}>
                <InvitationZone />
             </AfterLoginLayout>
             } />

            {/* After Login Pages Routing for Place Order -> Invitation Cards Zone -> Particular Product Detail Page */}
            <Route path='/:pName/:ids' element={!login ?
                <BeforeLoginCall /> :
                <AfterLoginLayout logout={logoutSuccessfull}>
                <ProductDetailPage />
                </AfterLoginLayout>
            } />

            {/* After Login Pages Routing for View Cart Page */}
            <Route path='/cartViewPage' element={!login ?
                <BeforeLoginCall /> :
                <AfterLoginLayout logout={logoutSuccessfull}>
                    <ViewCartPage logout={logoutSuccessfull} />
                </AfterLoginLayout>
            } />

            {/* After Login Pages Routing for View Cart -> Continue Shopping(Back to the Place Order Page) */}
            <Route path='/continueShopping' element={!login ?
                <BeforeLoginCall /> : 
                <AfterLoginLayout logout={logoutSuccessfull}>
                    <PlaceOrder />
                </AfterLoginLayout>
            } />

            {/* After Login Pages Routing for Gallery -> Wedding-Cards Page */}
            <Route path='/wedding-cards' element={!login ?
                <BeforeLoginCall /> : 
                <AfterLoginLayout logout={logoutSuccessfull}>
                    <WeddingCardsGallery />                    
                </AfterLoginLayout>
            } />


            {/* After Login Pages Routing for Gallery -> Digital Printing Page */}
            <Route path='/digital-printing' element={!login ?
            <BeforeLoginCall /> : 
            <AfterLoginLayout logout={logoutSuccessfull}>
                <DigitalPrintingGallery />
            </AfterLoginLayout>
            } />

             {/* After Login Pages Routing for Gallery -> Visiting Card Page */}
             <Route path='/visiting-cards' element={!login ?
                <BeforeLoginCall /> : 
                <AfterLoginLayout logout={logoutSuccessfull}>
                    <VisitingCardsGallery />
                </AfterLoginLayout>
             } />

            {/* After Login Pages Routing for Gallery -> Brouchers Page */}
            <Route path='/brouchers' element={!login ?
                <BeforeLoginCall /> :
                <AfterLoginLayout logout={logoutSuccessfull}>
                    <BrouchersGallery />
                </AfterLoginLayout>
            } />

            {/* After Login Pages Routing for Gallery -> Posters Page */}
            <Route path='/posters' element={!login ?
                <BeforeLoginCall /> :
                <AfterLoginLayout logout={logoutSuccessfull}>
                    <PostersGallery />
                </AfterLoginLayout>
            } />

            {/* After Login Pages Routing for Gallery -> Invitation Cards Page */}
            <Route path='/invitation-cards' element={!login ?
                <BeforeLoginCall /> :
                <AfterLoginLayout logout={logoutSuccessfull}>
                    <InvitationCardsGallery />  
                </AfterLoginLayout>
            } />

            {/* After Login Pages Routing for Change Password Page */}
            <Route path='/changePassword' element={!login ?
                <BeforeLoginCall /> :
                <AfterLoginLayout logout={logoutSuccessfull}>
                    <ChangePassordPage logout={loginSuccessfully} />  
                </AfterLoginLayout>
            } />

            <Route path='/howToPlaceOrder' element={!login ?
                <BeforeLoginCall /> :
                <AfterLoginLayout logout={loginSuccessfully}>
                    <HowToPlaceOrder />
                </AfterLoginLayout>
            } />

          {/* Before Login Pages Routing for Registration Page */}
            <Route path='/RegisterationPage' element={login ?
                <AfterLoginCall logout={logoutSuccessfull} /> :
                <RegistrationPage close={closeLoginModalPage} login={loginSuccessfully}/>
            }
            />

            <Route path='/resetPassword' element={
                <ResetPassword close={closeLoginModalPage} logout={logoutSuccessfull} login={loginSuccessfully}/>
            }
            />

            <Route path='/auth/google/callback' element={<Callback  login={loginSuccessfully} close={closeLoginModalPage}/>} />


        </Routes> 
        {loginModalPage && <LoginModal close={closeLoginModalPage} login={loginSuccessfully}/>}
    </div>
  )
}
