var projectId = process.argv[2];

if (!projectId) return;

var webdriver = require('selenium-webdriver'),
    By = require('selenium-webdriver').By,
    until = require('selenium-webdriver').until;

var driver = new webdriver.Builder()
    .forBrowser('firefox')
    .build();

// access to wantedly
driver.get('https://www.wantedly.com/projects/' + projectId);
driver.findElement({css: '.project-supporters-list-wrapper>a.wt-ui-button'}).click();
driver.findElement({css: '#signin-window a.wt-ui-button' }).click();

// login with facebook
driver.wait(until.titleContains('Facebook'), 10000);
driver.findElement({css: '#login_form .form_row input[name="email"]'}).sendKeys(process.env.FACEBOOK_USER_ID);
driver.findElement({css: '#login_form .form_row input[name="pass"]'}).sendKeys(process.env.FACEBOOK_PASSWORD);
driver.findElement({css: '#login_form .form_row input[name="login"]'}).click();

// cheer
driver.wait(until.titleContains('Wantedly'), 10000);
driver.findElement({css: '.project-supporters-list-wrapper>div.project-support-link'}).click();
// not share
driver.findElement({css: '.sns-checkbox input:checked[type="checkbox"]'}).click();

driver.findElement({css: '#support-with-comment-form button[type="submit"]'}).click();
driver.quit();
