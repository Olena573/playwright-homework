import { test, expect } from '@playwright/test';

test.beforeEach( async({page}) => {
  await page.goto('/')
  
})

test('Update pet type', async ({page}) => {
  await expect(page.locator('.title')).toHaveText('Welcome to Petclinic')

// 1. Select the PET TYPES menu item in the navigation bar
await page.getByRole('link', { name: 'Pet types' }).click();

// 2. Add assertion of the "Pet Types" text displayed above the table with the list of pet types
await expect(
  page.getByRole('heading', { name: 'Pet Types', level: 2 })
).toBeVisible();

// 3. Click on "Edit" button for the "cat" pet type
await page.locator('input[name="pettype_name"][id="0"]')
  .locator('xpath=ancestor::tr')
  .getByRole('button', { name: 'Edit' })
  .click();


// 4. Add assertion of the "Edit Pet Type" text displayed

await expect(
  page.getByRole('heading', { name: 'Edit Pet Type', level: 2 })
).toBeVisible();

// 5. Change the pet type name from "cat" to "rabbit" and click "Update" button

const petTypeNameInput = page.locator('input#name');

await petTypeNameInput.click();
await petTypeNameInput.press('Control+A');
await petTypeNameInput.pressSequentially('rabbit');

await page.getByRole('button', { name: 'Update' }).click();

// 6. Add the assertion that the first pet type in the list of types has a value "rabbit" 

await expect(
  page.locator('input[name="pettype_name"]').first()
).toHaveValue('rabbit');
// 7. Click on "Edit" button for the same "rabbit" pet type

await page.locator('input[name="pettype_name"][id="0"]')
  .locator('xpath=ancestor::tr')
  .getByRole('button', { name: 'Edit' })
  .click();
// 8. Change the pet type name back from "rabbit" to "cat" and click "Update" button

const petTypeNameInputRabbit = page.locator('input#name');

await petTypeNameInputRabbit.click();
await petTypeNameInputRabbit.press('Control+A');
await petTypeNameInputRabbit.pressSequentially('cat');

await page.getByRole('button', { name: 'Update' }).click();
// 9. Add the assertion that the first pet type in the list of names has a value "cat" 
await expect(
  page.locator('input[name="pettype_name"]').first()
).toHaveValue('cat');


});

//Note: I've changed the config.ts file because my Windows blocked the Chromium browser in this test
