/* Copyright 2020 Province of British Columbia

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License. */

package pages

import geb.Page

class LoginAdminPage extends Page {
  static at = { title == 'Government of British Columbia' || title == 'Industrial Camps Admin' }
  static url = 'minesoperatorscreening/admin'

  static content = {
    pageTitle { $('#login-to').text() == 'Log in to sfs7.gov.bc.ca' }
    usernameField { $('#user') }
    passwordField { $('#password') }
    logInButton { $('input', type:'submit', name:'btnSubmit', value:'Continue') }
  }

  void logIn() {
        logInButton.click()
    }

}