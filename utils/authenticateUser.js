/**
 * Authentication workflows using ArcGIS OAuth
 *  @module authenticateUser
 * */
import { loadModules } from 'esri-loader'

const APP_ID = 'hZpRbKz3fiSkaj1U'

/**
   * ArcGIS OAuth login
   * @async
   * @func
   * @return {object} user's name and email
   */
export async function esriLogin() {
  const [Portal, OAuthInfo, IdentityManager] = await (loadModules([
    'esri/portal/Portal',
    'esri/identity/OAuthInfo',
    'esri/identity/IdentityManager',
  ]))

  const info = new OAuthInfo({
    appId: APP_ID,
    popup: false,
  })

  IdentityManager.registerOAuthInfos([info])
  IdentityManager.getCredential(`${info.portalUrl}/sharing`)
  return new Promise((resolve, reject) => {
    IdentityManager.checkSignInStatus(`${info.portalUrl}/sharing`)
      .then(() => {
        const portal = new Portal()
        // Setting authMode to immediate signs the user in once loaded
        portal.authMode = 'immediate'
        // Once loaded, user is signed in
        portal.load().then(() => {
          // set store values of email and name
          resolve({ name: portal.user.fullName, email: portal.user.email })
        })
      })
      .catch((e) => {
        reject(e)
      })
  })
}

/**
   * ArcGIS OAuth logout
   * @async
   * @func
   */
export async function esriLogout() {
  // load modules
  const [OAuthInfo, IdentityManager] = await (loadModules([
    'esri/identity/OAuthInfo',
    'esri/identity/IdentityManager',
  ]))

  // destroy credentials
  const info = new OAuthInfo({
    appId: APP_ID,
    popup: false,
  })
  IdentityManager.registerOAuthInfos([info])
  IdentityManager.destroyCredentials()
}
