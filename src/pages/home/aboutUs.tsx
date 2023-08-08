import EditInfo from '@pages/user/EditInfo';
import SideMenu from '@pages/user/SideMenu';
import UserPage from '@pages/user/user';
import { Footer } from 'antd/es/layout/layout';
import React from 'react';
import { useState } from 'react'
import useTitle from 'src/hooks/useTitle';
import NavBar from 'src/layout/navigationBar';



  return (

    <div id="mc_embed_shell">

      <div id="mc_embed_signup">
        <form action="https://gmail.us8.list-manage.com/subscribe/post?u=e0b08f64193468684ada6b111&amp;id=fa8f616500&amp;f_id=005d71e0f0" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_self" novalidate="">
          <div id="mc_embed_signup_scroll"><h2>Subscribe to our CTQM</h2>
            <div className="indicates-required">
              <span className="asterisk">*</span> indicates required
              </div>
            <div className="mc-field-group"><label htmlFor="mce-EMAIL">Email Address <span className="asterisk">*</span></label>
            <input type="email" name="EMAIL" class="required email" id="mce-EMAIL" required="" value=""/><span id="mce-EMAIL-HELPERTEXT" className="helper_text">example@email.com</span>
            </div>
            <div id="mce-responses" className="clear foot">
              <div class="response" id="mce-error-response" style="display: none;"></div>
              <div class="response" id="mce-success-response" style="display: none;"></div>
            </div>
            <div aria-hidden="true" style="position: absolute; left: -5000px;">
            {/* /* real people should not fill this in and expect good things - do not remove this or risk form bot signups */ }
              <input type="text" name="b_e0b08f64193468684ada6b111_fa8f616500" tabindex="-1" value="" />
            </div>
            <div className="optionalParent">
              <div className="clear foot">
                <input type="submit" name="subscribe" id="mc-embedded-subscribe" class="button" value="Subscribe" />
                <p style="margin: 0px auto;">
                  <a href="http://eepurl.com/iwvOKo" title="Mailchimp - email marketing made easy and fun">
                    <span style="display: inline-block; background-color: transparent; border-radius: 4px;">
                      <img class="refferal_badge" src="https://digitalasset.intuit.com/render/content/dam/intuit/mc-fe/en_us/images/intuit-mc-rewards-text-dark.svg" alt="Intuit Mailchimp" style="width: 220px; height: 40px; display: flex; padding: 2px 0px; justify-content: center; align-items: center;">
                    </span>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}



const SignUpForm: React.FC = () => {
    useTitle("Subscribe to our website");

    return (
        <React.Fragment>
            <NavBar />
            <div className="min-h-screen bg-slate-700 leading-normal overflow-x-hidden lg:overflow-auto">
            
            </div>
            <Footer />
        </React.Fragment>
    );
};

export default UserPage;