// 网站配置

const defaultConfig = {
  appTitle: 'Template Web',
  appEmail: 'templateweb.support@gmail.com',
  appUrl: 'templateweb.com',
  appLogo: 'template',
  bodyStyleName: 'template',
  aboutUs: `The aboutUs of template web.`,
  firebase: {
    apiKey: 'AIzaSyBcS3cwlUXpK99s0FiNLcdhiTqTbqa8pRo',
    authDomain: 'webs-58a8d.firebaseapp.com',
    projectId: 'webs-58a8d',
    storageBucket: 'webs-58a8d.appspot.com',
    messagingSenderId: '730684174767',
    appId: '1:730684174767:web:98cad94ee478557c0c3f5a',
    measurementId: 'G-4MPLF3JL2K',
  },
  adSense: {
    // NOTE 这里的 client 只需要写 script 中 client= 后面的内容（如：ca-pub-8158555231596181），千万不要写成全部的 URL
    // 广告位信息只需要传递  slot 即可，其他的都在广告组件中给了默认值
    clientId: 'ca-google',
    ads: 'template ads.txt',
    home_1: { 'data-ad-slot': '1468595611' },
    home_2: { 'data-ad-slot': '9290411161' },
  },
}

export type WebConfig = typeof defaultConfig

export default {
  localhost: defaultConfig,
} as {
  [key: string]: WebConfig
}
