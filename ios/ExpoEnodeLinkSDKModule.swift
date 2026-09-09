import ExpoModulesCore
import LinkKit

public class ExpoEnodeLinkSDKModule: Module {
  static let ON_RESULT_EVENT_NAME = "OnResult"

  private var handler: Handler?
 
  public func definition() -> ModuleDefinition {
    Name("ExpoEnodeLinkSDK")

    Events(ExpoEnodeLinkSDKModule.ON_RESULT_EVENT_NAME)

    Function("show") { (token: String) in
      self.handler = Handler(linkToken: token) { (code: LinkResultCode, errorMessage: String?) in
        self.sendEvent(ExpoEnodeLinkSDKModule.ON_RESULT_EVENT_NAME, [
          "code": code.rawValue,
          "errorMessage": errorMessage
        ])
      }

      DispatchQueue.main.async { () -> Void in
        // Resolved on the main queue rather than up front: the presenting
        // controller can change between `show` being called and the UI being
        // presented, and force-unwrapping it crashed the app when it was nil.
        guard let currentVc = self.appContext?.utilities?.currentViewController() else { return }
        self.handler?.present(from: currentVc)
      }
      
    }
  }
}
