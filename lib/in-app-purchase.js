const iap = require("in-app-purchase");
const { google } = require('googleapis');
const { JWT } = require('google-auth-library');

const iapTestMode = process.env.IAP_TEST_MODE === true;
iap.config({
    // If you want to exclude old transaction, set this to true. Default is false:
    appleExcludeOldTransactions: true,
    // this comes from iTunes Connect (You need this to valiate subscriptions):
    applePassword: process.env.APPLE_SHARED_SECRET,
  
    googleServiceAccount: {
      clientEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      privateKey: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY,
    },
  
    /* Configurations all platforms */
    test: iapTestMode, // For Apple and Google Play to force Sandbox validation only
    verbose: false, // Output debug logs to stdout stream
});

google.options(
    {
        auth: new JWT(
            process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            null,
            process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY,
            ['https://www.googleapis.com/auth/androidpublisher'],
        )
    }
);
  
const androidGoogleApi = google.androidpublisher({ version: 'v3' });

exports.validatePurchase = async (device, type, receipt) => {
    try {

        if (device == 'android') {

            let subscriptionReceipt = JSON.parse(receipt);

            receipt = {
                packageName: subscriptionReceipt.packageName,
                productId: subscriptionReceipt.productId,
                purchaseToken: subscriptionReceipt.purchaseToken,
                subscription: true
            };

        }

        await iap.setup();

        // iap.validate(...) automatically detects what type of receipt you are trying to validate
        const validatedData = await iap.validate(receipt);
        const purchaseData = iap.getPurchaseData(validatedData);

        console.log("purchased data ", purchaseData[0]);

        if (iap.isValidated(validatedData)) {
            console.log('valid receipt');
        }

        const isCancelled = iap.isCanceled(purchaseData[0]);
        const isExpired = iap.isExpired(purchaseData[0]);

        let receiptData = purchaseData;
        if (isExpired == false && isCancelled == false) {
            if (type == "paymentProcessing") {
                receiptData = {
                    origTxId: device === 'ios' ? purchaseData[0].transactionId : purchaseData[0].orderId,
                    startDate: device === 'ios' ? new Date(purchaseData[0].purchaseDateMs) : new Date(parseInt(purchaseData[0].startTimeMillis, 10)).toISOString(),
                    endDate: device === 'ios' ? new Date(purchaseData[0].expiresDateMs) : new Date(parseInt(purchaseData[0].expiryTimeMillis, 10)).toISOString()
                }
                // From https://developer.android.com/google/play/billing/billing_library_overview:
                // You must acknowledge all purchases within three days.
                // Failure to properly acknowledge purchases results in those purchases being refunded.
                if (device === 'android' && validatedData.acknowledgementState === 0) {
                    await androidGoogleApi.purchases.subscriptions.acknowledge({
                    packageName: receipt.packageName,
                    subscriptionId: receipt.productId,
                    token: receipt.purchaseToken
                    });
                }
            }
            console.log('Purchase validated successfully');
            return { success: true, message: 'Purchase validated successfully', data: receiptData }
        } else if (isExpired) {
            console.log('Purchase has been expired');
            return { success: false, message: "Purchase has been expired", data: receiptData }
        } else if (isCancelled) {
            console.log('Purchase has been cancelled');
            return { success: false, message: "Purchase has been cancelled", data: receiptData }
        }
        
    } catch (error) {
        console.log("Error while validating purchase", JSON.parse(error));
        return { success: false, message: 'Error while validating purchase', data: JSON.parse(error).message }
    }
}