import { Selector } from 'testcafe';

fixture('Admin Management').page('http://localhost:3000/');

test('Administration', async t => {
    await t
        // automatically dismiss dialog boxes
        .setNativeDialogHandler(() => true)

        // login
        .click('input[placeholder="Email"]')
        .typeText('input[placeholder="Email"]', 'labby@ubc.com')
        .click('input[placeholder="Password"]')
        .typeText('input[placeholder="Password"]', 'password')

        // click login
        .click('button[data-testid="LoginButton"]')

        // go to my forms page
        .click('a[data-testid="admin"]')

        // select form and question
        .click(Selector('#root .ServiceQuestionSelectCostTable'))
        .pressKey('down')
        .pressKey('enter')
        .click(Selector('#root .ServiceQuestionSelectCostTable').nth(1))
        .pressKey('down')
        .pressKey('enter')

        // go to tabs
        .click(Selector('#root a').withText('Cost Center'))
        .click(Selector('#root a').withText('Projects'))
        .click(Selector('#root a').withText('Organization'));
});