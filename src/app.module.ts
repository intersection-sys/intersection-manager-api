import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompanyModule } from './company/company.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { RawmaterialModule } from './rawmaterial/rawmaterial.module';
import { StockModule } from './stock/stock.module';
import { FormulaModule } from './formula/formula.module';
import { ComponentModule } from './component/component.module';
import { StepModule } from './step/step.module';
import { AnalysisModule } from './analysis/analysis.module';
import { ProductionorderModule } from './productionorder/productionorder.module';
import { StepcontrolModule } from './stepcontrol/stepcontrol.module';
import { CompositionModule } from './composition/composition.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './roles.guard';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    CompanyModule,
    UserModule,
    RoleModule,
    RawmaterialModule,
    StockModule,
    FormulaModule,
    ComponentModule,
    StepModule,
    AnalysisModule,
    ProductionorderModule,
    StepcontrolModule,
    CompositionModule,
    AuthModule,
    JwtModule.register({
      privateKey: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '7d',
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
