export const environment = {
  production: false,
  apiUrl: 'http://localhost/api',
  appName: 'Pergeco',
  version: '1.0.0',
  
  // Configurações de autenticação
  tokenKey: 'pergeco_token',
  userKey: 'pergeco_user',
  
  // Configurações de paginação
  defaultPageSize: 15,
  pageSizeOptions: [10, 15, 25, 50, 100],
  
  // Configurações de toast
  toastDuration: 3000,
  
  // Configurações de upload
  maxFileSize: 10485760, // 10MB em bytes
  allowedFileTypes: ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'],
  
  // Configurações de cache
  cacheExpiration: 300000, // 5 minutos em ms
  
  // Debug
  enableDebug: true,
  enableConsoleLog: true
};
