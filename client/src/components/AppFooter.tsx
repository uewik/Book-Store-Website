import '../assets/css/global1.css'
import '../assets/css/header-dropdown1.css';

import contactus from '../assets/images/footer/contactus.png';
import directions from '../assets/images/footer/directions.png';
import Facebook from '../assets/images/footer/Facebook.png';
import Twitter from '../assets/images/footer/Twitter.png';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faFacebook, faTwitter} from "@fortawesome/free-brands-svg-icons";
import {faAddressBook, faDiamondTurnRight} from "@fortawesome/free-solid-svg-icons";


function AppFooter(){
return(
  <div>
      <div className="flex footer">
      <div className="flex info">
        <div className="flex contact">
          {/*<img  src={contactus}*/}
          {/*      alt="contact us"*/}
          {/*      width="30px"*/}
          {/*      height="22.5px"*/}
          {/*      />*/}
            <FontAwesomeIcon icon={faAddressBook} size="xl" style={{color: "#aaaaaa",}} />
          <p>Contact Us</p>
        </div>
        <div className="flex directions">
          {/*<img  src={directions}*/}
          {/*      alt="directions"*/}
          {/*      width="30px"*/}
          {/*      height="30px"*/}
          {/*      />*/}
            <FontAwesomeIcon icon={faDiamondTurnRight} size="xl" style={{color: "#aaaaaa",}} />
          <p>Directions</p>
        </div>
        <div className="flex facebook">
          {/*<img  src={Facebook}*/}
          {/*      alt="facebook"*/}
          {/*      width="50px"*/}
          {/*      height="50px"*/}
          {/*      />*/}
            <FontAwesomeIcon icon={faFacebook} size="xl" style={{color: "#aaaaaa",}} />
          <p>Facebook</p>
        </div>
        <div className="flex twitter">
          {/*<img  src={Twitter}*/}
          {/*      alt="twitter"*/}
          {/*      width="30px"*/}
          {/*      height="30px"*/}
          {/*      />*/}
            <FontAwesomeIcon icon={faTwitter} size="xl" style={{color: "#aaaaaa",}} />
          <p>Twitter</p>
        </div>
      </div>
      <p>© 2023 - 2023 HowBooks Inc. All Rights Reserved. HowBooks, the HowBooks logo, 
        HowBooks.com are registered trademarks with the Registered US Patent & Trademark 
        Office.</p>
    </div>
  </div>
)
}
export default AppFooter;
