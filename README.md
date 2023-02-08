## プロジェクトタイトル
firstgram

## プロジェクトの概要
snsの画像投稿アプリを作成(instagram参考)

## 使用言語
- Next.js
- TypeScript
- Tailwind CSS
- Firebase(Authentication, Storage)
- PostgreSQL
- Docker

### 機能一覧
- 画像・キャプションの投稿機能
- 投稿された画像・キャプションの閲覧機能
- 新規ユーザー登録機能
- ログイン/ログアウト機能
- 投稿に対するいいね機能
- 投稿に対するコメント機能
- ダイレクトメッセージ機能
- フォロー/フォロー解除機能
- 登録ユーザーの検索機能
- 投稿の保存機能
- プロフィール編集機能

## ブランチ運用
- main          : リリース用のソースコード
- develop       : 開発中のソースコード
- feather/機能名 : 各機能のソースコード


## ディレクトリ構造
<pre>
.
├── Dockerfile
├── README.md
├── data
│   └── db
├── docker-compose.yaml
├── firebase.js
├── firebase.json
├── lib
├── modules
├── next-env.d.ts
├── next.config.js
├── node_modules
├── package-lock.json
├── package.json
├── pages
│   ├── _app.tsx
│   ├── _document.tsx
│   ├── api
│   ├── dmPage.module.css
│   ├── dmPage.tsx
│   ├── followLength.tsx
│   ├── followPage.tsx
│   ├── followerLength.tsx
│   ├── followerPage.tsx
│   ├── index.tsx
│   ├── login.tsx
│   ├── myPage.tsx
│   ├── passwordChange.module.css
│   ├── passwordChange.tsx
│   ├── postLength.tsx
│   ├── postList.tsx
│   ├── postPage.tsx
│   ├── profile.tsx
│   ├── profileChange.module.css
│   ├── profileChange.tsx
│   ├── register.tsx
│   └── searchPage.tsx
├── postcss.config.js
├── public
├── src
│   ├── components
│   │   ├── atoms
│   │   ├── molecules
│   │   ├── organisms
│   │   ├── templates
│   │   └── utils
│   └── styles
├── styles
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.server.json
├── types
└── yarn.lock
</pre>

<!-- ## プロジェクトのスクリーンショット -->






<!-- This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details. -->
