const yargs = require('yargs')
const chalk = require('chalk')
const boxen = require('boxen')
const axios = require('axios')
const utils = require('./utils')
const args  = require('./args')

const instance = axios.create({
   baseURL: 'https://connpass.com/api/v1/',
   timeout: 5000
})

/**
 * get items
 * (this is the main function)
 *
 * @param  void
 * @return void
 */
module.exports = () => {
   instance
      .get('/event', {
         params: {
            keyword:  args.k || '',
            nickname: args.n || '',
            count:    args.c || ''
         }
      })
      .then((res) => {
         res.data.events.forEach((item) => {
            console.log(boxen(`
   title: ${item.title}   
   url:   ${item.event_url}   
   date:  ${item.updated_at}
               `, { borderColor: 'cyan' }
            ))
         })
      })
      .catch((err) => {
         if (err.config.timeout === 5000) {
            console.log(boxen('   Request timeout ;(   \n   Please try again.', { borderColor: 'red' }
         ))
         }
         else {
            console.error(err.config)
         }
      })
}
