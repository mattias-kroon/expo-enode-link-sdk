type ResultCode = "success" | "missingLinkToken" | "malformedLinkToken" | "dismissedViaDismissFunction" | "cancelledByUser" | "USER_INTERACTION" | "backendError" | "earlyExitRequestedFromFrontend" | "permissionError" | "unknownError";
export declare function listenToResult(onResult: (code: ResultCode, errorMessage?: string) => void): {
    remove: () => void;
};
export declare function show(token: string): void;
export { ResultCode };
//# sourceMappingURL=index.d.ts.map