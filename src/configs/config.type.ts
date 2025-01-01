export type Config = {
  app: AppConfig;
  database: DatabaseConfig;
  redis: RedisConfig;
  aws: AwsConfig;
  sentry: SentryConfig;
  jwt: JwtConfig;
  email: EmailConfig;
};

export type DatabaseConfig = {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
};

export type AppConfig = {
  port: number;
  host: string;
};

export type RedisConfig = {
  host: string;
  port: number;
  password: string;
};

export type AwsConfig = {
  accessKey: string;
  secretKey: string;
  bucketName: string;
  region: string;
  ACL: string;
  endpoint: string;
};

export type SentryConfig = {
  dsn: string;
  env: string;
  debug: boolean;
};

export type JwtConfig = {
  accessSecret: string;
  accessExpiresIn: number;
  refreshSecret: string;
  refreshExpiresIn: number;
};

export type EmailConfig = {
  userEmail: string;
  adminEmail: string;
  passEmail: string;
};
