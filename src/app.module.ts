import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { UserService } from './users/users.service';
import { UserController } from './users/users.controller';
import { PrismaModule } from './prisma/prisma.module';
import { DatabaseModule } from './database/database.module';
import { DatabaseService } from './database/database.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleModule } from './article/article.module';
import { RoleModule } from './role/role.module';
import { EvenementModule } from './evenement/evenement.module';
import { WebunaireModule } from './webunaire/webunaire.module';
import { CategoryEvenementModule } from './category-evenement/category-evenement.module';
import { CategoryWebunaireModule } from './category-webunaire/category-webunaire.module';
import { EvenementService } from './evenement/evenement.service';
import { typeOrmConfig } from './ormconfig';
import { CategoryWebinaire } from './category-webunaire/entities/category-webunaire.entity';
import { Evenement } from './evenement/entities/evenement.entity';
import { Webinaire } from './webunaire/entities/webunaire.entity';
import { User } from './users/entities/user.entity';
import { Article } from './article/entities/article.entity';
import { ServicesModule } from './services/services.module';
import { CategoryServicesModule } from './category-services/category-services.module';
import { Service } from './services/entities/service.entity';
import { PartenaireModule } from './partenaire/partenaire.module';
import { LeadModule } from './lead/lead.module';
import { UtilisateurModule } from './utilisateur/utilisateur.module';
import { RessourceModule } from './ressource/ressource.module';
import { NewlettreSubscribeModule } from './newlettre-subscribe/newlettre-subscribe.module';
import { Lead } from './lead/entities/lead.entity';
import { Utilisateur } from './utilisateur/entities/utilisateur.entity';
import { Ressource } from './ressource/entities/ressource.entity';
import { Partenaire } from './partenaire/entities/partenaire.entity';
import { NewlettreSubscribe } from './newlettre-subscribe/entities/newlettre-subscribe.entity';
import { CategoryService } from './category-services/entities/category-service.entity';
import { CategorieArticleModule } from './categorie-article/categorie-article.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([CategoryWebinaire]),
    TypeOrmModule.forFeature([Evenement]),
    TypeOrmModule.forFeature([Webinaire]),
    TypeOrmModule.forFeature([CategoryWebinaire]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Article]),
    TypeOrmModule.forFeature([Service]),
    TypeOrmModule.forFeature([CategoryServicesModule]),
    TypeOrmModule.forFeature([DatabaseModule]),
    TypeOrmModule.forFeature([Lead]),
    TypeOrmModule.forFeature([Utilisateur]),
    TypeOrmModule.forFeature([Ressource]),
    TypeOrmModule.forFeature([Partenaire]),
    TypeOrmModule.forFeature([NewlettreSubscribe]),
    TypeOrmModule.forFeature([Service]),
    TypeOrmModule.forFeature([CategoryService]),
    TypeOrmModule.forFeature([AuthModule]),

    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    PrismaModule,
    DatabaseModule,
    AuthModule,
    JwtModule,
    RoleModule,
    ArticleModule,
    EvenementModule,
    WebunaireModule,
    CategoryEvenementModule,
    CategoryWebunaireModule,
    ServicesModule,
    CategoryServicesModule,
    PartenaireModule,
    LeadModule,
    UtilisateurModule,
    RessourceModule,
    NewlettreSubscribeModule,
    CategorieArticleModule,
  ],
  controllers: [UserController],
  providers: [
    PrismaService,
    UserService,
    DatabaseService,
    AuthService,
    JwtService,
    EvenementService,
  ],
  exports: [AppModule],
})
export class AppModule {}
