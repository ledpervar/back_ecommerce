import { App } from './src/app';

async function main(){
    const app: App = new App();
    await app.listen();
}

main();