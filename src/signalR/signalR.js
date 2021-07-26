import {withCallbacks,signalMiddleware} from 'redux-signalr'
import {connection} from './createSignalRConnection'
const callbacks = withCallbacks().add('NewNotification', (data) => (dispatch) => {
    console.log(data);
})
export const signal = signalMiddleware({
    callbacks,
    connection,
    shouldConnectionStartImmediately: false
})