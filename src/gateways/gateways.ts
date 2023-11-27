import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    handleConnection(client: Socket) {
        const userId = client.id;
        this.server.emit('userStatus', { userId, status: 'online' });
        this.server.emit('online', { userId });
    }

    handleDisconnect(client: Socket) {
        const userId = client.id;
        this.server.emit('userStatus', { userId, status: 'offline' });
        this.server.emit('offline', { userId });
    }
}
