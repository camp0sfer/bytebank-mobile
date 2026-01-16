# Tech Challenge - Fase 3 - Grupo 9 - 4FRNT

ByteBank: Aplicação Mobile, utilizando React Native (Expo), Firebase Storage e Cloud Firestore.

## O que é o ByteBank?

O ByteBank é uma aplicação financeira desenvolvida como desafio no desenvolvimento Mobile do Tech Challenge, Fase 3, do curso de pós-graduação em Front-End Engineering da FIAP.

## Estrutura do Projeto

```
bytebank-mobile/
├── assets/                # Recursos estáticos (ícones, splash)
├── src/
│   ├── components/        # Componentes reutilizáveis e UI
│   ├── config/            # Configurações
│   │   └── firebase.ts    # Configuração Firebase
│   ├── context/           # Contextos React (estado global)
│   ├── hooks/             # Custom hooks
│   ├── navigation/        # Rotas e navegação
│   ├── screens/           # Telas da aplicação
│   │   ├── auth/          # Telas de autenticação (Login, SignUp)
│   │   └── protected/     # Telas protegidas (Home, Transactions, etc)
│   ├── services/          # Lógica de negócio e APIs
│   ├── store/             # Gerenciamento de estado (Zustand)
│   ├── theme/             # Tema, cores e estilos
│   ├── types/             # Definições TypeScript
│   └── utils/             # Funções utilitárias
├── App.tsx                # Componente raiz
├── package.json           # Dependências do projeto
├── firebase.json          # Configuração Firebase
├── .env                   # Variáveis de ambiente (Firebase)
├── .env.example           # Template das variáveis
├── firestore.rules        # Regras de segurança Firestore
├── storage.rules          # Regras de segurança Storage
├── firebase.json          # Configuração Firebase CLI
└── README.md              # Documentação principal
```

## Como Executar

### **Pré-requisitos**
- Node.js 18+ (recomendado)
- npm ou yarn
- Expo CLI: `npm install -g expo-cli` (opcional, usamos `npx expo`)
- Conta no Firebase (gratuita)
- Se for testar via USB, instale o Android Platform Tools (ADB)

### **1. Clone o projeto**
```bash
git clone https://github.com/camp0sfer/bytebank-mobile.git
cd bytebank-mobile
```

### **2. Instalar dependências**
```bash
npm install
# ou
yarn
```

### **3. Configurar Firebase**

#### **3.1. Criar arquivo de variáveis de ambiente**
```bash
# Copie o arquivo de exemplo
cp .env.example .env
```

#### **3.2. Adicionar credenciais do Firebase**
1. Acesse o [Firebase Console](https://console.firebase.google.com/)
2. Crie um novo projeto ou use um existente
3. Vá em **Configurações do Projeto** > **Seus aplicativos**
4. Copie as credenciais do Firebase
5. Cole no arquivo `.env`

> ⚠️ **Importante**: Não compartilhe suas credenciais! O arquivo `.env` está no `.gitignore` e nunca será versionado.

> 💡 **Dica**: Se você não tem acesso ao Firebase Console, solicite os valores das variáveis de ambiente à equipe de desenvolvimento.

#### **3.3. Configurar Firestore e Storage**
No Firebase Console:
1. Habilite **Authentication** > **Email/Password**
2. Crie um banco **Firestore Database** (modo teste)
3. Habilite **Storage** (para upload de recibos)
4. Configure as regras de segurança (veja `firestore.rules` e `storage.rules`)

#### **3.4. Implantar regras de segurança Firebase**
Para implantar as regras de segurança do Firestore e Storage:

```bash
# Instalar Firebase CLI (apenas uma vez)
npm install -g firebase-tools

# Fazer login no Firebase
firebase login

# Selecionar o projeto (se necessário)
firebase use bytebank-mobile

# Implantar todas as regras
firebase deploy --only firestore,storage

# Ou implantar individualmente
firebase deploy --only firestore  # Apenas Firestore
firebase deploy --only storage     # Apenas Storage
```

> ⚠️ **Importante**: Sempre implante as regras após modificá-las para garantir a segurança do aplicativo.

### **4. Executar o projeto**

Após configurar o Firebase, inicie o servidor de desenvolvimento:

```bash
npm start
```

### **5. Testar no dispositivo**

#### **Testar no Android com Expo Go**:
- Instale `Expo Go` no celular (Google Play)
- Certifique-se que computador e celular estão na mesma rede Wi‑Fi
- No painel do Expo escolha `LAN` para melhor desempenho. Se não for possível, escolha `Tunnel`
- No painel do Expo (ou no terminal) haverá um QR Code — abra `Expo Go` → `Scan QR Code` e aponte a câmera

#### **Testar via USB/adb**:
- Ative a depuração USB no Android e conecte o cabo
- Verifique o dispositivo com `adb devices`
- Execute no terminal:

```bash
npm run android
# ou, após `npx expo start`, pressione `a` no terminal para abrir no dispositivo/emulador
```

#### **Rodar no navegador** (opcional):

```bash
npm run web
```

## Gerando APK para Distribuição (Android)

### **1. Instalar EAS CLI**
```bash
npm install -g eas-cli
```

### **2. Fazer login no Expo**
```bash
eas login
```

### **3. Configurar variáveis de ambiente no EAS**

Para garantir que as credenciais do Firebase não sejam expostas no código, é necessário configurá-las como secrets no EAS:

```bash
# Configurar automaticamente todas as variáveis do .env
cat .env | while IFS='=' read -r key value; do
  if [ -n "$key" ] && [ -n "$value" ]; then
    echo "Creating secret: $key"
    eas secret:create --scope project --name "$key" --value "$value" --type string --force
  fi
done
```

> ⚠️ **Importante**: Este passo é necessário apenas uma vez por projeto. As variáveis ficam armazenadas de forma segura no servidor EAS e são injetadas automaticamente durante o build.

### **4. Gerar o APK**
```bash
eas build --platform android --profile preview
```

O processo irá:
- Fazer upload do código para o servidor EAS
- Compilar o APK na nuvem
- Gerar um link e QR code para download

### **5. Distribuir o APK**

Após o build ser concluído, você pode:
- **Escanear o QR code** com seu dispositivo Android
- **Compartilhar o link** com a equipe para testes
- **Baixar o arquivo APK** diretamente do link gerado

## Configurações de Desenvolvimento

### **Scripts Disponíveis**
```bash
npm start          # Iniciar Expo Dev Server
npm run android    # Executar no Android
npm run ios        # Executar no iOS
npm run web        # Executar na web
```

## Troubleshooting

- **QR Code não é lido**: Altere para `Tunnel` no Expo Dev Tools
- **App não atualiza**: Feche e reabra `Expo Go` ou limpe o cache com `npx expo start -c`
- **`adb devices` não lista o aparelho**: Verifique permissões/cabo e as ferramentas do Android
