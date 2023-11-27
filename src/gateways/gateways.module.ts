import { Module } from '@nestjs/common';
import { AppGateway } from '@gateways/gateways';
import { AuthModule } from '@auth/auth.module';
import { GatewaysGuard } from '@gateways/gateways.guard';

@Module({
    imports: [AuthModule],
    providers: [AppGateway, GatewaysGuard],
})
export class GatewaysModule {}
