// 网站配置

const defaultConfig = {
  // 网站标题
  webTitle: 'App Title',
  // 网站标题模板
  metaTitleTemplate: 'Title Template',
  // 网站描述 meta description
  metaDescription: 'This is a description for the web app',
  // 网站邮箱
  webEmail: 'web-email.support@gmail.com',
  // 网站地址
  webUrl: 'templateweb.com',
  // 网站 logo
  webLogo: 'logo1',
  // Reuqest header
  // 关于我们
  aboutUs: `The about us of template web. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores rem autem ratione eius ullam, voluptas saepe odit maiores aspernatur corrupti, minima consectetur soluta deleniti alias nisi atque aliquam! Repudiandae, alias.`,
  // Firebase
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
    clientId: 'ca-google',
    ads: 'template ads.txt',
    home_1: { 'data-ad-slot': 'home_1' },
    home_2: { 'data-ad-slot': 'home_2' },
    home_3: { 'data-ad-slot': 'home_3' },
    detail_1: { 'data-ad-slot': 'detail_1' },
    detail_2: { 'data-ad-slot': 'detail_2' },
    read_1: { 'data-ad-slot': 'read_1' },
    list_1: { 'data-ad-slot': 'list_1' },
    list_2: { 'data-ad-slot': 'list_2' },
  },
  // Google Ad Exchange
  adExchange: {
    home_1: {
      index: 'ad1',
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
          console.log('banner-ad')
          googletag.cmd.push(() => {
            googletag.display("banner-ad");
          });
        </script>
      </div>`,
    },
    home_2: { index: 'ad2', headScript: '', bodyScript: '' },
  },
  // TikTok Pixel Track
  pixelTrackKey: '',
  // Facebook Track
  fbq: '',
  // AdScore
  // adScore: `
  //   <script
  //     async
  //     src="//c.adsco.re"
  //     type="text/javascript"
  //     onload='AdscoreInit("QiU9AwAAAAAAp492dOvJyheQIhXKZEU1pnhHoro",
  //     {sub_id: "pixeltripai.com",async_callback: 1});'>
  //   </script>`,
}

export default {
  localhost: defaultConfig,
} as {
  [key: string]: WebConfig
}

type DefaultConfig = typeof defaultConfig

export type WebConfig = Omit<DefaultConfig, 'adExchange' | 'pixelTrackKey' | 'fbq' | 'adScore' | 'adSense'> & {
  adExchange?: any
  pixelTrackKey?: string
  adScore?: string
  fbq?: string
  adSense?: Partial<DefaultConfig['adSense']>
}
