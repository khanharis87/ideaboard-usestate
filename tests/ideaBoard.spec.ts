import { test, type Page } from "@playwright/test";

function currentDate() {
  return new Date().toISOString().split("T")[0];
}

async function navigateToPage(page) {
  await page.goto("http://localhost:5173/");
}

async function addIdea(page: Page, title: string, description: string) {
  await page.getByTestId("new-title").fill(title);
  await page.getByTestId("new-description").fill(description);
  await page.getByTestId("new-submit").click();
}

async function checkIdeaIsPresent(
  page: Page,
  title: string,
  description: string,
  index: number
) {
  const today = currentDate();

  await page.getByRole("heading", { name: title }).waitFor();
  (await page.getByTestId(`created-at`).nth(index).innerText()).includes(today);
  await (
    await page.getByTestId("description").nth(index).innerText()
  ).includes(description);
}

async function editIdea(page: Page, title: string, description: string) {
  await page.getByRole("button", { name: "Edit" }).click();
  await page.getByTestId("edit-title").fill(title);
  await page.getByTestId("edit-description").fill(description);
  await page.getByTestId("edit-submit").click();
}

test("each idea should contain a title and description, which is editable, sortable with created/updated time", async ({
  page,
}) => {
  await navigateToPage(page);
  await addIdea(page, "Idea 1", "Description 1");

  // Add idea
  await checkIdeaIsPresent(page, "Idea 1", "Description 1", 0);
  (await page.getByTestId("new-title").innerText()).length === 0;
  (await page.getByTestId("new-description").innerText()).length === 0;

  // Edit idea
  await editIdea(page, "Idea 1 edited", "Description 1 edited");
  await checkIdeaIsPresent(page, "Idea 1 edited", "Description 1 edited", 0);

  // Sort Idea
  await addIdea(page, "Last Idea", "Last Description");
  await checkIdeaIsPresent(page, "Last Idea", "Last Description", 0);
  await page.getByRole("button", { name: "Sort by title" }).click();
  (await page.getByTestId("idea").nth(0).innerText()) === "Idea 1 edited";

  // Delete Idea
  await page.getByRole("button", { name: "Delete" }).nth(0).click();
  (await page.getByTestId("idea").count()) === 1;
});

test("ideas should be saved in local storage", async ({ page }) => {
  await navigateToPage(page);
  await addIdea(page, "Idea 1", "Description 1");

  await page.reload();
  await checkIdeaIsPresent(page, "Idea 1", "Description 1", 0);
  (await page.getByTestId("idea").count()) === 1;
});

test("description should have a character limit and show warning if character limit is 20 characters away than max limit", async ({
  page,
}) => {
  await navigateToPage(page);
  await addIdea(page, "Idea 1", "Description 1");
  await checkIdeaIsPresent(page, "Idea 1", "Description 1", 0);

  await page.getByRole("button", { name: "Edit" }).click();
  await page.getByTestId("edit-description").fill("a".repeat(101));
  (await page.getByTestId("remaining-chars").innerText()) ===
    "19 characters left";
});
