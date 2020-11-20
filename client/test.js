// Relies on having mocha, chai and puppeteer as dev dependencies
const expect = require('chai').expect;
const puppeteer = require('puppeteer'); // https://devdocs.io/puppeteer/
const mocha = require('mocha');
const nyc = require('nyc');
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
            expect(title).to.equal("Title - Post Anonymously");
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
            const headerh2 = await page.$('header h2');
            const headerText = await headerh2.evaluate(el => el.textContent, headerh2);
            expect(headerText).to.equal('titlepage');
        })
        
        it('has the correct content', async () => {
            const headerp = await page.$('header p');
            const headerText = await headerp.evaluate(el => el.textContent, headerp);
            expect(headerText).to.equal('post anonymously...');
        })
      
    describe('main',() => {
        let main;
        it('exists', async () => {
            main = await page.$('main');
            expect(main).to.exist;
        })
    })
    it('has the correct content', async () => {
        const mainblockquote = await page.$('main blockquote');
        const mainText = await mainblockquote.evaluate(el => el.textContent, mainblockquote);
        expect(mainText).to.equal('\n        anonymously post journal entries, complete with gifs, emojis and vibes\n      ');
    })
    it('form exists', async () => {
        const form = await page.$('form')
        expect(form).to.exist;
    })
    
    it('has an id of "name"', async () => {
        let nameInput = await page.$('form input#name');
        expect(nameInput).to.exist;
            });
    it('has an id of cont', async() => {
    let textArea = await page.$('form textarea#content')
    expect(textArea).to.exist;
    });
    it('has an id of giphy', async() => {
        let giphyInput = await page.$('form input#giphy')
        expect(giphyInput).to.exist;
        })
    it('has a class of button-primary submit-button ', async() => {
            let button = await page.$('form')
            expect(button).to.exist;
            })
        
    it('it has a class of gif-button', async () => {
                let button1 = await page.$('form')
                expect(button1).to.exist;
            
        });
    it('it has a image', async () => {
            let image = await page.$('form')
            expect(image).to.exist;
        
    });
 
});
    
    

      after(async () => {
        await browser.close();
    });