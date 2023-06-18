import { Selector } from 'testcafe';

fixture('New Form').page('http://localhost:3000/');

test('Create a form', async t => {
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
        .click('a[data-testid="myForms"]')

        // click new form button
        .click('div[data-testid="createNew"]')

        // set form title
        .click('input[placeholder="Type your form name here..."]')
        .typeText('input[placeholder="Type your form name here..."]', 'E2E_Testing_Form')
        .click(Selector('div').withText('Drag and drop to add components').nth(5))


        // drag project element into form
        .dragToElement(Selector('div').withText('Project Selector').nth(8), Selector('div').withText('Drag and drop to add components').nth(5))
        .wait(1000)
        .dragToElement(Selector('div').withText('Form Information').nth(8), Selector('div').withText('Q1').nth(5))
        .wait(1000)
        .dragToElement(Selector('div').withText('Single Selection').nth(8), Selector('div').withText('Q2').nth(5))
        .wait(1000)
        .dragToElement(Selector('div').withText('Text Answer').nth(8), Selector('div').withText('Q3').nth(5))
        .wait(1000)
        .dragToElement(Selector('div').withText('Dropdown').nth(8), Selector('div').withText('Q4').nth(5))
        .wait(1000)
        .dragToElement(Selector('div').withText('Heading').nth(8), Selector('div').withText('Q5').nth(5))
        .wait(1000)
        .dragToElement(Selector('div').withText('Text').nth(8), Selector('div').withText('Q6').nth(5))
        .wait(1000)
        .dragToElement(Selector('div').withText('File Upload').nth(8), Selector('div').withText('Q7').nth(5))
        .wait(1000)
        .dragToElement(Selector('div').withText('File Download').nth(8), Selector('div').withText('Q8').nth(5))
        .wait(1000)
        .dragToElement(Selector('div').withText('Contact Information').nth(8), Selector('div').withText('Q9').nth(5))
        .wait(1000)
        .dragToElement(Selector('div').withText('Multiple Choice').nth(8), Selector('div').withText('Q10').nth(5))
        .wait(1000)

        // add logic
        .click(Selector('#root .GlobalEditorQuestionTitleInput').nth(2))
        .typeText(Selector('#root .GlobalEditorQuestionTitleInput').nth(2), 'Logic Test Question')
        .click(Selector('#root .new-question-input'))
        .typeText(Selector('#root .new-question-input'), 'Option 1')
        .pressKey('enter')

        .click(Selector('#root button').withText('Logic'))
        .click(Selector('#questionSelect'))
        .pressKey('down')
        .pressKey('enter')

        .click(Selector('#ifAnswerSelect'))
        .typeText(Selector('#ifAnswerSelect'), "Logic Test Question")
        .pressKey('down')
        .pressKey('down')
        .pressKey('down')
        .pressKey('enter')

        .click(Selector('#root label').withText('Option 1'))

        .click(Selector('#root button').withText('Save Logic'))

        // view logic

        .click(Selector('#root div').withText('View Logic').nth(10))

        .expect(Selector('#root div').withText('Display this question if').nth(10).exists).ok()
        .expect(Selector('#root div').withText('Option 1').nth(6).exists).ok()

        .click(Selector('#root button').withText('Delete'))

        .click(Selector('#root button').withText('Publish'));
});

test('Clean up a form', async t => {
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
        .click('a[data-testid="myForms"]')

        // delete form
        .click('img[data-testid="formDelete_E2E_Testing_Form"]');
});