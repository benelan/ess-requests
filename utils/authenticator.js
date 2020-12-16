import { loadModules } from 'esri-loader'

export async function esriLogin() {
  const [Portal, OAuthInfo, IdentityManager] = await (loadModules([
    "esri/portal/Portal",
    "esri/identity/OAuthInfo",
    "esri/identity/IdentityManager"
  ]))

  var info = new OAuthInfo({
    appId: "hZpRbKz3fiSkaj1U",
    popup: false
  })

  IdentityManager.registerOAuthInfos([info])
  IdentityManager.getCredential(info.portalUrl + "/sharing")
  return new Promise((resolve, reject) => {
    IdentityManager.checkSignInStatus(info.portalUrl + "/sharing")
      .then(() => {
        var portal = new Portal()
        // Setting authMode to immediate signs the user in once loaded
        portal.authMode = "immediate"
        // Once loaded, user is signed in
        portal.load().then(function () {
          // set store values of email and name
          resolve({name: portal.user.fullName, email: portal.user.email})
        })
      })
      .catch((e) => {
        reject(e)
      })
  })
}

export async function esriLogout() {
  // load modules
  const [OAuthInfo, IdentityManager] = await (loadModules([
    "esri/identity/OAuthInfo",
    "esri/identity/IdentityManager"
  ]))

  // destroy credentials
  var info = new OAuthInfo({
    appId: "hZpRbKz3fiSkaj1U",
    popup: false
  })
  IdentityManager.registerOAuthInfos([info])
  IdentityManager.destroyCredentials()
}