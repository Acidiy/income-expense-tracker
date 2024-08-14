import express from 'express'
import { deleteUser, getUserbyFilter, postUser, putUserAvatar, putUserCurrency, putUserGeneral, putUserPassword, signIn } from '../controller/user.js'

let user = express.Router()

user.post('/signup', postUser).post('/signin', signIn).delete('/deleteAccount', deleteUser).put('/updateAccountGeneral', putUserGeneral).put('/updateAccountPassword', putUserPassword).put('/updateAccountAvatar', putUserAvatar).put('/updateAccountBaseCurrency', putUserCurrency).get('/getUser',getUserbyFilter)

export { user }