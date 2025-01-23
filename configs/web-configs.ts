// 网站配置

const defaultConfig = {
  // 网站标题
  webTitle: 'App Title',
  // 网站标题模板
  webTitleTemplate: 'Title Template',
  // 网站邮箱
  webEmail: 'web-email.support@gmail.com',
  // 网站地址
  webUrl: 'templateweb.com',
  // 网站 logo
  webLogo: 'logo1',
  // 关于我们
  aboutUs: `The about us of template web. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores rem autem ratione eius ullam, voluptas saepe odit maiores aspernatur corrupti, minima consectetur soluta deleniti alias nisi atque aliquam! Repudiandae, alias.`,
  firebase: {
    apiKey: '',
    authDomain: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
    measurementId: '',
  },
  // Google AdSense
  adSense: {
    // NOTE 这里的 client 只需要写 script 中 client= 后面的内容（如：ca-pub-8158555231596181），千万不要写成全部的 URL
    // 广告位信息只需要传递  slot 即可，其他的都在广告组件中给了默认值
    clientId: 'ca-google',
    ads: 'template ads.txt',
    home_1: { 'data-ad-slot': '123456789' },
    home_2: { 'data-ad-slot': '987654321' },
  },
  // Google Ad Exchange
  adExchange: {
    home_1: {
      headScript: `<script>
        window.googletag = window.googletag || { cmd: [] };

        googletag.cmd.push(() => {
          googletag
            .defineSlot("/6355419/Travel/Europe/France/Paris", [300, 250], "banner-ad")
            .addService(googletag.pubads());

          googletag.enableServices();
        });
      </script>`,
      bodyScript: `<div id="banner-ad" style="width: 300px; height: 250px">
        <script>
          googletag.cmd.push(() => {
            googletag.display("banner-ad");
          });
        </script>
      </div>`,
    },
    home_2: { headScript: '', bodyScript: '' },
  },
  // TikTok Pixel
  pixelTrackKey: '1234567890',
}
const defaultConfig2 = {
  webTitle: 'App2 Title',
  webTitleTemplate: 'Title2 Template',
  webEmail: 'web2-email.support@gmail.com',
  webUrl: 'templateweb2.com',
  webLogo: 'logo2',
  aboutUs: `The about us of template web. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores rem autem ratione eius ullam, voluptas saepe odit maiores aspernatur corrupti, minima consectetur soluta deleniti alias nisi atque aliquam! Repudiandae, alias.`,
  firebase: {
    apiKey: '',
    authDomain: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
    measurementId: '',
  },
  adSense: {
    clientId: 'ca-google',
    ads: 'template ads.txt',
    home_1: { 'data-ad-slot': '123456789' },
    home_2: { 'data-ad-slot': '987654321' },
  },
  adExchange: {
    home_1: {
      headScript: `<script>
        window.googletag = window.googletag || { cmd: [] };

        googletag.cmd.push(() => {
          googletag
            .defineSlot("/6355419/Travel/Europe/France/Paris", [300, 250], "banner-ad")
            .addService(googletag.pubads());

          googletag.enableServices();
        });
      </script>`,
      bodyScript: `<div id="banner-ad" style="width: 300px; height: 250px">
        <script>
          googletag.cmd.push(() => {
            googletag.display("banner-ad");
          });
        </script>
      </div>`,
    },
    home_2: { headScript: '', bodyScript: '' },
  },
  pixelTrackKey: '',
}

export type WebConfig = typeof defaultConfig

export default {
  'localhost': defaultConfig,
  '127.0.0.1': defaultConfig2,
} as {
  [key: string]: WebConfig
}

export const webDescription = 'This is a description for the web app'
