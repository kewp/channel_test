const {Builder, By, Key, until} = require('selenium-webdriver');
const http = require('http');
const assert = require('assert');
const server = http.createServer((req, res) => {
  res.end('Hello, World!');
});

(async function example() {
    console.log('starting server listening on 8080');
    server.listen(8080);
    console.log('booting firefox selenium driver');
    let driver = await new Builder().forBrowser('firefox').build();
    try {
        console.log('awaiting http://localhost:8080');
        await driver.get('http://localhost:8080');
        let source = await driver.findElement(By.tagName('body')).getText();
        console.log(`got source '${source}'`);
        assert.strictEqual(source, 'Hello, World');
    } catch (e) {
        console.error(e);
    } finally {
        console.log('shutting down driver');
        await driver.quit();
        console.log('shutting down server');
        server.close();
        console.log('exiting');
        process.exit();
    }
})();
