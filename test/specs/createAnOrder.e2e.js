const page = require('../../page');
const helper = require('../../helper')

describe('Create an order', () => {
// 1) Setting the address
    it('should set the address', async () => {
        await browser.url(`/`)
        const fromField = $('#from');
        fromField.setValue('East 2nd Street, 601');
        const toField = await $('#to')
        await toField.setValue('1300 1st St')
        await browser.pause(2000);
        await expect(fromField).toHaveValue('East 2nd Street, 601');
        await expect(toField).toHaveValue('1300 1st St');
    })

 //2) Selecting the Supportive plan
    it('should select Supportive plan', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const supportivePlanButton = await $(page.supportivePlanButton);
        await supportivePlanButton.waitForDisplayed();
        await supportivePlanButton.click();
        await expect(supportivePlanButton).toBeDisplayed();
        await browser.pause(2000);
    })

// 3) Filling in the phone number
    it('should open phone number modal', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumberButton = await $(page.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(page.phoneNumberModal);
        await expect(phoneNumberModal).toBeExisting();
    })

    it('should save the phone', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
    })

// 4) Adding a credit card
    it('should open credit card modal', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.fillCardNumber('1234 0000 4321');
        await page.fillCvvCode('12');
        await expect($(page.linkButton)).toBeExisting();
    })

// 5) Writing a message for the driver
    it('should write a message for the driver', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const messageForDriverField = await $(page.messageForDriverField);
        await messageForDriverField.waitForDisplayed();
        await messageForDriverField.scrollIntoView();
        await messageForDriverField.setValue('Get some bottled water.');
        await expect(messageForDriverField).toHaveValue('Get some bottled water.');
        await browser.pause(2000);
    })

// 6) Ordering a blanket and handkerchiefs
    it('should order a blanket and hand', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const supportivePlanButton = await $(page.supportivePlanButton);
        await supportivePlanButton.waitForDisplayed();
        await supportivePlanButton.click();
        const blanketAndHandkerchiefsButton = await $(page.blanketAndHandkerchiefsButton);
        await blanketAndHandkerchiefsButton.waitForDisplayed();
        await blanketAndHandkerchiefsButton.scrollIntoView();
        await blanketAndHandkerchiefsButton.click();
        await browser.pause(2000);
        await expect($(page.blanketSwitch)).toBeChecked();
})

// 7) Ordering 2 Ice creams
it('should order two ice creams', async () => {
    await browser.url(`/`)
    await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
    const addIcecreamButton = await $(page.addIcecreamButton);
    await addIcecreamButton.scrollIntoView();
    addIcecreamButton.click();
    addIcecreamButton.click();
    await browser.pause(1000);
    await expect($(page.addIcecreamButton)).toBeDisplayed();
})

// 8) The car search modal appears
it('should display the car search modal', async () => {
    await browser.url(`/`)
    await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
    const orderButton = await $(page.orderButton);
    await orderButton.waitForDisplayed();
    await orderButton.click();
    const carSearchModal = await $(page.carSearchModal);
    await expect($(page.carSearchModal)).toBeExisting();
})
    
// 9) Wait for the driver info to appear in the modal
it('should display driver info in the car search modal', async () => {
    await browser.url(`/`)
    await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
    const orderButton = await $(page.orderButton);
    await orderButton.waitForDisplayed();
    await orderButton.click();
    const carSearchModal = await $(page.carSearchModal);
    await browser.pause(10000);
    const driverInfo = await $(page.driverInfo);
    await driverInfo.waitForExist();
    await expect($(page.driverInfo)).toBeExisting();
})

})

