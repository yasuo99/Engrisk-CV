import { HttpTransportType, LogLevel } from "@microsoft/signalr";
import * as signalR from '@microsoft/signalr';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Base } from "./api";

export const connection = new signalR.HubConnectionBuilder()
.configureLogging(LogLevel.Debug)
.withUrl(`${Base}/notification`, {
    skipNegotiation: true,
    transport: HttpTransportType.WebSockets,
    accessTokenFactory: () => AsyncStorage.getItem("token").then((token) => {return token})
})
.build();