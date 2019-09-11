import path from 'path';
import webpack from 'webpack';
import express from 'express';
import wdm from 'webpack-dev-middleware';
import whm from 'webpack-hot-middleware';
import client from '../../../config/webpack/client.dev';
import normalizeAssets from './normalizeAssets';

const router = express.Router();

const compiler = webpack(client);

router.use(wdm(compiler, {
  serverSideRender: true,
  publicPath: client.output.publicPath,
}));

router.use(whm(compiler, {
  path: '/__webpack_hmr',
}));

router.use('/static', express.static(path.resolve(__dirname, 'public')));

router.get('*', (req, res) => {
  const { assetsByChunkName } = res.locals.webpackStats.toJson();

  const scripts = normalizeAssets(assetsByChunkName.app)
    .filter((script) => script.endsWith('.js'))
    .map((script) => `${client.output.publicPath}${script}`);

  const styles = normalizeAssets(assetsByChunkName.app)
    .filter((script) => script.endsWith('.css'))
    .map((script) => `${client.output.publicPath}${script}`);

  res.render('index', {
    scripts,
    styles,
  });
});

export default router;
