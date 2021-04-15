process.env.NTBA_FIX_319 = 1;

const TelegramBot = require('node-telegram-bot-api')
const debug = require('./helpers')
const TOKEN = '1725338851:AAEw_odXLsdXwVX_qIxb3OyNWJ140F7Atak'
const mongoose = require('mongoose');
const express = require('express')
const app = express()
const config = require('./config');
console.log('Bot start')



////////////////////////////////////////////////
const Schema = mongoose.Schema
const MoneySchema = new Schema({
    
  uuid: {
    type: String,
    //required: true
   },
  name: {
        type: String,
        //required: true
    },
  lengths: {
        type: String,
        //required: true
    }
    
})

const Money = mongoose.model('course', MoneySchema)

const money = new Money({
        uuid: "f123",
        name: "Dollar",
        lengths: "28.0"
})

const money1 = new Money({
  uuid: "f567",
  name: "Evro",
  lengths: "32.0" 
})

const money2 = new Money({
  uuid: "f890",
  name: "Rubli",
  lengths: "0.17" 
})
mongoose.connect("mongodb://localhost:27017/moneydb", { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false }, function(err){
    if(err) return console.log(err);
    app.listen(3000, function(){
        console.log("Сервер ожидает подключения...");
    });
});
  
money.save(function(err){
  mongoose.disconnect()
  if(err) return console.log(err)
  console.log('Save object = ', money)
})

money1.save((err) => {
  mongoose.disconnect()
  if(err) return console.log(err)
  console.log('Save object money1 = ', money1)
})

money2.save((err) => {
  mongoose.disconnect()
  if(err) return console.log(err)
  console.log('Save object money2 = ', money2)
})
//////////////////////////////////////////
const bot = new TelegramBot(TOKEN, {
    polling: {
        interval: 300,
        autoStart: true,
        params: {
            timeout: 10
        }
    }
})

  bot.onText(/\/start/, msg => {
      const {id} = msg.chat
      bot.sendMessage(id, debug(`Hello ${msg.from.first_name+ " " + msg.from.last_name}`))
  })

  bot.on('message', msg => {
      const chatId = msg.chat.id
     
      if(msg.text === 'dollar') {
          bot.sendMessage(chatId, dol, {
              reply_markup: {
                  remove_keyboard: false
              }
          })
      }else if (msg.text === 'evro'){
          bot.sendMessage(chatId, 'Curs Evro', {
              reply_markup: {
                  remove_keyboard: false
              }
          })
      }else if (msg.text === 'rub') {
          bot.sendMessage(chatId, 'Curs Rub', {
              reply_markup: {
                  remove_keyboard: false
              }
          })
      }else if (msg.text === 'close') {
          bot.sendMessage(chatId, 'I close the keyboard', {
            reply_markup: {
             remove_keyboard: true 
            }
          })
        }
  })

  const dol = 'This dollars'
  bot.on('message', msg => {
  const chatId = msg.chat.id


  bot.sendMessage(chatId, 'Inline keyboard',{
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Google',
            url: 'https://google.com'
          }
        ],
        [
          {
            text:'Dollars',
            callback_data: 'replay'
          }, 
          {
            text: 'Evro',
            callback_data: 'forward'
          }
        ]
      ]
    }
  })
})

bot.on('callback_query', query => {
  bot.sendMessage(query.message.chat.id, debug(query))
})