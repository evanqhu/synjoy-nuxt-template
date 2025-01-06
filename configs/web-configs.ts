// 网站配置

const defaultConfig = {
  appTitle: 'Template Web',
  appEmail: 'templateweb.support@gmail.com',
  appUrl: 'templateweb.com',
  appLogo: 'logo1',
  bodyStyleName: 'template',
  aboutUs: `The aboutUs of template web.`,
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
    // NOTE 这里的 client 只需要写 script 中 client= 后面的内容（如：ca-pub-8158555231596181），千万不要写成全部的 URL
    // 广告位信息只需要传递  slot 即可，其他的都在广告组件中给了默认值
    clientId: 'ca-google',
    ads: 'template ads.txt',
    home_1: { 'data-ad-slot': '1468595611' },
    home_2: { 'data-ad-slot': '9290411161' },
  },
}
const defaultConfig2 = {
  appTitle: 'Template Web2',
  appEmail: 'templateweb.support@gmail.com2',
  appUrl: 'templateweb.com',
  appLogo: 'template',
  bodyStyleName: 'template',
  aboutUs: `The aboutUs of template web.`,
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
  'localhost': defaultConfig,
  '127.0.0.1': defaultConfig2,
} as {
  [key: string]: WebConfig
}
