const path = require('path')

module.exports = {
    i18n:{
        locales: ['en', 'pt'],
        defaultLocale: 'en',
        localeDetection: true,
        localePath: path.resolve('./public/locales')
        // abaixo no caso de dominios diferentes aponta pra qual idioma
        /*domains: [
          {domain: 'meusite.com', defaultLocale: 'pt'},
          {domain: 'meusite.com.br', defaultLocale: 'en'}
        ]*/
      },
      reloadOnPrerender: process.env.NODE_ENV === 'development'
}