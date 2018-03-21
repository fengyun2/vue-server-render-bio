'use strict';

process.env.VUE_ENV = 'server';

const fs = require('fs');
const path = require('path');
const express = require('express');
const favicon = require('serve-favicon');
const serialize = require('serialize-javascript');
const createBundleRenderer = require('vue-server-renderer')
  .createBundleRenderer;

const stats = [];

const app = express();

app.use(express.static(path.resolve(__dirname, 'dist')));
const template = fs.readFileSync(
  path.resolve(__dirname, './dist/index.ssr.html'),
  'utf-8'
);

const renderer = createBundleRenderer(
  fs.readFileSync('./dist/server-bundle.js', 'utf-8'),
  {
    cache: require('lru-cache')({ max: 10000 }),
    template: template
  }
);

app.get('*', (req, res) => {
  const context = {
    title: 'Vue SSR DEMO',
    meta: `
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="renderer" content="webkit">
    <meta name="Keywords" content="网上购物,网上商城,手机,笔记本,电脑,MP3,CD,VCD,DV,相机,数码,配件,手表,存储卡,京东">
    <meta name="description" content="京东JD.COM-专业的综合网上购物商城,销售家电、数码通讯、电脑、家居百货、服装服饰、母婴、图书、食品等数万个品牌优质商品.便捷、诚信的服务，为您提供愉悦的网上购物体验!">`,
    url: req.url
  };

  renderer.renderToString(context, (err, html) => {
    if (err) {
      if (err.code === 404) {
        res.status(404).end('Page not found');
      } else {
        res.status(500).end('Internal Server Error');
      }
    }
    res.end(html);
  });
});

// app.use(favicon(path.resolve(__dirname, 'dist/logo.png')))

/* app.get('*', (req, res) => {
  const start = Date.now()
  const context = { url: req.url }
  const renderStream = renderer.renderToStream(context)
  let firstChunk = true

  res.write('<!DOCTYPE html><body>')

  renderStream.on('data', chunk => {
    if (firstChunk) {
      // send down initial store state
      if (context.initialState) {
        res.write(`<script>window.__INITIAL_STATE__=${
          serialize(context.initialState, { isJSON: true })
        }</script>`)
      }
      firstChunk = false
    }
    res.write(chunk)
  })

  renderStream.on('end', () => {
    res.end(`<script src="/client-bundle.js"></script></body>`)
    const used = Date.now() - start
    stats.push(used)
    console.log(`request used: ${(Date.now() - start)}ms`)
    console.log(`average: ${(stats.reduce((s, t) => s + t, 0) / stats.length).toFixed(2)}ms`)
  })

  renderStream.on('error', err => {
    throw err
  })
}) */

app.listen(3000, err => {
  if (err) {
    throw err;
  }
  console.log('ready at localhost:3000');
});
