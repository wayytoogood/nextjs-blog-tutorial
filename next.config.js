/** @type {import('next').NextConfig} */

// Proje için kritik config değerleri barındırma ihtimali olduğu için config.js'in gitignore'a eklenmesi tavsiye edilmiyor. Bunun için yine
// .env dosyasının kullanılması gerekiyor sanırım.

const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: 'w2g',
        mongodb_password: 'huseyin.867',
        mongodb_cluster: 'nodeexpressprojects',
        mongodb_database: 'NEXTJS_PORTFOLIO',
      },
    }
  }

  return {
    env: {
      mongodb_username: 'w2g',
      mongodb_password: 'huseyin.867',
      mongodb_cluster: 'nodeexpressprojects',
      mongodb_database: 'NEXTJS_PORTFOLIO',
    },
  }
}

// Dev ve production sürecinde farklılık olacaksa yukarıda gösterildiği gibi fonksiyon olarak kullanmamız gerekiyor.
// module.exports = {
//   reactStrictMode: true,
//   env: {
//     mongodb_username: 'w2g',
//     mongodb_password: 'huseyin.867',
//     mongodb_cluster: 'nodeexpressprojects',
//     mongodb_database: 'NEXTJS_PORTFOLIO',
//   },
// }
