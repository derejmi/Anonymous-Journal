// Relies on having mocha, chai and puppeteer as dev dependencies
const expect = require('chai').expect;
const puppeteer = require('puppeteer'); // https://devdocs.io/puppeteer/

const fs = require('fs');

let browser;
let page;

before(async () => {
    browser = await puppeteer.launch({headless: true});
    page = await browser.newPage();
    const html = fs.readFileSync('index.html', {encoding: 'utf-8'});
    await page.setContent(html)

});

describe('index.html', () => {

    describe('head', () => {
        it('has a title', async () => {
            const title = await page.title();
            expect(title).to.be.a("string");
            expect(title).to.equal("Title - Post Anonymously 👀");
        });
    });
    
    describe('header', () => {
        let header;
        it('exists', async () => {
            header = await page.$('header');
            expect(header).to.exist;
        })
    })

        it('has the correct content', async () => {
            const headerh1 = await page.$('header h1');
            const headerText = await headerh1.evaluate(el => el.textContent, headerh1);
            expect(headerText).to.equal('Title  👀 🤐');
        })
      })

    
    
    
      after(async () => {
        await browser.close();
    });