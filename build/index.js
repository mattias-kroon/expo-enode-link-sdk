import { NativeModulesProxy, EventEmitter } from "expo-modules-core";
import ExpoEnodeLinkSDKModule from "./ExpoEnodeLinkSDKModule";
const ON_RESULT_EVENT_NAME = "OnResult";
const emitter = new EventEmitter(ExpoEnodeLinkSDKModule ?? NativeModulesProxy.ExpoEnodeLinkSDK);
export function listenToResult(onResult) {
    const listener = emitter.addListener(ON_RESULT_EVENT_NAME, (event) => onResult(event.code, event.errorMessage));
    return { remove: () => listener.remove() };
}
export function show(token) {
    ExpoEnodeLinkSDKModule.show(token);
}
//# sourceMappingURL=index.js.map