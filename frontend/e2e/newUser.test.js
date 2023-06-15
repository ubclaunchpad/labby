import { Selector } from 'testcafe';

fixture('New User').page('http://localhost:3000/');

test('Create an account', async t => {
    await t
        // automatically dismiss dialog boxes
        .setNativeDialogHandler(() => true)

        // go to signup page
        .click('a[data-testid="signup"]')

        // fill out form
        .click('input[placeholder="Email"]')
        .typeText('input[placeholder="Email"]', 'test@test.com')
        .click('input[placeholder="First Name"]')
        .typeText('input[placeholder="First Name"]', 'Test')
        .click('input[placeholder="Last Name"]')
        .typeText('input[placeholder="Last Name"]', 'User')
        .click('input[placeholder="Password"]')
        .typeText('input[placeholder="Password"]', 'password')

        // click signup
        .click('button[data-testid="SignupButton"]')

        // login
        .click('input[placeholder="Email"]')
        .typeText('input[placeholder="Email"]', 'test@test.com')
        .click('input[placeholder="Password"]')
        .typeText('input[placeholder="Password"]', 'password')

        // click login
        .click('button[data-testid="LoginButton"]');

    // check that we are on the home page
    const homePage = Selector('div').withText('MAPcore Services');
    await t.expect(homePage.exists).ok();
});

test('Approve new employee', async t => {
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

        // go to administration page
        .click('a[data-testid="admin"]')

        // go to users tab
        .click('a[data-testid="users"]')

        // approve all
        .click('button[data-testid="approveAllButton"]')

        // select dropdown in row with name "Test User"
        .click('div[data-testid="employeeSelect_test@test.com"]')
        .typeText('div[data-testid="employeeSelect_test@test.com"]', 'Yes')
        .pressKey('enter')

        // delete user
        .click('img[data-testid="employeeDelete_test@test.com"]')
        .click(Selector('button').withText('Delete'));
});