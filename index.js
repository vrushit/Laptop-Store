/*
console.log(`Hello World`);
console.log(`Hello World 2`);
console.log(`Hello World 3`);
*/
//nodemon installation

//file system mpoduke

const fs = require('fs');

const http = require(`http`);

//buildin functionality of Node

const url  = require(`url`);

const json = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');

//console.log(__dirname);
const laptopData = JSON.parse(json);
//console.log(laptopData);

const server = http.createServer((req,res) => {
    //console.log('Someone did access the Server!');
  const pathName = url.parse(req.url, true).pathname;
    //console.log(req,url);
    console.log(pathName);
    const id = url.parse(req.url, true).query.id;

    console.log(id);

    //Products Overview
    if(pathName === '/products' || pathName === '/')
    {
        res.writeHead(200, { 'Content-type': 'text/html'}); //200 or 404
        //res.end(`This is the Products page`);

        //step1
        fs.readFile(`${__dirname}/templates/template_overview.html`,`utf-8`,(err, data) =>{
            //res.end(data);
            let overViewOutput = data;
            fs.readFile(`${__dirname}/templates/template_cards.html`,`utf-8`,(err, data) =>{

           const cardsOutput = laptopData.map(el => replaceTempate(data, el)).join('');
            overViewOutput = overViewOutput.replace('{%CARDS%}',cardsOutput);
         //  console.log(cardsOutput);


                res.end(overViewOutput);
            });
        });

        //step2


    }

    //laptop details
    else if(pathName === '/laptop' && id < laptopData.length)
    {
        res.writeHead(200, { 'Content-type': 'text/html'}); //200 or 404
       // res.end(`This is the Laptop page for ${id}`);

        fs.readFile(`${__dirname}/templates/template_laptop.html`,`utf-8`,(err, data) =>{

            const laptop = laptopData[id];
    const output = replaceTempate(data,laptop);

            res.end(output);
        });
    }

    //IMAGE
    else if((/\.(jpg|jpeg|png|gif)$/i).test(pathName))
    {
    fs.readFile(`${__dirname}/data/img${pathName}`,(err, data) => {

        res.writeHead(200, { 'Content-type': 'image/jpg'}); //200 or 404
        res.end(data);
    });
    }
    //URL not found
    else
    {
        res.writeHead(404, { 'Content-type': 'text/html'}); //200 or 404
        res.end(`Url was not found !!`);
    }

});

server.listen(1337, '127.0.0.1', () => {
    console.log('Listening for requests now');
}); //JS to listen

//-----------------Routing-------------
//implementing

///------------------Templating

function replaceTempate(originalHtml, laptop)
{
    let output = originalHtml.replace(/{%PRODUCTNAME%}/g, laptop.productName);
    output = output.replace(/{%IMAGE%}/g, laptop.image);
    output = output.replace(/{%PRICE%}/g, laptop.price);
    output = output.replace(/{%SCREEN%}/g, laptop.screen);
    output = output.replace(/{%CPU%}/g, laptop.cpu);
    output = output.replace(/{%STORAGE%}/g, laptop.storage);
    output = output.replace(/{%RAM%}/g, laptop.ram);
    output = output.replace(/{%DESCRIPTION%}/g, laptop.description);
    output = output.replace(/{%ID%}/g, laptop.id);
    return output;
}