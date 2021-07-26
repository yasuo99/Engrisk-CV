import { HttpTransportType, LogLevel } from "@microsoft/signalr";
import * as signalR from '@microsoft/signalr';

export const connection = new signalR.HubConnectionBuilder()
.configureLogging(LogLevel.Debug)
.withUrl(`${process.env.REACT_APP_HUB_URL}/notification`, {
    skipNegotiation: true,
    transport: HttpTransportType.WebSockets,
    accessTokenFactory: () => localStorage.getItem("token")
})
.build();
